let currentUser = null;
let tasks = [];
let teamMembers = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const userData = localStorage.getItem('taskflowUser');
    if (!userData) {
        window.location.href = '../index.html';
        return;
    }

    currentUser = JSON.parse(userData);
    loadUserData();
    setupEventListeners();
    initializeTasks();
    
    if (currentUser.type === 'corporate') {
        document.getElementById('adminNav').style.display = 'flex';
        loadTeamMembers();
    }

    updateUI();
}

function loadUserData() {
    currentUser.name = currentUser.mode === 'guest' ? 'Invitado' : 'Usuario Demo';
    currentUser.email = currentUser.mode === 'guest' ? 'guest@taskflow.pro' : 'user@taskflow.pro';
    currentUser.avatar = currentUser.name.charAt(0).toUpperCase();
    currentUser.peakTime1 = '09:00';
    currentUser.peakTime2 = '14:00';

    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent = currentUser.avatar;
    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profileEmail').value = currentUser.email;
    document.getElementById('profileType').value = currentUser.type === 'corporate' ? 'Corporativo' : 'Personal';
    document.getElementById('peakTime1').value = currentUser.peakTime1;
    document.getElementById('peakTime2').value = currentUser.peakTime2;
}

function setupEventListeners() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const module = item.getAttribute('data-module');
            switchModule(module);
        });
    });

    document.getElementById('createTaskForm').addEventListener('submit', handleCreateTask);
}

function switchModule(moduleName) {
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const moduleId = `${moduleName}-module`;
    const module = document.getElementById(moduleId);
    if (module) {
        module.classList.add('active');
    }

    document.querySelector(`[data-module="${moduleName}"]`).classList.add('active');

    const titles = {
        'tasks': 'Mis Tareas',
        'create-task': 'Crear Nueva Tarea',
        'admin': 'Administración',
        'health-shield': 'Escudo de Salud',
        'profile': 'Mi Perfil'
    };
    document.getElementById('pageTitle').textContent = titles[moduleName] || 'TaskFlow Pro';

    if (moduleName === 'tasks') {
        renderTasks();
    } else if (moduleName === 'admin') {
        loadAdminData();
    } else if (moduleName === 'health-shield') {
        loadHealthData();
    }
}

function initializeTasks() {
    tasks = [
        {
            id: 1,
            title: 'Revisar propuesta del cliente',
            description: 'Revisar y aprobar la propuesta enviada por Acme Corp',
            priority: 'high',
            status: 'in-progress',
            assignee: 'María García',
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            estimation: 2,
            actualTime: 1.5,
            tags: ['diseño', 'urgente'],
            createdAt: new Date()
        },
        {
            id: 2,
            title: 'Actualizar documentación',
            description: 'Actualizar la documentación del API',
            priority: 'medium',
            status: 'pending',
            assignee: 'Carlos López',
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            estimation: 3,
            tags: ['documentación'],
            createdAt: new Date()
        },
        {
            id: 3,
            title: 'Testing de la nueva feature',
            description: 'Hacer testing exhaustivo de la nueva feature de reportes',
            priority: 'high',
            status: 'blocked',
            assignee: 'Ana Sierra',
            deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            estimation: 4,
            tags: ['testing', 'qa'],
            createdAt: new Date()
        }
    ];

    localStorage.setItem('taskflowTasks', JSON.stringify(tasks));
}

function renderTasks() {
    const container = document.querySelector('#tasks-module .tasks-grid');
    const filters = {
        status: document.getElementById('filterStatus').value,
        priority: document.getElementById('filterPriority').value
    };

    let filteredTasks = tasks.filter(task => {
        if (filters.status && task.status !== filters.status) return false;
        if (filters.priority && task.priority !== filters.priority) return false;
        return true;
    });

    if (filteredTasks.length === 0) {
        container.innerHTML = '';
        document.querySelector('#tasks-module .empty-state').style.display = 'block';
        return;
    }

    document.querySelector('#tasks-module .empty-state').style.display = 'none';
    container.innerHTML = filteredTasks.map(task => `
        <div class="task-card" onclick="openTaskModal(${task.id})">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                <div style="font-weight: 600; color: var(--text); font-size: 1.1rem;">${escapeHtml(task.title)}</div>
                <div class="task-priority ${task.priority}"></div>
            </div>
            <div style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 15px;">${escapeHtml(task.description)}</div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-light); margin-bottom: 15px;">
                <span>${formatDate(task.deadline)}</span>
                <span>${task.estimation}h estimadas</span>
            </div>
            <div class="task-status ${task.status}">${getStatusLabel(task.status)}</div>
        </div>
    `).join('');
}

function handleCreateTask(e) {
    e.preventDefault();

    const newTask = {
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        priority: document.getElementById('taskPriority').value,
        status: 'pending',
        assignee: document.getElementById('taskAssignee').value,
        deadline: document.getElementById('taskDeadline').value,
        estimation: parseFloat(document.getElementById('taskEstimation').value) || 0,
        tags: document.getElementById('taskTags').value.split(',').map(t => t.trim()),
        createdAt: new Date()
    };

    tasks.push(newTask);
    localStorage.setItem('taskflowTasks', JSON.stringify(tasks));

    e.target.reset();
    alert('¡Tarea creada exitosamente!');
    
    switchModule('tasks');
}

function openTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    document.getElementById('modalTaskTitle').textContent = task.title;
    document.getElementById('modalTaskStatus').value = task.status;
    document.getElementById('modalTaskNotes').value = task.description;

    if (task.status === 'completed') {
        document.getElementById('feedbackSection').style.display = 'block';
        if (task.actualTime) document.getElementById('modalTaskActualTime').value = task.actualTime;
        if (task.difficulty) document.getElementById('modalTaskDifficulty').value = task.difficulty;
    } else {
        document.getElementById('feedbackSection').style.display = 'none';
    }

    document.getElementById('taskModal').classList.add('active');
    document.getElementById('taskDetailForm').dataset.taskId = taskId;
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
}

function updateTask(e) {
    e.preventDefault();
    const taskId = parseInt(document.getElementById('taskDetailForm').dataset.taskId);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.status = document.getElementById('modalTaskStatus').value;
        task.description = document.getElementById('modalTaskNotes').value;
        
        if (task.status === 'completed') {
            const actualTime = document.getElementById('modalTaskActualTime').value;
            const difficulty = document.getElementById('modalTaskDifficulty').value;
            const fatigue = document.getElementById('modalTaskFatigue').value;

            if (actualTime) task.actualTime = parseFloat(actualTime);
            if (difficulty) task.difficulty = difficulty;
            if (fatigue) task.fatigue = fatigue;
        }

        localStorage.setItem('taskflowTasks', JSON.stringify(tasks));
        closeTaskModal();
        renderTasks();
        alert('Tarea actualizada correctamente');
    }
}

function filterTasks() {
    renderTasks();
}

function updateBioRitmoSuggestion() {
    const priority = document.getElementById('taskPriority').value;
    const bioRitmoBox = document.getElementById('bioRitmoBox');

    if (priority === 'high') {
        bioRitmoBox.style.display = 'flex';
        const peakTime = currentUser.peakTime1 || '10:00';
        document.getElementById('bioRitmoText').textContent = 
            `Basado en los horarios de energía del equipo, se recomienda asignar esta tarea a las ${peakTime} cuando el rendimiento es óptimo.`;
    } else {
        bioRitmoBox.style.display = 'none';
    }
}

function loadTeamMembers() {
    teamMembers = [
        { id: 1, name: 'María García', email: 'maria@empresa.com', role: 'admin', tasks: 5, load: 85 },
        { id: 2, name: 'Carlos López', email: 'carlos@empresa.com', role: 'member', tasks: 3, load: 60 },
        { id: 3, name: 'Ana Sierra', email: 'ana@empresa.com', role: 'member', tasks: 4, load: 75 },
        { id: 4, name: 'Juan Pérez', email: 'juan@empresa.com', role: 'member', tasks: 6, load: 95 }
    ];

    const assigneeSelect = document.getElementById('taskAssignee');
    assigneeSelect.innerHTML = '<option value="">Selecciona un miembro</option>' + 
        teamMembers.map(member => `<option value="${member.name}">${member.name}</option>`).join('');

    loadAdminData();
}

function loadAdminData() {
    if (currentUser.type !== 'corporate') return;

    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = teamMembers.map(member => `
        <tr>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.role === 'admin' ? 'Administrador' : 'Miembro'}</td>
            <td>${member.tasks}</td>
            <td>
                <div style="background: ${member.load > 80 ? '#f56565' : member.load > 60 ? '#f6ad55' : '#48bb78'}; 
                           width: 60px; height: 20px; border-radius: 10px; 
                           display: flex; align-items: center; justify-content: center;
                           color: white; font-weight: bold; font-size: 0.8rem;">
                    ${member.load}%
                </div>
            </td>
            <td>
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.85rem;">Editar</button>
            </td>
        </tr>
    `).join('');

    const atRisk = teamMembers.filter(m => m.load > 80).length;
    const overdue = tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length;
    
    document.getElementById('totalLoad').textContent = 
        Math.round(teamMembers.reduce((sum, m) => sum + m.load, 0) / teamMembers.length) + '%';
    document.getElementById('atRisk').textContent = atRisk;
    document.getElementById('overdue').textContent = overdue;

    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;

    document.getElementById('reportTotal').textContent = tasks.length;
    document.getElementById('reportCompleted').textContent = completed;
    document.getElementById('reportInProgress').textContent = inProgress;
    document.getElementById('reportBlocked').textContent = blocked;
    document.getElementById('reportOverdue').textContent = overdue;

    loadHealthShieldAdmin();
}

function loadHealthShieldAdmin() {
    const greenProjects = teamMembers.filter(m => m.load < 60).length;
    const yellowProjects = teamMembers.filter(m => m.load >= 60 && m.load <= 80).length;
    const redProjects = teamMembers.filter(m => m.load > 80).length;

    document.getElementById('greenProjects').textContent = 
        greenProjects > 0 ? `${greenProjects} miembro(s) con baja carga` : 'Todos tienen carga moderada';
    document.getElementById('yellowProjects').textContent = 
        yellowProjects > 0 ? `${yellowProjects} miembro(s) con carga moderada` : 'Sin problemas moderados';
    document.getElementById('redProjects').textContent = 
        redProjects > 0 ? `${redProjects} miembro(s) en riesgo` : 'Todos bajo control';

    const alertsList = document.getElementById('alertsList');
    const alerts = [];

    teamMembers.forEach(member => {
        if (member.load > 80) {
            alerts.push({
                title: `⚠️ ${member.name} en sobrecarga`,
                message: `Carga del ${member.load}%. Se recomienda reasignar tareas para evitar burnout.`,
                type: 'warning'
            });
        }
    });

    const overdueCount = tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length;
    if (overdueCount > 0) {
        alerts.push({
            title: `🔴 ${overdueCount} tarea(s) retrasada(s)`,
            message: 'Hay tareas que han pasado su fecha límite. Requieren atención inmediata.',
            type: 'danger'
        });
    }

    if (alerts.length === 0) {
        alertsList.innerHTML = '<p style="color: #48bb78; font-weight: 600;">✓ Todos los proyectos están bajo control</p>';
    } else {
        alertsList.innerHTML = alerts.map(alert => `
            <div style="padding: 15px; background: white; border-left: 4px solid ${alert.type === 'danger' ? '#f56565' : '#f6ad55'}; border-radius: 6px; display: flex; gap: 12px;">
                <div style="font-size: 1.3rem;">${alert.type === 'danger' ? '🔴' : '⚠️'}</div>
                <div>
                    <h5 style="margin: 0 0 5px 0; color: #2d3748;">${alert.title}</h5>
                    <p style="margin: 0; color: #718096; font-size: 0.9rem;">${alert.message}</p>
                </div>
            </div>
        `).join('');
    }
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(`${tabName}-tab`).style.display = 'block';
    event.target.classList.add('active');
}

function showAddUserForm() {
    document.getElementById('addUserForm').style.display = 'block';
}

function hideAddUserForm() {
    document.getElementById('addUserForm').style.display = 'none';
}

function addUser(e) {
    e.preventDefault();
    alert('Usuario añadido correctamente');
    hideAddUserForm();
}

function generateReport(format) {
    alert(`Descargando reporte en formato ${format.toUpperCase()}...`);
}

function loadHealthData() {
    const userTasks = tasks.filter(t => t.assignee === currentUser.name || t.assignee === 'Usuario');
    
    const totalHours = userTasks.reduce((sum, t) => sum + (t.estimation || 0), 0);
    const load = Math.min(Math.round((totalHours / 40) * 100), 100);
    
    document.getElementById('loadPercentage').textContent = load + '%';
    document.querySelector('.gauge-fill').style.width = load + '%';

    const riskTasks = userTasks.filter(t => 
        new Date(t.deadline) < new Date() && t.status !== 'completed'
    ).length;
    document.getElementById('riskTasks').textContent = riskTasks;

    const completedTasks = userTasks.filter(t => t.status === 'completed' && t.actualTime);
    const avgTime = completedTasks.length > 0 
        ? (completedTasks.reduce((sum, t) => sum + t.actualTime, 0) / completedTasks.length).toFixed(1)
        : '0';
    document.getElementById('avgTime').textContent = avgTime + 'h';

    const predictions = [
        { text: `Basado en tu ritmo actual, completarás ${Math.round((userTasks.filter(t => t.status === 'completed').length / userTasks.length) * 100)}% de tus tareas esta semana`, icon: '📊' },
        { text: 'Tu rendimiento es óptimo entre las 09:00 y 11:00 AM según tu Bio-Ritmo configurado', icon: '⏰' },
        { text: `Carga actual: ${load}% - ${load > 80 ? 'Considera tomar un descanso' : 'Ritmo sostenible'}`, icon: load > 80 ? '⚠️' : '✅' }
    ];

    document.getElementById('predictionsList').innerHTML = predictions.map(p => `
        <div style="padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #667eea;">
            <span>${p.icon}</span>
            <strong style="color: #2d3748;">${p.text}</strong>
        </div>
    `).join('');
}

function saveBioRhythm() {
    currentUser.peakTime1 = document.getElementById('peakTime1').value;
    currentUser.peakTime2 = document.getElementById('peakTime2').value;

    alert('Bio-Ritmo guardado correctamente');
    console.log('Bio-Ritmo actualizado:', {
        peakTime1: currentUser.peakTime1,
        peakTime2: currentUser.peakTime2
    });
}

function updateUI() {
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent = currentUser.avatar;
}

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('taskflowUser');
        localStorage.removeItem('taskflowTasks');
        window.location.href = '../index.html';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Hoy';
    if (date.toDateString() === tomorrow.toDateString()) return 'Mañana';
    
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
}

function getStatusLabel(status) {
    const labels = {
        'pending': 'Pendiente',
        'in-progress': 'En Progreso',
        'blocked': 'Bloqueada',
        'completed': 'Completada'
    };
    return labels[status] || status;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
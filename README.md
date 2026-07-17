# TaskFlow Pro - Gestión Inteligente de Tareas

## 📋 Descripción General

TaskFlow Pro es una aplicación web completa de gestión de tareas con inteligencia artificial integrada. Diseñada para equipos corporativos y usuarios individuales, ofrece automatización inteligente, predicción de riesgos y optimización del bienestar laboral.

## ✨ Características Principales

### 🔐 1. Módulo de Autenticación y Onboarding
- Registro dual: Cuenta Personal vs Corporativa
- Onboarding inteligente con selección de industria
- Integración de AI-Recipes para setup automático
- Acceso como invitado (sin registro obligatorio)

### 💰 2. Módulo de Suscripción y Costos
- **Plan Personal (Freemium)**: $0 - 1 usuario, gestión básica
- **Plan Corporativo**: Escalable por número de empleados
- Acceso a Escudo de Salud en planes corporativos

### 📝 3. Módulo de Gestión de Tareas
- Asignación inteligente con campos obligatorios:
  - Prioridad: Alta (Rojo), Media (Amarillo), Baja (Verde)
  - Estado: Pendiente, En Progreso, Bloqueada, Completada
  - Asignación automática según Bio-Ritmo
  - Fecha límite con alertas automáticas

### ⚙️ 4. Módulo de Administración Corporativa
- Gestión completa de usuarios
- Dashboard de carga del equipo
- Generación de reportes (PDF/Excel)
- Semáforo de riesgos predictivo (Escudo de Salud)

### 🛡️ 5. Escudo de Salud (Predictive Health)
- Análisis de sobrecarga de trabajo
- Detección predictiva de riesgos
- Alertas preventivas automáticas
- Seguimiento de salud operativa

### ⏰ 6. Bio-Ritmo (Chronobiology Integration)
- Detección de horarios óptimos de energía
- Sugerencias inteligentes de asignación
- Respeto a cronobiología del equipo

### 🔄 7. Feedback Adaptativo
- Registro de dificultad real vs estimada
- Retroalimentación de tiempo y energía
- Aprendizaje continuo del sistema
- Mejora automática de predicciones

## 📁 Estructura del Proyecto

```
taskflow-pro/
├── index.html                 # Landing page y autenticación
├── dashboard/
│   └── index.html            # Dashboard principal con todos los módulos
├── css/
│   ├── index.css             # Estilos landing page
│   └── dashboard.css         # Estilos dashboard
├── js/
│   └── app.js                # Lógica principal de la aplicación
└── README.md                 # Este archivo
```

## 🚀 Cómo Comenzar

### Instalación
1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! La app funcionará localmente

### Primer Uso
1. **Registro**: Elige entre Cuenta Personal o Corporativa
2. **Invitado**: Usa "Acceso como Invitado" sin registrarte
3. **Dashboard**: Accede a todas las características inmediatamente

## 📱 Módulos Disponibles

### Para Usuarios Personales:
- 📝 Mis Tareas - Vista de todas tus tareas
- ➕ Nueva Tarea - Crear tareas con Bio-Ritmo
- 🛡️ Escudo de Salud - Análisis personal de carga
- 👤 Mi Perfil - Configuración de Bio-Ritmo

### Para Administradores Corporativos (Adicional):
- ⚙️ Administración - Panel de control empresarial
  - 👥 Gestión de Usuarios
  - 📊 Dashboard de Carga
  - 📈 Generación de Reportes
  - 🛡️ Semáforo de Riesgos

## 🎯 Casos de Uso

### Caso 1: Trabajador Individual
1. Se registra como "Personal"
2. Crea sus tareas con prioridades
3. Monitorea su carga de trabajo
4. Recibe sugerencias de Bio-Ritmo
5. Proporciona feedback adaptativo

### Caso 2: Equipo Corporativo
1. Admin registra la empresa
2. Selecciona industria para AI-Recipes
3. Invita miembros del equipo
4. Crea tareas y asigna automáticamente
5. Monitorea Escudo de Salud
6. Recibe alertas de riesgos
7. Genera reportes para stakeholders

## 🔧 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Almacenamiento**: LocalStorage
- **Responsivo**: Mobile-first, adaptable a todos los dispositivos

## 🎨 Diseño UI/UX

- **Gradiente moderno** en violeta-púrpura
- **Interfaz intuitiva** con navegación clara
- **Animaciones suaves** para mejor experiencia
- **Modo responsivo** completo (Desktop, Tablet, Mobile)

## 💾 Almacenamiento de Datos

La aplicación usa `localStorage` para guardar:
- Datos del usuario
- Tareas creadas
- Preferencias personales
- Bio-Ritmo configurado

> **Nota**: Los datos se guardan localmente. Para producción, integrar con backend.

## 🌟 Características Diferenciadoras

1. **AI-Recipes**: Plantillas preconfiguradas por industria
2. **Bio-Ritmo**: Optimización basada en cronobiología
3. **Escudo de Salud**: Predicción de riesgos antes de que ocurran
4. **Feedback Adaptativo**: Sistema que aprende con cada tarea
5. **Acceso Invitado**: Experiencia completa sin registro obligatorio

## 📊 Ejemplo de Flujo de Tareas

```
Crear Tarea (Prioridad Alta)
    ↓
Sistema analiza Bio-Ritmo del equipo
    ↓
Sugiere asignación óptima a las 10:00 AM
    ↓
Escudo de Salud detecta potencial sobrecarga
    ↓
Admin recibe alerta preventiva
    ↓
Tarea se completa con feedback
    ↓
Sistema aprende y mejora próximas predicciones
```

## 🔮 Mejoras Futuras

- [ ] Backend y base de datos real
- [ ] Autenticación con OAuth
- [ ] Integración con Google Calendar
- [ ] Notificaciones por email
- [ ] Análisis de productividad avanzado
- [ ] Exportación de datos
- [ ] Modo oscuro
- [ ] Multi-idioma

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

**Versión**: 1.0.0  
**Última actualización**: 2026-07-17  
**Desarrollado por**: TaskFlow Pro Team
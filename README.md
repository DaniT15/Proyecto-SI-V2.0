# Proyecto Final 1-2025 - Plataforma de Gestión de Excursiones en el Parque Nacional El Ávila

## Descripción

El Proyecto Final 1-2025 tiene como objetivo la creación de una plataforma web para gestionar excursiones en el Parque Nacional El Ávila, promoviendo actividades de esparcimiento y recreación entre los estudiantes de la Universidad Metropolitana. A través de esta plataforma, los estudiantes pueden consultar rutas de senderismo, reservar excursiones, hacer pagos y compartir sus experiencias en la naturaleza.

## Antes de comenzar
Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) (versión 14.0 o superior)
- [npm](https://www.npmjs.com/) (gestor de paquetes de Node.js, se instala automáticamente con Node.js)

## Características

### Funcionalidades Esenciales

- **Página principal (Landing Page)**: 
  - Información relevante sobre la plataforma: misión, visión, objetivos.
  - Presentación de las excursiones disponibles, tarifas y llamada a la acción para realizar reservas.
  
- **Página de destinos**: 
  - Descripción detallada de cada ruta: dificultad, duración, puntos de interés y fotos.
  
- **Página de reservas**: 
  - Reservas sencillas y seguras para los usuarios.

- **Calendario de reservas**: 
  - Visualización de la disponibilidad de las excursiones y la posibilidad de hacer reservas.

- **Pasarela de pago**: 
  - Integración con PayPal para pagos seguros.

- **Galería de fotos y videos**: 
  - Muestra la belleza de los paisajes y actividades.

- **Sistema de reseñas**: 
  - Los usuarios pueden dejar comentarios y clasificar las excursiones.

- **Foro de discusión**: 
  - Un espacio donde los usuarios pueden compartir consejos, experiencias y preguntas.

- **Perfil de Usuario**: 
  - Los usuarios pueden editar su información personal y ver las actividades que han reservado.

### Funcionalidades para el Rol "Administrador"

- **Dashboard de Actividad**: 
  - Permite al administrador gestionar las actividades disponibles (crear, actualizar y eliminar).

- **Dashboard de Tipos de Actividad**: 
  - Gestión de tipos de actividades (senderismo, montañismo, etc.) y asignación a cada excursión.

### Módulos Principales

- **Registro y Autenticación**: 
  - Formulario de registro con la opción de iniciar sesión mediante Google, Facebook o correo electrónico.
  
- **Perfil de la actividad**: 
  - Información detallada sobre cada excursión: fotos, grado de dificultad, requisitos, etc.
  
- **Contribución**: 
  - Monto a colaborar por estudiante y procesar el pago mediante PayPal.

- **Feedback**: 
  - Los estudiantes pueden dar retroalimentación sobre las excursiones.

## Tecnologías

1. **React**: Biblioteca de JavaScript para construir interfaces de usuario.
2. **Firebase**: Plataforma para desarrollar aplicaciones móviles y web, utilizada para la autenticación y base de datos.
3. **Vite**: Herramienta para bundling y desarrollo rápido de aplicaciones con soporte para hot module replacement.
4. **CSS**: Estilos para hacer que la interfaz sea visualmente atractiva y responsive.
5. **ESLint**: Herramienta para identificar y reportar patrones en el código JavaScript.

## Instalación

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio**:

    ```bash
    git clone <url_del_repositorio>
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd nombre_del_proyecto
    ```

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

4. Ejecuta el servidor de desarrollo:

    ```bash
    npm run dev
    ```

5. Abre la aplicación en tu navegador en `http://localhost:5173`.
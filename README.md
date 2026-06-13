# Five to Fly ✈️

![Five to Fly](./five-to-fly.png)

**Five to Fly** es una aplicación web para viajeros que permite descubrir, puntuar y compartir opiniones sobre destinos y lugares turísticos. Los usuarios pueden registrarse, explorar lugares, dejar reseñas y calificaciones, y conectarse con una comunidad de viajeros.

## 🚀 Características

- **Autenticación de usuarios**: Registro e inicio de sesión seguros.
- **Exploración de destinos**: Visualiza lugares turísticos con imágenes y descripciones.
- **Sistema de puntuación**: Califica y opina sobre los lugares que visitas.
- **Perfil personal**: Gestiona tu perfil con foto, opiniones y valoraciones.
- **Dashboard interactivo**: Resumen de tus actividades y lugares favoritos.

## 🛠️ Stack Tecnológico

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Django + Django REST Framework
- **Base de datos**: SQLite
- **Contenedores**: Docker & Docker Compose

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/five-to-fly.git
cd five-to-fly

# Iniciar con Docker
docker-compose up --build
```

## 📁 Estructura del Proyecto

```
five-to-fly/
├── backend/          # API REST con Django
│   ├── five_to_fly/  # Configuración del proyecto Django
│   ├── usuarios/     # App de usuarios y lugares
│   └── db/           # Base de datos SQLite
├── frontend/         # Aplicación React
│   └── src/
│       ├── pages/    # Páginas de la aplicación
│       ├── router/   # Configuración de rutas
│       └── Context/  # Estado global con Context API
└── docker-compose.yml
```

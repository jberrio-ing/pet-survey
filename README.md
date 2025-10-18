# 🐾 Pet Survey - Encuesta de Mascotas

Aplicación fullstack para realizar encuestas y votaciones sobre mascotas favoritas. Los usuarios pueden votar una sola vez por su mascota preferida y ver resultados en tiempo real con un ranking interactivo.

## 📋 Descripción

Sistema completo de votación que permite:

- Visualizar todas las mascotas disponibles con sus imágenes
- Votar por tu mascota favorita (un voto por usuario)
- Ver el ranking top 3 con barras de progreso animadas
- Consultar el total de votos registrados
- Persistencia del voto mediante localStorage para prevenir votos duplicados

## 🏗️ Arquitectura

El proyecto está dividido en dos aplicaciones independientes:

```
pet-survey/
├── backend/          # API REST con NestJS + TypeORM + MySQL
└── frontend/         # SPA con React + TypeScript + Tailwind CSS
```

## 🚀 Ejecución con Docker Compose

### 1. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example` con las siguientes variables:

```bash
# Base de datos MySQL
MYSQL_ROOT_PASSWORD=tu_password_root
MYSQL_DATABASE=pet_survey
MYSQL_USER=pet_user
MYSQL_PASSWORD=tu_password_db

# Puertos (opcionales, valores por defecto)
BACKEND_PORT=3000
FRONTEND_PORT=80
```

### 2. Comandos de Docker Compose

**Lanzar contenedores:**

```bash
docker compose up --build -d
```

**Detener contenedores:**

```bash
docker compose down
```

**Inspeccionar contenedores:**

```bash
# Ver logs de todos los servicios
docker compose logs

# Ver logs de un servicio específico
docker compose logs backend
docker compose logs frontend
docker compose logs mysql

# Ver estado de los contenedores
docker compose ps
```

**Eliminar contenedores y volúmenes:**

```bash
# Eliminar contenedores, redes y volúmenes
docker compose down -v

# Eliminar también las imágenes
docker compose down -v --rmi all
```

### 3. Acceso a la aplicación

- **Frontend:** http://localhost:80
- **Backend API:** http://localhost:3000

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

### Backend (NestJS)

- **Framework**: NestJS 11.x
- **Base de datos**: MySQL con TypeORM
- **Arquitectura**: Modular con separación de responsabilidades
- **Puerto**: 3000 (configurable)

### Frontend (React)

- **Framework**: React 19.x con TypeScript
- **Estilos**: Tailwind CSS 4.x
- **Build tool**: Vite 7.x
- **Puerto**: 5173 (desarrollo)

## 🚀 Tecnologías

### Backend

- Node.js
- NestJS
- TypeORM
- MySQL
- TypeScript
- ESLint + Prettier

### Frontend

- React 19
- TypeScript
- Tailwind CSS 4
- Vite
- Fetch API

## 📦 Requisitos Previos

- Node.js 18+
- MySQL 8+
- npm o yarn

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd pet-survey
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend/`:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_NAME=pet_survey

# Server
PORT=3000
```

### 3. Configurar Frontend

```bash
cd frontend
npm install
```

Crear archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Configurar Base de Datos

Crear la base de datos en MySQL:

```sql
CREATE DATABASE pet_survey CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

El backend creará automáticamente las tablas necesarias al iniciar (synchronize: true).

## ▶️ Ejecución

### Modo Desarrollo

**Backend:**

```bash
cd backend
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

**Frontend:**

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Modo Producción

**Backend:**

```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Endpoints

### GET `/api/pet-survey`

Obtiene todas las mascotas con sus estadísticas.

**Respuesta:**

```json
{
  "totalVotes": 150,
  "pets": [
    {
      "id": 1,
      "name": "Max",
      "imageUrl": "https://example.com/max.jpg",
      "score": 35.5
    }
  ]
}
```

### POST `/api/pet-survey/vote`

Registra un voto para una mascota.

**Body:**

```json
{
  "petId": 1
}
```

**Respuesta:**

```json
{
  "message": "Vote registered successfully"
}
```

## 📊 Modelo de Datos

### Entidad Pet

```typescript
{
  id: number; // Primary Key
  name: string; // Nombre único de la mascota
  imageUrl: string; // URL de la imagen
  totalVotes: number; // Contador de votos (default: 0)
}
```

## 🎨 Características del Frontend

### Componentes Principales

1. **App.tsx** - Componente principal con la lógica de estado y API
2. **PetCard.tsx** - Tarjeta individual de mascota con botón de voto
3. **RankingBar.tsx** - Barra de progreso animada para el top 3

### Funcionalidades UI

- ✅ Grid responsive (1-4 columnas según dispositivo)
- ✅ Animaciones suaves en hover y transiciones
- ✅ Gradientes vibrantes (púrpura, rosa, azul)
- ✅ Indicador visual del voto del usuario (anillo verde)
- ✅ Medallas para top 3 (🥇🥈🥉)
- ✅ Estados de carga con spinner animado
- ✅ Manejo de errores con mensajes amigables
- ✅ Emojis para mejor UX

### LocalStorage

El frontend utiliza localStorage para guardar:

- `votedPetId`: ID de la mascota votada (previene votos duplicados)

## 🔒 Validaciones

### Backend

- Validación de petId (debe ser entero positivo)
- Verificación de existencia de mascota
- Manejo de errores con mensajes descriptivos

### Frontend

- Verificación de voto previo en localStorage
- Deshabilitación de botones durante votación
- Validación de respuestas de API

## 🎯 Flujo de Usuario

1. Usuario accede a la aplicación
2. Sistema verifica si ya existe un voto en localStorage
3. Se cargan y muestran todas las mascotas desde la API
4. Se muestra el total de votos y ranking top 3
5. Usuario hace clic en su mascota favorita
6. Sistema envía voto al backend
7. Backend incrementa el contador y retorna confirmación
8. Frontend guarda el voto en localStorage
9. Se actualiza la interfaz mostrando el voto registrado
10. Usuario no puede volver a votar (opción deshabilitada)

## 🧪 Testing

**Backend:**

```bash
cd backend
npm run test          # Tests unitarios
npm run test:e2e      # Tests end-to-end
npm run test:cov      # Coverage
```

**Frontend:**

```bash
cd frontend
npm run lint          # Linting
```

## 📝 Scripts Disponibles

### Backend

- `npm run start:dev` - Desarrollo con hot reload
- `npm run build` - Compilar para producción
- `npm run start:prod` - Ejecutar en producción
- `npm run lint` - Ejecutar ESLint
- `npm run test` - Ejecutar tests

### Frontend

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar ESLint

## 🔐 CORS

El backend tiene CORS habilitado para permitir peticiones desde el frontend en desarrollo. En producción, considera configurar dominios específicos.

## 📈 Mejoras Futuras

- [ ] Autenticación de usuarios
- [ ] Sistema de categorías para mascotas
- [ ] Filtros y búsqueda
- [ ] Comentarios en mascotas
- [ ] Modo oscuro
- [ ] Compartir en redes sociales
- [ ] Analytics de votaciones
- [ ] Panel de administración
- [ ] Tests E2E para frontend
- [ ] Docker compose para deployment

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso educativo.

---

**Nota**: Asegúrate de tener MySQL corriendo y las variables de entorno configuradas antes de ejecutar el proyecto.

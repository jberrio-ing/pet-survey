# 🐾 Encuesta de Mascotas - Frontend

Aplicación frontend para votar por tu mascota favorita, construida con React, TypeScript y Tailwind CSS.

## 🚀 Características

- **Visualización de mascotas**: Muestra todas las mascotas disponibles con sus imágenes y porcentajes de votos
- **Sistema de votación**: Los usuarios pueden votar una sola vez (guardado en localStorage)
- **Ranking Top 3**: Muestra las tres mascotas más votadas con barras de progreso animadas
- **Total de votos**: Contador global de votos registrados
- **Indicador visual**: Marca claramente la mascota por la que el usuario votó
- **Responsive**: Diseño adaptable a diferentes tamaños de pantalla
- **Interfaz atractiva**: Gradientes, sombras, animaciones y emojis

## 📁 Estructura del Proyecto

```
frontend/src/
├── App.tsx                          # Componente principal con lógica de estado
├── types.ts                         # Tipos TypeScript compartidos
├── components/
│   ├── PetCard.tsx                  # Tarjeta individual de mascota
│   └── RankingBar.tsx               # Barra de ranking animada
├── main.tsx                         # Punto de entrada
└── index.css                        # Estilos globales
```

## 🎨 Componentes

### `App.tsx`

Componente principal que gestiona:

- Estado de la aplicación (loading, error, votos)
- Llamadas a la API del backend
- Persistencia de votos en localStorage
- Renderizado condicional según el estado

### `PetCard.tsx`

Tarjeta reutilizable que muestra:

- Imagen de la mascota
- Nombre y porcentaje
- Botón de votación
- Indicador visual si es el voto del usuario

### `RankingBar.tsx`

Componente para el top 3 con:

- Medallas (🥇🥈🥉)
- Barras de progreso animadas
- Colores distintivos por posición

## 🔌 API Endpoints

El frontend se conecta a estos endpoints del backend:

- **GET** `/api/pet-survey` - Obtiene todas las mascotas con sus estadísticas
- **POST** `/api/pet-survey/vote` - Registra un voto (body: `{ petId: number }`)

## 💾 LocalStorage

La aplicación guarda en localStorage:

- `votedPetId`: ID de la mascota votada por el usuario

## 🎯 Flujo de Usuario

1. La aplicación carga y verifica si hay un voto previo en localStorage
2. Muestra el total de votos y el ranking top 3 (si hay votos)
3. El usuario puede hacer clic en una mascota para votar
4. Al votar, se envía la solicitud al backend
5. El voto se guarda en localStorage
6. La interfaz se actualiza mostrando el voto del usuario
7. El usuario no puede volver a votar (la opción se deshabilita)

## 🎨 Estilos

- **Tailwind CSS 4.x**: Framework de utilidades CSS
- **Gradientes**: Colores vibrantes (púrpura, rosa, azul)
- **Animaciones**: Transiciones suaves en hover y cambios de estado
- **Sombras**: Efectos de profundidad en las tarjetas
- **Responsive**: Grid adaptable (1-4 columnas según pantalla)

## 🚀 Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

**Nota**: Asegúrate de que el backend esté corriendo en `http://localhost:3000`

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en el directorio `dist/`.

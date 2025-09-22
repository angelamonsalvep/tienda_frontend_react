# 🛍️ MiniTienda - Frontend

Este es el frontend de **MiniTienda**, desarrollado con **React + Vite**.  
La aplicación consume un backend en Flask y permite la visualización de productos de la tienda.

---

## 🚀 Despliegue en Producción

El frontend está desplegado en **Vercel** y puedes accederlo en la siguiente URL:  

👉 [MiniTienda en Producción](https://tienda-frontend-react-git-main-angela-monsalves-projects.vercel.app/)

---

## ⚙️ Tecnologías utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [Vercel](https://vercel.com/) para el despliegue  
- [Node.js](https://nodejs.org/) v18+ recomendado  

---

## � Variables de Entorno

Esta aplicación utiliza variables de entorno para la configuración de la API. 

### Configuración Local

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Configura las variables en `.env`:
   ```env
   # URL base de la API
   VITE_API_BASE_URL=http://localhost:5000
   
   # Configuración de la aplicación
   VITE_APP_NAME=Minitienda
   VITE_APP_VERSION=1.0.0
   ```

### Configuración de Producción

Para producción, cambia la URL base en tu archivo `.env`:
```env
VITE_API_BASE_URL=http://18.216.181.40:5000
```

### Variables Disponibles

| Variable | Descripción | Valor por defecto |
|----------|-------------|------------------|
| `VITE_API_BASE_URL` | URL base del backend | `http://localhost:5000` |
| `VITE_APP_NAME` | Nombre de la aplicación | `Minitienda` |
| `VITE_APP_VERSION` | Versión de la aplicación | `1.0.0` |

---

## �📦 Instalación en local

Si deseas correrlo en tu máquina:

```bash
# Clonar el repositorio
git clone https://github.com/angelamonsalvep/tienda_frontend_react.git

# Entrar al proyecto
cd tienda_frontend_react

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Levantar el servidor de desarrollo
npm run dev

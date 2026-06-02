# 🖥️ Frontend — Sistema Web de Autenticación - Login Seguro

Interfaz web desarrollada con React + Vite que consume la API REST del backend de autenticación.

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| React 18 | Librería de interfaz de usuario |
| Vite | Bundler y servidor de desarrollo |
| React Router DOM | Navegación entre páginas |
| Fetch API | Peticiones HTTP al backend |

## 📁 Estructura del Proyecto
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json

## 🚀 Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/Jhonkevin25/frontend-login-seguro.git
cd frontend-login-seguro
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abrir en el navegador: `http://localhost:5173`

## ⚠️ Requisito

El backend debe estar corriendo en `http://localhost:3000`.
Repositorio del backend: [sistema-login-seguro](https://github.com/Jhonkevin25/sistema-login-seguro)

## 📄 Páginas

| Ruta | Descripción | Protegida |
|---|---|---|
| /login | Iniciar sesión | ❌ |
| /register | Crear cuenta | ❌ |
| /profile | Perfil del usuario | ✅ |

## 👤 Autor
Jhon Kevin — 2026
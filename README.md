<p align="center">
  <img src="https://img.shields.io/badge/Vite-111111?style=for-the-badge&logo=vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-111111?style=for-the-badge&logo=tailwindcss">
  <img src="https://img.shields.io/badge/JavaScript-111111?style=for-the-badge&logo=javascript">
  <img src="https://img.shields.io/badge/JSON_Server-111111?style=for-the-badge&logo=json">
  <img src="https://img.shields.io/badge/SPA-111111?style=for-the-badge">
</p>

# Kurohana SPA

<p align="center">
  <img src=".github/example.png" alt="Kurohana Preview" width="800" />
</p>

**Kurohana** es una Single Page Application para la gestión de un restaurante de cocina asiática. Permite administrar productos (platos), categorizarlos por tipo (entradas, platos principales, postres, bebidas) y gestionar pedidos a través de un carrito de compras interactivo.

---

## Funcionalidades

- **Autenticación** — formulario de registro e inicio de sesión con cuenta administradora predefinida (`Kurohana-Adm` / `Kurohana2026`)
- **CRUD de productos** — crear, editar y eliminar platos con nombre, precio, categoría, país de origen y foto
- **Filtrado por categorías** — filtra los productos por Entradas, Platos principales, Postres o Bebidas
- **Búsqueda** — buscador en tiempo real por nombre de producto
- **Carrito de compras** — agrega productos, ajusta cantidades y confirma pedidos con cálculo automático del total
- **Roles** — interfaz adaptada para administrador y usuario estándar
- **Persistencia local** — los datos se almacenan via JSON Server (archivo `server/json/productos.json`)

---

## Tecnologías

| Tecnología | Propósito |
|---|---|
| [Vite](https://vitejs.dev) | Bundler y dev server |
| [Tailwind CSS v4](https://tailwindcss.com) | Estilos utilitarios |
| JavaScript (Vanilla) | Lógica de la SPA (patrón MVC) |
| [JSON Server](https://github.com/typicode/json-server) | API REST falsa para desarrollo |
| [Bankai Font](https://www.dafont.com/bankai.font) | Tipografía personalizada de marca |

---

## Arquitectura

```
index.html
└── src/
    ├── main.js                 # Entry point — decide entre login y home según auth
    ├── views/
    │   ├── loginView.js        # Templates HTML del login/registro
    │   └── homeView.js         # Templates HTML del dashboard, carrito y productos
    ├── controllers/
    │   ├── loginController.js   # Lógica de autenticación y registro
    │   ├── homeController.js    # Lógica de renderizado, búsqueda, filtros y CRUD
    │   └── cartController.js    # Lógica del carrito (agregar, quitar, cantidades, total)
    ├── components/
    │   ├── cartAdm.js           # Componente de tarjeta de producto (admin)
    │   └── cartUser.js          # Componente de tarjeta de producto (usuario)
    ├── utils/
    │   └── utils.js             # Funciones auxiliares (fetchApiData)
    ├── css/
    │   └── style.css            # Estilos globales (1677 líneas)
    └── assets/
        ├── font/                # Tipografía Bankai
        └── img/                 # Logo, hero, fotos

server/
└── json/
    └── productos.json           # Base de datos (productos, usuarios, pedidos)
```

---

## Requisitos

- Node.js 18+
- npm

---

## Setup

### 1. Clonar el repositorio

```bash
git clone https://github.com/YesRv/KUROHANA-SPA
cd Kurohana-SPA
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar JSON Server (API)

```bash
npx json-server .\server\json\productos.json
```

Esto levanta la API en `http://localhost:3000`.

### 4. Iniciar el frontend

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

---

## Desarrollo

```bash
# Terminal 1 — API
npx json-server .\server\json\productos.json

# Terminal 2 — Frontend (Vite dev server)
npm run dev
```

---

## Producción

```bash
npm run build
```

Los archivos estáticos se generan en la carpeta `dist/`. Se pueden servir con cualquier servidor estático (Nginx, Vercel, Netlify, etc.).

---

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo Vite |
| `npm run build` | Compila para producción en `dist/` |
| `npm run preview` | Previsualiza la build de producción |

---

## Cuenta administradora

| Usuario | Contraseña |
|---|---|
| `Kurohana-Adm` | `Kurohana2026` |

---

## Estructura de datos

```json
{
  "productos": [
    {
      "id": "abc123",
      "name": "Ramen",
      "price": "55",
      "category": "mainCourses",
      "country": "japan",
      "url": "https://ejemplo.com/ramen.jpg"
    }
  ],
  "users": [],
  "orders": []
}
```

Las categorías disponibles son: `appetizers`, `mainCourses`, `desserts`, `beverages`.

Los países disponibles son: `japan`, `korea`, `china`.

---

## Notas

- El proyecto usa `localStorage` para mantener la sesión del usuario.
- El carrito se maneja en memoria (se pierde al recargar la página).
- JSON Server debe estar corriendo en `http://localhost:3000` para que la aplicación funcione correctamente.

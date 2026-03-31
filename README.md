# Andina — E-Commerce Frontend

A modern, responsive e-commerce application built with React 19, Vite 7, and Bootstrap 5. Browse products, search, manage a shopping cart, and simulate checkout — powered by the FakeStore API.

API REST para la gestión de películas, desarrollada con Node.js.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap)
![JX](https://img.shields.io/badge/JX-Backend-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iMTIgMiAyIDcgMTIgMTIgMjIgNyAxMiAyIi8+PHBvbHlsaW5lIHBvaW50cz0iMiAxNyAxMiAyMiAyMiAxNyIvPjwvc3ZnPg==)

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Arquitectura](./docs/ARCHITECTURE.md)
- [Características del Proyecto](./docs/FEATURES.md)
- [Documentación Adicional](#documentación-adicional)
- [Licencia](#licencia)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

Open `http://localhost:5173` in your browser.

## Requisitos Previos

- **Node.js** >= 20
- **npm** >= 9
- **Git** >= 2.30
- Navegador moderno con soporte para ES2020+ (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+)
- Conexión a internet (requerida para consumir la FakeStore API)

---

## Features

- **Product Catalog** — Browse all products or filter by category (Electronics, Jewelry, Men's/Women's Clothing)
- **Product Search** — Full-text search across titles, descriptions, and categories with sorting options
- **Product Detail** — Individual product pages with images, ratings, descriptions, and simulated reviews
- **Quick View** — Preview product details in a modal without leaving the page
- **Shopping Cart** — Add, remove, adjust quantities with persistent localStorage storage
- **Stock Validation** — Prevents ordering more than available stock
- **Checkout** — Simulated order submission via FakeStore API
- **Responsive Design** — Desktop, tablet, and mobile layouts with offcanvas navigation
- **Animations** — Scroll-triggered animations with WOW.js and Animate.css
- **Error Handling** — Loading states, error states, and a friendly 404 page

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router DOM v7 |
| UI | Bootstrap 5 |
| HTTP | Axios |
| Animations | Embla Carousel, Swiper, WOW.js, Animate.css |
| Alerts | SweetAlert2 |
| Styling | SCSS + CSS |

## Project Structure

```
andina/
├── docs/                    # Documentation
│   ├── API_REFERENCE.md     # API endpoints, context, events
│   ├── ARCHITECTURE.md      # Architecture diagrams, data flow
│   ├── FEATURES.md          # Feature documentation
│   └── TROUBLESHOOTING.md   # Common issues and solutions
├── public/                  # Static assets (CSS, JS, images, fonts, SCSS)
├── src/
│   ├── main.jsx             # Entry point
│   ├── App.jsx              # Router + WOW.js init
│   ├── context/
│   │   └── CarritoContext.jsx  # Cart state management
│   ├── components/          # Shared UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CardProduct.jsx
│   │   ├── ModalProduct.jsx
│   │   ├── SinglePage.jsx
│   │   └── FiltroCategorias.jsx
│   └── pages/               # Page components
│       ├── Home.jsx
│       ├── Busquedas.jsx
│       ├── Detalle.jsx
│       ├── Contacto.jsx
│       ├── CartPage.jsx
│       ├── Error405.jsx
│       ├── home/            # Home page sections (12 components)
│       ├── productos/       # Category pages
│       ├── contact/         # Contact sub-components
│       ├── cartpage/        # Cart display
│       └── util/            # Utility functions
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Routes

| Route | Description |
|-------|-------------|
| `/` or `/home` | Home page (12 sections) |
| `/productos` | All products |
| `/electronicos` | Electronics category |
| `/joyas` | Jewelry category |
| `/ropadehombre` | Men's clothing |
| `/ropademujer` | Women's clothing |
| `/categorias/:id` | Dynamic category page |
| `/detalle/:id` | Product detail |
| `/busquedas` | Search results |
| `/cartpage` | Shopping cart |
| `/contacto` | Contact page |
| `/error405` | Error page |
| `*` | 404 fallback |

## External API

This app uses [FakeStore API](https://fakestoreapi.com):

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/products` | GET | All products |
| `/products/category/:cat` | GET | Products by category |
| `/products/categories` | GET | Category list |
| `/products/:id` | GET | Single product |
| `/carts` | POST | Create order |

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) — System design, diagrams, data flow
- [API Reference](./docs/API_REFERENCE.md) — Endpoints, context API, component props, events
- [Features](./docs/FEATURES.md) — Detailed feature descriptions
- [Troubleshooting](./docs/TROUBLESHOOTING.md) — Common issues and solutions

## License

MIT

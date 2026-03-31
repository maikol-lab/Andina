# Architecture

## Overview

Andina is a modern e-commerce frontend built with React 19, Vite 7, and Bootstrap 5. It consumes the FakeStore API to display products, manage a shopping cart, and simulate checkout — all without a backend.

## Tech Stack

![Diagrama de Tech Stack](../public/asset/Diagrama%20Tech%20Stack.png)

## Directory Structure

![Diagrama de Directory Structure](../public/asset/Diagrama%20Directory%20Structure.png)

## Architecture Diagram

![Diagrama de Architecture Diagram](../public/asset/Architecture%20Diagram.png)

## Data Flow

### Product Browsing Flow

![Diagrama de Product Browsing Flow](../public/asset/Product%20Browsing%20Flow.png)

### Shopping Cart Flow

![Diagrama de Cart Flow](../public/asset/Shopping%20Cart%20Flow.png)

### Checkout Flow

![Diagrama de Checkout Flow](../public/asset/Checkout%20Flow.png)


### Search Flow

![Diagrama de Search Flow](../public/asset/Search%20Flow.png)

## Component Hierarchy

![Diagrama de Component Hierarchy](../public/asset/Component%20Hierarchy.png)


## State Management

### CarritoContext (Global State)

| State | Type | Persistence | Description |
|-------|------|-------------|-------------|
| `carrito` | `Array<Product>` | `localStorage` key `'carrito'` | Cart items with quantities |

### Product Object Shape

```js
{
  id: number,
  title: string,
  price: number,
  image: string,
  category: string,
  stock: number,        // Randomly generated (1-20)
  rating: { rate: number, count: number },
  description: string,
  cantidad: number      // Quantity in cart
}
```

### Local Component State

Components manage their own UI state via `useState`:
- `Header`: dropdowns, offcanvas, search term, cart totals
- `CardProduct`: modal visibility
- `Busquedas`: active category filter, sort option, search results
- `Trendycollectionareastart`: active tab
- Carousel components: slide indices

## Routing Strategy

| Pattern | Strategy |
|---------|----------|
| Client-side routing | `react-router-dom` v7 `BrowserRouter` |
| Dynamic params | `:id` for product detail, `:cat` for categories |
| Catch-all | `*` route renders `Error405` |
| Search data | Passed via `location.state` (not URL params) |
| Navigation | `<Link>` components + `useNavigate()` for programmatic |

## Build & Dev

```bash
# Development
npm run dev          # Vite dev server

# Production build
npm run build        # Vite build → dist/

# Preview production build
npm run preview      # Local preview

# Linting
npm run lint         # ESLint
```

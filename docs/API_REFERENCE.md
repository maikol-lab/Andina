# API Reference

## External APIs

### FakeStore API

Base URL: `https://fakestoreapi.com`

#### GET /products

Returns all products from the store.

**Used in:** `Productos.jsx`, `Busquedas.jsx`, `Trendycollectionareastart.jsx`, `Topsaleareastart.jsx`

**Response:**
```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use...",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/83f...",
    "rating": { "rate": 3.9, "count": 120 }
  }
]
```

---

#### GET /products/category/:cat

Returns products filtered by category.

**Used in:** `Electronicos.jsx`, `Joyas.jsx`, `RopaDeHombre.jsx`, `RopaDeMujer.jsx`, `Categorias,.jsx`

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `cat` | `string` | Category slug (e.g., `electronics`, `jewelery`, `men's clothing`, `women's clothing`) |

**Example:**
```
GET https://fakestoreapi.com/products/category/electronics
```

---

#### GET /products/categories

Returns list of all available categories.

**Used in:** `FiltroCategorias.jsx`, `Busquedas.jsx`

**Response:**
```json
[
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
]
```

---

#### GET /products/:id

Returns a single product by ID.

**Used in:** `Detalle.jsx`

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | `number` | Product ID |

**Example:**
```
GET https://fakestoreapi.com/products/1
```

---

#### POST /carts

Creates a new cart/order.

**Used in:** `CarritoContext.jsx` (`enviarPedido()`)

**Request Body:**
```json
{
  "userId": 5,
  "date": "2026-01-26",
  "products": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

**Note:** The current implementation sends a minimal payload. In production, you would map cart items to the `products` array format.

---

## Internal APIs (Context & Hooks)

### CarritoContext

The shopping cart context provides global state management for the cart.

#### useCarrito()

Custom hook to consume the cart context.

**Returns:**
```ts
interface CarritoContextValue {
  carrito: Product[];
  agregarAlCarrito: (producto: Product) => void;
  eliminarDelCarrito: (id: number) => void;
  actualizarCantidad: (id: number, nuevaCantidad: number) => void;
  vaciarCarrito: () => void;
  enviarPedido: () => Promise<void>;
}
```

**Usage:**
```jsx
import { useCarrito } from '../context/CarritoContext';

function MyComponent() {
  const { carrito, agregarAlCarrito } = useCarrito();
  // ...
}
```

**Warning:** Throws an error if called outside `<CarritoProvider>`.

---

#### agregarAlCarrito(producto)

Adds a product to the cart or increments quantity if already present.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `producto` | `Product` | Product object to add |

**Behavior:**
- Checks if product already exists in cart
- If exists: increments `cantidad` by 1
- If new: adds with `cantidad: 1`
- Validates stock limit
- Shows SweetAlert2 toast on success
- Shows warning toast if stock exceeded

---

#### eliminarDelCarrito(id)

Removes a product from the cart.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | `number` | Product ID to remove |

**Behavior:**
- Shows SweetAlert2 confirmation dialog
- On confirm: removes item from cart
- Updates localStorage

---

#### actualizarCantidad(id, nuevaCantidad)

Updates the quantity of a product in the cart.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id` | `number` | Product ID |
| `nuevaCantidad` | `number` | New quantity value |

**Behavior:**
- Validates `nuevaCantidad > 0`
- Validates against stock limit
- Removes item if quantity becomes 0

---

#### vaciarCarrito()

Clears all items from the cart.

**Behavior:**
- Shows SweetAlert2 confirmation dialog
- On confirm: sets `carrito` to empty array
- Updates localStorage

---

#### enviarPedido()

Submits the current cart as an order to FakeStore API.

**Behavior:**
- Maps cart items to API format
- POSTs to `https://fakestoreapi.com/carts`
- On success: clears cart, shows success alert
- On error: shows error alert

---

## Component Props API

### CardProduct

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `Product` | Yes | Product object from FakeStore API |

**Internal Methods:**
- `handleAgregarAlCarrito()` — Builds product object and calls context
- `formatCategory(category)` — Maps English category to Spanish
- `getCategoryBadge(category)` — Returns badge text and CSS class
- `getBrand(category)` — Maps category to brand name

---

### ModalProduct

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `show` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Callback to close modal |
| `item` | `Product` | Yes | Product object |
| `brand` | `string` | Yes | Brand name |
| `stock` | `number` | Yes | Available stock |
| `formatCategory` | `(cat: string) => string` | Yes | Category formatter |

---

### SinglePage

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `titulo` | `string` | Yes | Page title for breadcrumb header |

---

### FiltroCategorias

No props. Fetches categories from API on mount.

**States:**
- Loading: Shows spinner
- Error: Shows error message with retry button
- Success: Renders `<Link>` for each category

---

## Events Reference

### Header Events

| Event | Trigger | Action |
|-------|---------|--------|
| `handleSearch(e)` | Form submit (search bar) | Navigates to `/busquedas` with `searchTerm` in router state |
| `handleOffcanvasSearch(e)` | Form submit (offcanvas search) | Same as `handleSearch` |
| `toggleLanguageMenu()` | Click language dropdown | Toggles language menu visibility |
| `toggleCurrencyMenu()` | Click currency dropdown | Toggles currency menu visibility |
| `toggleSettingsMenu()` | Click settings dropdown | Toggles settings menu visibility |
| `openOffcanvas()` | Click hamburger/menu icon | Opens mobile offcanvas sidebar |
| `closeOffcanvas()` | Click close button or Escape key | Closes offcanvas |
| `selectLanguage(lang)` | Click language option | Sets selected language, closes menu |
| `selectCurrency(curr)` | Click currency option | Sets selected currency, closes menu |
| `closeAllMenus()` | Click outside dropdowns | Closes all open dropdown menus |

---

### Cart Events (MostrarCarrito)

| Event | Trigger | Action |
|-------|---------|--------|
| `handleEliminar(id)` | Click "Eliminar" button | Calls `eliminarDelCarrito(id)` with confirmation |
| `handleIncrement(id)` | Click "+" button | Calls `actualizarCantidad(id, cantidad + 1)` |
| `handleDecrement(id)` | Click "-" button | Calls `actualizarCantidad(id, cantidad - 1)` |
| `handleVaciar()` | Click "Vaciar Carrito" | Calls `vaciarCarrito()` with confirmation |
| `handleCheckout()` | Click "Proceder al pago" | Calls `enviarPedido()` |

---

### Product Events (CardProduct / ModalProduct)

| Event | Trigger | Action |
|-------|---------|--------|
| `handleAgregarAlCarrito()` | Click "Agregar al carrito" | Builds product object, calls `agregarAlCarrito()` |
| `handleOpenModal()` | Click "Vista rapida" | Sets `showModal = true` |
| `handleCloseModal()` | Click close or backdrop | Sets `showModal = false` |
| Navigate to detail | Click "Detalle" | Navigates to `/detalle/:id` |

---

### Search Events (Busquedas)

| Event | Trigger | Action |
|-------|---------|--------|
| Category filter click | Click category chip | Sets active category filter |
| Sort change | Select sort option | Re-sorts results by price/rating/name |
| "Nueva busqueda" | Click button | Prompts for new search term via `prompt()` |

---

## Utility Functions

### formatCurrency(value)

Formats a number as currency with thousands separator (`.`) and decimal comma (`,`).

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `value` | `number` | Number to format |

**Returns:** `string`

**Example:**
```js
formatCurrency(1234.56)  // "1.234,56"
```

---

### formatNumber(value)

Formats an integer with thousands separator.

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `value` | `number` | Number to format |

**Returns:** `string`

**Example:**
```js
formatNumber(1234567)  // "1.234.567"
```

---

## Product Object Shape

All components that handle products use this shape:

```ts
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  // Added by app:
  stock: number;
  cantidad: number;
}
```

---

## Category Mapping

The app maps FakeStore API categories to Spanish labels:

| API Category | Spanish Label | Badge Class |
|-------------|---------------|-------------|
| `electronics` | Electrónicos | `badge-electronics` |
| `jewelery` | Joyería | `badge-jewelery` |
| `men's clothing` | Ropa de Hombre | `badge-men` |
| `women's clothing` | Ropa de Mujer | `badge-women` |

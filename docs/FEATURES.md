# Features

## Product Catalog

Browse the complete FakeStore product catalog with multiple views and filters.

### All Products Page (`/productos`)
- Displays all products from FakeStore API in a responsive grid
- Each product shown as a `CardProduct` with image, title, price, rating, and action buttons
- Category filter sidebar via `FiltroCategorias` component
- Loading and error states handled

### Category Pages
Dedicated pages for each product category:

| Route | Category | Component |
|-------|----------|-----------|
| `/electronicos` | Electronics | `Electronicos.jsx` |
| `/joyas` | Jewelry | `Joyas.jsx` |
| `/ropadehombre` | Men's Clothing | `RopaDeHombre.jsx` |
| `/ropademujer` | Women's Clothing | `RopaDeMujer.jsx` |
| `/categorias/:id` | Dynamic category | `Categorias,.jsx` |

Each category page:
- Fetches products filtered by category from FakeStore API
- Renders products in a responsive grid
- Shows loading spinner while fetching
- Handles API errors gracefully

---

## Product Search

Full-text search across product titles, descriptions, and categories.

### Search Bar (Header)
- Input field with search button in the main header
- Also available in the mobile offcanvas sidebar
- Navigates to `/busquedas` with the search term passed via router state

### Search Results Page (`/busquedas`)
- Filters products by matching search term against title, description, and category
- **Category filtering**: Click category chips to narrow results
- **Sorting options**: Sort by price (low-high, high-low), rating, or name (A-Z)
- **"Nueva busqueda" button**: Prompts for a new search term
- Helpful message when no results found
- Loading and error states

---

## Product Detail

Individual product pages with full information.

### Route: `/detalle/:id`
- Fetches single product by ID from FakeStore API
- Displays:
  - Large product image
  - Title and category
  - Price (formatted with `formatCurrency`)
  - Rating with star display
  - Full description
  - "Agregar al carrito" button
  - "Comprar ahora" button (direct checkout)
- Simulated customer reviews section
- Loading and error states

---

## Quick View Modal

Preview product details without leaving the current page.

### Triggered From
- "Vista rapida" button on any `CardProduct`

### Features
- Product image, title, price, description
- Brand and category badges
- Stock information
- "Agregar al carrito" button
- Closes on backdrop click, close button, or Escape key
- Prevents body scroll when open

---

## Shopping Cart

Full cart management with persistent storage.

### Cart Page (`/cartpage`)
- Displays all items in the cart via `MostrarCarrito` component
- For each item:
  - Product image and title
  - Unit price and subtotal
  - Quantity controls (+/- buttons)
  - "Eliminar" button with confirmation
- Cart summary:
  - Total items count
  - Total price
  - "Vaciar Carrito" button (with confirmation)
  - "Proceder al pago" button (checkout)
  - "Seguir comprando" link

### Cart Features
- **Persistence**: Cart saved to `localStorage` — survives page refresh
- **Stock validation**: Cannot add more items than available stock
- **Real-time updates**: Cart badge in header updates immediately
- **Confirmation dialogs**: SweetAlert2 for destructive actions (remove, clear)
- **Toast notifications**: Success/warning feedback on cart actions

---

## Checkout

Simulated order submission.

### Process
1. User clicks "Proceder al pago" or "Comprar ahora"
2. `enviarPedido()` maps cart items to FakeStore API format
3. POSTs to `https://fakestoreapi.com/carts`
4. On success: cart cleared, success alert shown
5. On error: error alert shown, cart preserved

---

## Home Page

Landing page with 12 sections:

### 1. Hero Banner (`Bannerareastart`)
- Embla carousel with 3 slides
- Autoplay with dots navigation
- Promotional banners with CTAs

### 2. Services (`Serviceareastart`)
- 4 service highlights: Free Delivery, Money Return, 24/7 Support, Reliable
- Icon + text layout

### 3. Offers (`Offareastart`)
- 2 promotional offer cards
- Hover effects with discount information

### 4. Top Sales (`Topsaleareastart`)
- Featured products carousel (Embla)
- 4 products displayed at a time

### 5. Ratings Section (`Rattingareastart`)
- Split layout: promotional banner + rated products
- Products overlay on banner image

### 6. Trendy Collection (`Trendycollectionareastart`)
- Tabbed product grid with categories: All, New, Top Rated, Trending
- 8+ products displayed
- Tab switching without page reload

### 7. Ad Banner (`Adbannerareastart`)
- Promotional banner with countdown timer
- Call-to-action buttons

### 8. Testimonials (`Testiminialareastart`)
- Swiper carousel with 5 testimonials
- Navigation arrows and dots
- Customer photos, names, and quotes

### 9. Best Sellers (`Bestsellareastart`)
- Grid of 6 static furniture items
- Product cards with images and prices

### 10. Blog (`Blogareastart`)
- 2 recent blog post previews
- Image, title, date, and excerpt

### 11. Support CTA (`Supportareastart`)
- 3-column layout:
  - Special offers
  - Community links
  - App download (Apple Store, Play Store)

### 12. Brands (`Brandareastart`)
- Row of 5 brand logos

---

## Contact Page

Contact information and appointment booking.

### Route: `/contacto`
- **Breadcrumb header**: Page title with "Inicio" link
- **Contact info**: Address, phone, email
- **Google Maps embed**: Interactive map
- **Appointment form**: Name, email, phone, date, message
- **Business hours**: Displayed in sidebar

---

## Header & Navigation

### Top Bar
- Phone number display
- Promotional banner text
- Language selector dropdown (UI only)
- Currency selector dropdown (UI only)
- Settings dropdown (UI only)

### Main Navigation
- Logo with home link
- Mega menu with category dropdowns:
  - Home
  - Shop (with sub-categories)
  - Pages
  - Blog
  - Contact
- Search bar with submit button
- Wishlist icon
- Cart icon with live item count badge

### Mobile Offcanvas
- Slide-in sidebar for mobile
- Search bar
- Contact information
- Social media links
- Close button and Escape key support

---

## Footer

- **Column 1**: Logo, description, social media links
- **Column 2**: Services links
- **Column 3**: Company links
- **Column 4**: Payment method icons
- **Bottom bar**: Copyright notice

---

## Animations

### WOW.js
- Scroll-triggered animations throughout the site
- Elements animate as they enter the viewport
- Initialized once in `App.jsx` on mount

### Animate.css
- Provides animation classes (fadeIn, slideIn, bounce, etc.)
- Used across all sections and components

### Carousel Libraries
- **Embla Carousel**: Hero banner, top sales, product carousels
- **Swiper**: Testimonials section

---

## Responsive Design

- **Desktop**: Full navigation, multi-column layouts
- **Tablet**: Adjusted grid columns, condensed sections
- **Mobile**: Offcanvas navigation, single-column layouts, touch-friendly controls
- Bootstrap 5 grid system throughout

---

## Error Handling

### Loading States
- Spinner displayed while fetching data
- Skeleton-like placeholders where applicable

### Error States
- Error messages with retry buttons
- Fallback data for critical components (e.g., `FiltroCategorias`)

### 404 Page (`/error405`)
- Friendly error message
- Suggestions for next steps
- Links back to home and popular pages
- Catch-all route for unknown URLs

---

## Utility Features

### Currency Formatting
- `formatCurrency()`: Formats prices as `1.234,56` (European style)
- `formatNumber()`: Formats integers with thousands separator

### Category Translation
- English API categories mapped to Spanish labels
- Consistent badge styling per category

### Stock Simulation
- Random stock (1-20) assigned to each product
- Prevents over-ordering
- Shows stock warnings to user

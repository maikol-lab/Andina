# Troubleshooting

## Common Issues

### Development Server Won't Start

**Problem:** `npm run dev` fails or throws errors.

**Solutions:**
1. Ensure Node.js 18+ is installed: `node --version`
2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Check that port 5173 is not in use:
   ```bash
   # Windows PowerShell
   netstat -ano | findstr :5173
   ```
4. Try a different port:
   ```bash
   npm run dev -- --port 3000
   ```

---

### Blank Page / White Screen

**Problem:** App loads but shows a blank page.

**Solutions:**
1. Open browser DevTools Console (F12) and check for errors
2. Verify `CarritoProvider` wraps `<App />` in `main.jsx`
3. Check that `react-router-dom` is properly installed
4. Ensure `index.html` has `<div id="root"></div>`
5. Clear browser cache and reload

---

### Products Not Loading

**Problem:** Product pages show empty or loading spinner indefinitely.

**Solutions:**
1. Check network tab for failed API requests to `fakestoreapi.com`
2. Verify internet connection — FakeStore API requires online access
3. Check for CORS errors in the console
4. FakeStore API may be rate-limited — wait a moment and retry
5. Verify axios is installed: `npm list axios`

---

### Cart Not Persisting

**Problem:** Cart items disappear on page refresh.

**Solutions:**
1. Check browser DevTools → Application → Local Storage for key `'carrito'`
2. Ensure localStorage is not disabled in browser settings
3. Check for errors in `CarritoContext.jsx` initialization
4. Verify `useEffect` for localStorage sync is not commented out
5. Private/incognito mode may block localStorage — try normal mode

---

### SweetAlert2 Not Showing

**Problem:** Cart actions don't show confirmation dialogs or toasts.

**Solutions:**
1. Verify SweetAlert2 is installed: `npm list sweetalert2`
2. Check import statement in `CarritoContext.jsx`:
   ```js
   import Swal from 'sweetalert2'
   ```
3. Check browser console for Swal-related errors
4. Ensure no CSS is overriding Swal styles

---

### Carousel Not Working

**Problem:** Embla or Swiper carousels don't slide or show all items stacked.

**Solutions:**
1. Verify carousel dependencies are installed:
   ```bash
   npm list embla-carousel embla-carousel-autoplay embla-carousel-react swiper
   ```
2. Check that carousel CSS is loaded (Swiper CSS in `main.jsx`)
3. Ensure carousel containers have proper dimensions (not `height: 0`)
4. Check browser console for carousel-related errors
5. WOW.js animations may conflict — try disabling WOW.js temporarily

---

### Search Not Working

**Problem:** Search returns no results or doesn't navigate.

**Solutions:**
1. Verify search term is passed via `location.state` in `Header.jsx`:
   ```js
   navigate('/busquedas', { state: { searchTerm } })
   ```
2. Check `Busquedas.jsx` reads state correctly:
   ```js
   const location = useLocation()
   const searchTerm = location.state?.searchTerm
   ```
3. Search is case-insensitive — verify filter logic
4. Check that products are fetched before filtering
5. Try searching for known product titles: "backpack", "watch", "shirt"

---

### Styling Issues

**Problem:** Page looks broken, missing styles, or layout is wrong.

**Solutions:**
1. Verify all CSS imports in `main.jsx`:
   ```js
   import 'bootstrap/dist/css/bootstrap.min.css'
   import 'animate.css/animate.min.css'
   import './index.css'
   ```
2. Check that Bootstrap JS is loaded for dropdowns and offcanvas
3. SCSS changes require rebuild — run `npm run dev` again
4. Check browser DevTools → Network for failed CSS loads
5. Clear browser cache

---

### Build Fails

**Problem:** `npm run build` throws errors.

**Solutions:**
1. Run linter first to catch issues:
   ```bash
   npm run lint
   ```
2. Check for unused imports or variables
3. Verify all component imports use correct paths
4. Check for syntax errors in JSX
5. Try cleaning Vite cache:
   ```bash
   rm -rf node_modules/.vite
   npm run build
   ```

---

### Route Not Found / 404 on Refresh

**Problem:** App works with client-side navigation but shows 404 on page refresh.

**Solutions:**
1. This is expected with `BrowserRouter` — the server needs to be configured to serve `index.html` for all routes
2. For Vite preview, this works automatically
3. For production deployment, configure your server:
   - **Vercel/Netlify**: Add `_redirects` or `vercel.json` with rewrite rule
   - **Nginx**: `try_files $uri $uri/ /index.html`
   - **Apache**: Add `.htaccess` with rewrite rules

---

### Offcanvas Not Opening on Mobile

**Problem:** Hamburger menu click does nothing on mobile.

**Solutions:**
1. Check that `showOffcanvas` state toggles correctly
2. Verify Bootstrap JS is loaded (offcanvas requires it)
3. Check z-index conflicts — offcanvas should be above other elements
4. Ensure Escape key handler doesn't interfere
5. Check browser console for JavaScript errors

---

### Dropdown Menus Not Closing

**Problem:** Language/currency/settings dropdowns stay open.

**Solutions:**
1. The `closeAllMenus()` function should fire on outside click — verify the event listener is attached
2. Check that `useEffect` for click-outside detection has proper dependencies
3. Verify `closeAllMenus` is called on route change
4. Check for `e.stopPropagation()` calls that might prevent the handler

---

## API-Related Issues

### FakeStore API Rate Limiting

**Problem:** API requests fail with 429 or timeout errors.

**Solutions:**
1. FakeStore API has rate limits — reduce request frequency
2. Add caching for category list (fetch once, reuse)
3. Implement retry logic with exponential backoff
4. Consider mocking the API for development

---

### FakeStore API Down

**Problem:** All product pages show errors.

**Solutions:**
1. Check API status: visit `https://fakestoreapi.com/products` in browser
2. Implement fallback/mock data for development
3. Add error boundaries to gracefully handle API failures
4. Consider switching to a more reliable mock API

---

## Performance Issues

### Slow Initial Load

**Problem:** App takes too long to load initially.

**Solutions:**
1. Run `npm run build` and analyze bundle size:
   ```bash
   npm run build
   npx vite-bundle-visualizer
   ```
2. Consider code-splitting with `React.lazy()` for route components
3. Lazy-load heavy carousel libraries only where needed
4. Optimize images — use WebP format, compress large images
5. Enable gzip/brotli compression on the server

---

### Memory Leaks

**Problem:** App gets slower over time or crashes after extended use.

**Solutions:**
1. Check for missing cleanup in `useEffect` hooks (event listeners, intervals)
2. Verify carousel instances are destroyed on unmount
3. Check for unbounded state growth
4. Use React DevTools Profiler to identify memory issues

---

## Development Workflow

### Hot Reload Not Working

**Problem:** Changes don't appear in the browser automatically.

**Solutions:**
1. Ensure you're running `npm run dev` (not `npm run preview`)
2. Check that files are saved
3. Verify Vite config doesn't exclude your directories
4. Restart the dev server
5. Check terminal for Vite errors

---

### ESLint Errors

**Problem:** `npm run lint` shows many errors.

**Solutions:**
1. Run with auto-fix:
   ```bash
   npm run lint -- --fix
   ```
2. Check `eslint.config.js` for overly strict rules
3. Add `/* eslint-disable */` comments for intentional violations
4. Fix unused imports and variables first

---

## Getting Help

If none of the above solutions work:

1. Check browser DevTools Console for specific error messages
2. Check browser DevTools Network tab for failed requests
3. Review the [ARCHITECTURE.md](/docs/ARCHITECTURE.md) for component relationships
4. Review the [API_REFERENCE.md](/docs/API_REFERENCE.md) for API details
5. Check the [FakeStore API documentation](https://fakestoreapi.com/docs)
6. Search GitHub issues for similar problems

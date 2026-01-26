import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Error405 from './pages/Error405'
import Electronicos from './pages/productos/Electronicos'
import Productos from './pages/productos/Productos'
import Joyas from './pages/productos/Joyas'
import RopaDeHombre from './pages/productos/RopaDeHombre'
import RopaDeMujer from './pages/productos/RopaDeMujer'
import Categorias from './pages/productos/Categorias,'
import Contacto from './pages/Contacto'
import Detalle from './pages/Detalle'
import CartPage from './pages/CartPage'
import Busquedas from './pages/Busquedas'

// animaciones
import 'animate.css';
import WOW from 'wow.js';
import { useEffect } from 'react'


const App = () => {
  // inicializar WOW.js para las animaciones
  useEffect(() => {
    const wow = new WOW({
      live: true // detecta elementos dinámicos
    });
    wow.init();
  }, []);
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/electronicos' element={<Electronicos />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/categorias/:id' element={<Categorias />} />
          <Route path='/joyas' element={<Joyas />} />
          <Route path='/ropadehombre' element={<RopaDeHombre />} />
          <Route path='/ropademujer' element={<RopaDeMujer />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/detalle/:id' element={<Detalle />} />
          <Route path='/cartpage' element={<CartPage />} />
          <Route path='/busquedas' element={<Busquedas />} />

          <Route path='/error405' element={<Error405 />} />
          <Route path='*' element={<Error405 />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App;

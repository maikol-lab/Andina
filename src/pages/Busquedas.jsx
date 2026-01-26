import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardProduct from '../components/CardProduct';

const Busquedas = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoriaFiltro, setCategoriaFiltro] = useState('all');
    const [orden, setOrden] = useState('relevance');
    const [categorias, setCategorias] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const txtBuscar = location.state?.txtBuscar || '';

    // Obtener categorías
    const getCategorias = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error('Error al cargar categorías:', error);
            setCategorias([]);
        }
    };

    // Función para verificar si una búsqueda es "palabra mal escrita"
    const esBusquedaProbablementeErronea = (busqueda) => {
        if (!busqueda || busqueda.length < 3) return false;
        const erroresComunes = {
            'electonica': 'electronics',
            'joyeria': 'jewelery',
            'electronicos': 'electronics',
            'ropa': 'clothing',
            'hombre': 'men',
            'mujer': 'women',
            'celular': 'phone',
            'telefono': 'phone',
            'computadora': 'laptop',
            'portatil': 'laptop'
        };
        return erroresComunes[busqueda.toLowerCase()];
    };

    // Función para sugerir correcciones
    const obtenerSugerencias = (busqueda, productosExistentes) => {
        const sugerencias = [];
        const busquedaLower = busqueda.toLowerCase();

        categorias.forEach(cat => {
            if (cat.toLowerCase().includes(busquedaLower) || busquedaLower.includes(cat.toLowerCase())) {
                sugerencias.push(cat);
            }
        });

        if (productosExistentes && productosExistentes.length > 0) {
            productosExistentes.slice(0, 3).forEach(p => {
                if (!sugerencias.includes(p.category)) {
                    sugerencias.push(p.category);
                }
            });
        }

        const correccion = esBusquedaProbablementeErronea(busqueda);
        if (correccion && !sugerencias.includes(correccion)) {
            sugerencias.unshift(correccion);
        }
        return sugerencias.slice(0, 5);
    };

    // Obtener productos
    const getProductos = async () => {
        try {
            setLoading(true);
            setError(null);
            setBusquedaRealizada(true);

            if (txtBuscar.trim() === '' && categoriaFiltro === 'all') {
                const response = await fetch('https://fakestoreapi.com/products');
                let data = await response.json();
                setProductos(data);
                setLoading(false);
                return;
            }

            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            let data = await response.json();

            // Filtrar por texto
            if (txtBuscar) {
                const busquedaLower = txtBuscar.toLowerCase();
                data = data.filter(p =>
                    p.title.toLowerCase().includes(busquedaLower) ||
                    p.description.toLowerCase().includes(busquedaLower) ||
                    p.category.toLowerCase().includes(busquedaLower)
                );

                if (data.length === 0) {
                    const sugerencias = obtenerSugerencias(txtBuscar, data);
                    navigate('/error405', {
                        state: {
                            message: `No se encontraron productos para "${txtBuscar}"`,
                            tipo: 'sin_resultados',
                            busqueda: txtBuscar,
                            sugerencias: sugerencias,
                            correccionSugerida: esBusquedaProbablementeErronea(txtBuscar),
                            mostrarBuscador: true
                        }
                    });
                    return;
                }
            }

            // Filtrar por categoría
            if (categoriaFiltro !== 'all') {
                data = data.filter(p => p.category === categoriaFiltro);
                if (data.length === 0 && txtBuscar) {
                    navigate('/error405', {
                        state: {
                            message: `No hay productos para "${txtBuscar}" en ${categoriaFiltro}`,
                            tipo: 'sin_resultados_categoria',
                            busqueda: txtBuscar,
                            categoria: categoriaFiltro,
                            mostrarBuscador: true
                        }
                    });
                    return;
                }
            }

            // Ordenamiento
            switch (orden) {
                case 'price-asc': data.sort((a, b) => a.price - b.price); break;
                case 'price-desc': data.sort((a, b) => b.price - a.price); break;
                case 'rating': data.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)); break;
                case 'name-asc': data.sort((a, b) => a.title.localeCompare(b.title)); break;
                case 'name-desc': data.sort((a, b) => b.title.localeCompare(a.title)); break;
                default: break;
            }

            setProductos(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => { getCategorias(); }, []);
    useEffect(() => {
        if (busquedaRealizada || txtBuscar || categoriaFiltro !== 'all') {
            getProductos();
        }
    }, [txtBuscar, categoriaFiltro, orden]);

    const handleNuevaBusqueda = () => {
        const searchTerm = prompt('¿Qué producto estás buscando?', txtBuscar || '');
        if (searchTerm !== null && searchTerm.trim() !== '') {
            navigate('/busquedas', { state: { txtBuscar: searchTerm }, replace: true });
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary animate__animated animate__pulse animate__infinite"></div>
                <p className="mt-3">Buscando "{txtBuscar}"...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

            {/* Header */}
            <div className="animate__animated animate__fadeInDown text-center mb-5">
                <h1>{txtBuscar ? `Resultados para: "${txtBuscar}"` : 'Todos los productos'}</h1>
                <p className="text-muted">{productos.length} productos encontrados</p>
            </div>

            {/* Controles de filtro y ordenamiento */}
            <div className="row mb-4">
                <div className="col-lg-8 mb-3">
                    <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                        <button
                            className={`btn btn-hover-custom ${categoriaFiltro === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setCategoriaFiltro('all')}
                        >
                            Todas
                        </button>
                        {categorias.map(cat => (
                            <button
                                key={cat}
                                className={`btn btn-hover-custom ${categoriaFiltro === cat ? 'btn-info text-white' : 'btn-outline-info'}`}
                                onClick={() => setCategoriaFiltro(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-lg-4">
                    <select className="form-select btn-hover-custom" value={orden} onChange={(e) => setOrden(e.target.value)}>
                        <option value="relevance">Relevancia</option>
                        <option value="price-asc">Precio: Menor a mayor</option>
                        <option value="price-desc">Precio: Mayor a menor</option>
                        <option value="rating">Mejor calificación</option>
                    </select>
                </div>
            </div>

            {/* Lista de productos */}
            <div className="row justify-content-center animate__animated animate__fadeInUp">
                {productos.map((item) => (
                    <CardProduct item={item} key={item.id} />
                ))}
            </div>

            {/* Footer de acciones */}
            <div className="text-center mt-5">
                <button className="btn btn-outline-secondary me-2 btn-hover-custom" onClick={() => navigate('/home')}>Ir al inicio</button>
                <button className="btn btn-primary btn-hover-custom" onClick={handleNuevaBusqueda}>Nueva búsqueda</button>
            </div>

            {/* Estilos Hover Integrados */}
            <style>{`
                .btn-hover-custom {
                    transition: all 0.3s ease;
                    border-radius: 8px;
                }
                .btn-hover-custom:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .form-select.btn-hover-custom:focus {
                    border-color: #0dcaf0;
                    box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.25);
                }
            `}</style>
        </div>
    );
};

export default Busquedas;
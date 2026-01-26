import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";

// API de FakeStore - todos los productos
const API = 'https://fakestoreapi.com/products';

const Productos = () => {
    const [datos, setDatos] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Adaptamos la estructura de datos para que sea compatible con CardProduct
            const adaptedData = data.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                image: item.image,
                rating: item.rating?.rate,
                // Agregamos campos adicionales que podría necesitar CardProduct
                brand: getBrandFromTitle(item.title),
                stock: Math.floor(Math.random() * 100) + 1, // Stock aleatorio
                discount: item.price > 100 ? Math.floor(Math.random() * 30) + 5 : 0,
                images: [item.image] // Convertimos a array para compatibilidad
            }));
            
            // Guardamos todos los productos
            setAllProducts(adaptedData);
            // Mostramos solo los primeros 20 productos (la API solo tiene 20)
            // Si necesitas 50, tendrías que usar otra API o implementar paginación
            setDatos(adaptedData.slice(0, 20)); // Fake Store solo tiene 20 productos
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Función para extraer marca del título
    const getBrandFromTitle = (title) => {
        const brands = ['Samsung', 'Apple', 'Microsoft', 'Sony', 'Dell', 'HP', 'Nike', 'Adidas', 'Louis Vuitton', 'Gucci'];
        for (const brand of brands) {
            if (title.toLowerCase().includes(brand.toLowerCase())) {
                return brand;
            }
        }
        return 'Premium Brand';
    };

    // Obtener categorías únicas
    const categories = ['all', ...new Set(allProducts.map(item => item.category))];

    // Filtrar por categoría seleccionada y limitar a 50 productos
    const filteredProducts = selectedCategory === 'all' 
        ? allProducts.slice(0, 20) // Solo mostramos 20 (máximo de la API)
        : allProducts
            .filter(item => item.category === selectedCategory)
            .slice(0, 20); // Limitamos a 20 por categoría

    useEffect(() => {
        getDatos();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los productos</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h4 className="text-center py-4">Nuestros Productos</h4>
            
            {/* Información sobre el límite de productos */}
            <div className="alert alert-info text-center">
                <small>Mostrando hasta 20 productos (API Fake Store tiene 20 productos totales)</small>
            </div>
            
            {/* Filtros de categoría */}
            <div className="mb-4">
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`btn ${
                                selectedCategory === category 
                                ? 'btn-primary' 
                                : 'btn-outline-primary'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === 'all' ? 'Todos los productos' : 
                             category === "men's clothing" ? "Ropa Hombre" :
                             category === "women's clothing" ? "Ropa Mujer" :
                             category === "jewelery" ? "Joyería" :
                             category === "electronics" ? "Electrónica" :
                             category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contador de productos */}
            <div className="mb-3 text-muted text-center">
                Mostrando {filteredProducts.length} {selectedCategory === 'all' ? 'productos' : `productos de ${selectedCategory}`}
            </div>

            <div className="row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <CardProduct 
                            item={item} 
                            key={item.id}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <div className="alert alert-warning">
                            <p>No hay productos disponibles en esta categoría.</p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Botón para recargar */}
            <div className="text-center mt-4">
                <button 
                    className="btn btn-secondary"
                    onClick={() => {
                        setLoading(true);
                        getDatos();
                    }}
                >
                    Actualizar Productos
                </button>
            </div>
        </div>
    );
}

export default Productos;
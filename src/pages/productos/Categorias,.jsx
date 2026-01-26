import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";
import { useParams } from "react-router-dom";

const API = 'https://fakestoreapi.com/products/category/';

const Categorias = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    const params = useParams();

    // Codificar la categoría para la URL
    const encodedCategory = params.id ? encodeURIComponent(params.id) : '';
    const URI = API + encodedCategory;

    const getDatos = async () => {
        try {
            const response = await fetch(URI);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data); // Fake Store devuelve array directamente, no tiene "products"

            // Establecer nombre de categoría formateado
            if (params.id) {
                const formattedName = formatCategoryName(params.id);
                setCategoryName(formattedName);
            }

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Función para formatear el nombre de la categoría
    const formatCategoryName = (categoryId) => {
        switch (categoryId) {
            case "men's clothing":
                return "Ropa de Hombre";
            case "women's clothing":
                return "Ropa de Mujer";
            case "jewelery":
                return "Joyería";
            case "electronics":
                return "Electrónica";
            default:
                // Capitalizar y reemplazar guiones
                return categoryId
                    .replace(/-/g, ' ')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
        }
    };

    useEffect(() => {
        getDatos();
    }, [params.id]); // Se ejecuta cuando cambia el id de la categoría

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
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => {
                        setLoading(true);
                        setError(null);
                        getDatos();
                    }}
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <h4 className="text-center py-4">
                {categoryName || 'Categoría'}
            </h4>

            <div className="text-center mb-4">
                <p className="text-muted">
                    Mostrando {datos.length} productos
                </p>
            </div>

            {datos.length === 0 ? (
                <div className="text-center py-5">
                    <div className="alert alert-info">
                        <h5>No hay productos en esta categoría</h5>
                        <p>La categoría seleccionada no contiene productos disponibles.</p>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {datos.map((item) => (
                        <CardProduct item={item} key={item.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Categorias;
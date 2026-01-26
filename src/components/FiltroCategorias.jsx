import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = 'https://fakestoreapi.com/products/categories';

const FiltroCategorias = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para formatear el nombre de la categoría
    const formatCategoryName = (category) => {
        const categoryNames = {
            "electronics": "Electrónica",
            "jewelery": "Joyería",
            "men's clothing": "Ropa de Hombre",
            "women's clothing": "Ropa de Mujer"
        };
        return categoryNames[category] || category;
    };

    const getDatos = async () => {
        try {
            console.log("Obteniendo categorías desde:", API); // Debug
            const response = await fetch(API);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log("Categorías recibidas:", data); // Debug
            setDatos(data);
            setLoading(false);
        } catch (error) {
            console.error("Error obteniendo categorías:", error);
            setError(error.message);

            // Datos de respaldo si falla la API
            const backupData = ["electronics", "jewelery", "men's clothing", "women's clothing"];
            setDatos(backupData);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    if (loading) {
        return (
            <li>
                <div className="dropdown-item">
                    <div className="d-flex align-items-center">
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="small">Cargando...</span>
                    </div>
                </div>
            </li>
        );
    }

    if (error) {
        return (
            <li>
                <div className="dropdown-item text-danger">
                    <small>Error: {error}</small>
                </div>
            </li>
        );
    }

    return (
        <>
            {datos.map((item, index) => (
                <li key={index}>
                    <Link
                        to={`/categorias/${item}`}
                        className="dropdown-item"
                    >
                        {formatCategoryName(item)}
                    </Link>
                </li>
            ))}
        </>
    );
}

export default FiltroCategorias;
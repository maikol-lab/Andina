import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";

const RopaDeHombre = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDatos = async () => {
        try {
            const category = "men's clothing";
            const encodedCategory = encodeURIComponent(category);
            const API = `https://fakestoreapi.com/products/category/${encodedCategory}`;
            
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Productos</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h4 className="text-center py-4">Ropa de Hombre</h4>
            {datos.length === 0 ? (
                <div className="text-center py-5">
                    <p>No hay productos disponibles en esta categoría.</p>
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

export default RopaDeHombre;
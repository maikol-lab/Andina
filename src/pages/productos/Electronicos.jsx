import { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct";


// Usando FakeStore API - categoría electronics
const API = 'https://fakestoreapi.com/products/category/electronics';

const Electronicos = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Filtramos para obtener solo productos tipo laptop/tecnología
            const filteredData = data.filter(item =>
                item.title.toLowerCase().includes('laptop') ||
                item.title.toLowerCase().includes('computer') ||
                item.category === 'electronics'
            );

            setDatos(filteredData);
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
                <p>Cargando productos electrónicos...</p>
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
            <h4 className="text-center py-4">Productos Electrónicos</h4>
            {datos.length === 0 ? (
                <div className="text-center py-5">
                    <p>No se encontraron productos electrónicos</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => getDatos()}
                    >
                        Reintentar
                    </button>
                </div>
            ) : (
                <div className="row">
                    {datos.map((item) => (
                        <CardProduct
                            item={{
                                ...item,
                                // Adaptamos la estructura para que sea compatible con Cardprod
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                description: item.description,
                                image: item.image,
                                category: item.category,
                                rating: item.rating?.rate,
                                stock: 50 // Valor por defecto ya que FakeStore no tiene stock
                            }}
                            key={item.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Electronicos;
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalProduct from "./ModalProduct";
import { useCarrito } from "../context/CarritoContext";

const CardProduct = ({ item }) => {
    const { agregarAlCarrito } = useCarrito();
    // Función para agregar al carrito
    const handleAgregarAlCarrito = () => {
        if (!item) return;

        // Crear el objeto producto con todos los datos necesarios
        const producto = {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            category: item.category,
            stock: stock || 0,
            rating: item.rating,
            description: item.description
        };

        // Llamar a la función del contexto
        agregarAlCarrito(producto);

    };

    // Estado para controlar el modal manualmente
    const [showModal, setShowModal] = useState(false);

    // Formatear la categoría para mostrarla mejor
    const formatCategory = (category) => {
        if (!category) return 'Sin categoría';

        const categoryMap = {
            "electronics": "Electrónica",
            "jewelery": "Joyería",
            "men's clothing": "Ropa de Hombre",
            "women's clothing": "Ropa de Mujer"
        };

        return categoryMap[category] || category
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Determinar el badge según la categoría
    const getCategoryBadge = (category) => {
        switch (category) {
            case "men's clothing":
                return { text: "Hombre", className: "bg-info" };
            case "women's clothing":
                return { text: "Mujer", className: "bg-pink" };
            case "jewelery":
                return { text: "Joyería", className: "bg-warning text-dark" };
            case "electronics":
                return { text: "Electrónica", className: "bg-secondary" };
            default:
                return null;
        }
    };

    // Obtener marca según categoría
    const getBrand = (category) => {
        const brandMap = {
            "electronics": "Tech Brand",
            "jewelery": "Luxury Brand",
            "men's clothing": "Men's Fashion",
            "women's clothing": "Women's Fashion"
        };
        return brandMap[category] || "Premium Brand";
    };

    const badge = getCategoryBadge(item.category);
    const brand = getBrand(item.category);
    const stock = Math.floor(Math.random() * 100) + 20; // Stock simulado

    return (
        <>
            {/* Agregar CSS de Animate.css */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

            <div className="col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm animate__animated animate__fadeInUp">
                    <div className="card-img-top" style={{ height: '200px', overflow: 'hidden' }}>
                        <img
                            src={item.image}
                            className="w-100 h-100 object-fit-contain p-3 animate__animated animate__fadeIn"
                            alt={item.title || 'Producto'}
                            style={{ backgroundColor: '#f8f9fa' }}
                        />
                    </div>
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-title animate__animated animate__fadeIn" style={{ height: '80px', overflow: 'hidden' }}>
                            {item.title}
                        </h6>

                        <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="card-text text-primary mb-0 animate__animated animate__fadeInLeft">
                                    ${item.price?.toFixed(2) || '0.00'}
                                </h5>
                                {badge && (
                                    <span className={`badge ${badge.className} animate__animated animate__bounceIn`}>
                                        {badge.text}
                                    </span>
                                )}
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <small className="text-muted animate__animated animate__fadeIn">
                                    {formatCategory(item.category)}
                                </small>
                                {item.rating && (
                                    <small className="text-warning d-flex align-items-center animate__animated animate__fadeIn">
                                        ⭐ {item.rating?.rate?.toFixed(1) || '0.0'}
                                        <span className="text-muted ms-1 small">
                                            ({item.rating?.count || 0})
                                        </span>
                                    </small>
                                )}
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-primary btn-sm flex-fill animate__animated animate__fadeInLeft"
                                    onClick={() => setShowModal(true)}
                                >
                                    Vista rápida
                                </button>
                                <Link
                                    to={`/detalle/${item.id}`}
                                    className="btn btn-info btn-sm flex-fill animate__animated animate__fadeInRight"
                                >
                                    Detalle
                                </Link>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-outline-success animate__animated animate__fadeInUp"
                        onClick={handleAgregarAlCarrito}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>

            {/* Usamos el Modal como componente separado */}
            <ModalProduct
                show={showModal}
                onClose={() => setShowModal(false)}
                item={item}
                brand={brand}
                stock={stock}
                formatCategory={formatCategory}
            />
        </>
    );
};

export default CardProduct;
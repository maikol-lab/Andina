import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";

const ModalProduct = ({ show, onClose, item, brand, stock, formatCategory }) => {
    const { agregarAlCarrito } = useCarrito();

    // Prevenir scroll cuando el modal está abierto
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

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

        // Opcional: Cerrar el modal después de agregar
        // onClose();
    };

    // Si no hay show, no renderizar nada
    if (!show) return null;

    return (
        <>
            {/* Agregar CSS de Animate.css */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

            {/* Modal */}
            <div
                className="modal fade show"
                style={{
                    display: 'block',
                    backgroundColor: 'rgba(0,0,0,0.5)', // Este es el overlay semi-transparente correcto
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1050
                }}
                tabIndex={-1}
                aria-labelledby={`modalLabel-${item.id}`}
                aria-hidden={!show}
            >
                <div
                    className="modal-dialog modal-xl animate__animated animate__zoomIn"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '900px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflow: 'hidden'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content animate__animated animate__fadeInUp" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="modal-header">
                            <h5 className="modal-title animate__animated animate__fadeInLeft" id={`modalLabel-${item.id}`}>
                                {item.title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close animate__animated animate__rotateIn"
                                onClick={onClose}
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="img-fluid rounded animate__animated animate__fadeInLeft"
                                        style={{
                                            maxHeight: '300px',
                                            objectFit: 'contain',
                                            width: '100%'
                                        }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="product-info">
                                        <p className="fs-4 fw-bold text-primary animate__animated animate__fadeInRight">
                                            ${item.price?.toFixed(2) || '0.00'}
                                        </p>

                                        <div className="mb-3">
                                            <span className="badge bg-secondary me-2 animate__animated animate__bounceIn">
                                                {formatCategory(item.category)}
                                            </span>
                                            <span className="badge bg-info animate__animated animate__bounceIn" style={{ animationDelay: '0.1s' }}>
                                                {brand}
                                            </span>
                                        </div>

                                        <p className="fs-5 animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}>
                                            <strong>Disponibilidad:</strong>
                                            <span className={`ms-2 ${stock > 10 ? 'text-success' : 'text-warning'} animate__animated animate__pulse animate__infinite`}>
                                                {stock} unidades en stock
                                            </span>
                                        </p>

                                        <p className="fs-5 animate__animated animate__fadeIn" style={{ animationDelay: '0.3s' }}>
                                            <strong>Rating:</strong>
                                            <span className="ms-2 text-warning">
                                                {'★'.repeat(Math.floor(item.rating?.rate || 0))}
                                                {'☆'.repeat(5 - Math.floor(item.rating?.rate || 0))}
                                            </span>
                                            <span className="ms-2">
                                                ({item.rating?.rate?.toFixed(1) || '0.0'}/5)
                                            </span>
                                        </p>

                                        <p className="fs-6 mt-3 animate__animated animate__fadeIn" style={{ animationDelay: '0.4s' }}>
                                            <strong>Descripción:</strong>
                                            <br />
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="d-flex gap-2 w-100">
                                <button
                                    className="btn btn-outline-secondary flex-fill animate__animated animate__fadeInLeft"
                                    onClick={onClose}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="btn btn-primary flex-fill animate__animated animate__fadeInUp"
                                    onClick={handleAgregarAlCarrito}
                                >
                                    Agregar al carrito
                                </button>
                                <Link
                                    to={`/detalle/${item.id}`}
                                    className="btn btn-info flex-fill animate__animated animate__fadeInRight"
                                    onClick={onClose}
                                >
                                    Ver detalle completo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default ModalProduct;
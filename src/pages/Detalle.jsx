import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = 'https://fakestoreapi.com/products/';

const Detalle = () => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const URI = `${API_BASE}${id}`;

    const getProduct = async () => {
        try {
            const res = await fetch(URI);
            if (!res.ok) throw new Error(`Error al cargar datos (status: ${res.status})`);
            const data = await res.json();
            setProducto(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    if (loading) {
        return (
            <>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
                <div className="text-center py-5">
                    <div className="spinner-border text-primary animate__animated animate__pulse animate__infinite" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2 animate__animated animate__fadeIn">Cargando detalles del producto</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
                <div className="text-center py-5 text-danger">
                    <h4 className="animate__animated animate__headShake">Hubo un problema al cargar los datos</h4>
                    <p className="animate__animated animate__fadeIn">{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Agregar CSS de Animate.css */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

            <div className="container my-4">
                {/* Botón Volver */}
                <div className="d-flex justify-content-end mb-3 animate__animated animate__fadeInRight">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-secondary animate__animated animate__fadeIn"
                    >
                        ← Volver
                    </button>
                </div>

                {/* Título */}
                <h4 className="text-center py-3 animate__animated animate__fadeInDown">Detalle del Producto</h4>

                {/* Fila con imagen y detalles */}
                <div className="row g-4">
                    <div className="col-md-4 animate__animated animate__fadeInLeft">
                        <img
                            src={producto.image}
                            alt={producto.title}
                            className="img-fluid rounded shadow-sm animate__animated animate__zoomIn"
                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                    </div>
                    <div className="col-md-8 animate__animated animate__fadeInRight">
                        <div className="p-4 h-100 shadow-sm">
                            <h5 className="fw-bold animate__animated animate__fadeIn">{producto.title}</h5>
                            <p className="animate__animated animate__fadeIn" style={{ animationDelay: '0.1s' }}><strong>Precio:</strong> <span className="text-primary fw-bold animate__animated animate__pulse animate__infinite animate__slower">${producto.price}</span></p>
                            <p className="animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}><strong>Categoría:</strong> <span className="badge bg-info animate__animated animate__bounceIn">{producto.category}</span></p>
                            <p className="animate__animated animate__fadeIn" style={{ animationDelay: '0.3s' }}><strong>Rating:</strong>
                                <span className="ms-2 text-warning animate__animated animate__heartBeat animate__infinite animate__slower">
                                    {'★'.repeat(Math.floor(producto.rating?.rate || 0))}
                                    {'☆'.repeat(5 - Math.floor(producto.rating?.rate || 0))}
                                </span>
                                <span className="ms-2">({producto.rating?.rate} - {producto.rating?.count} reseñas)</span>
                            </p>
                            <p className="animate__animated animate__fadeIn" style={{ animationDelay: '0.4s' }}><strong>Descripción:</strong> {producto.description}</p>

                            {/* Información adicional simulada */}
                            <div className="mt-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.5s' }}>
                                <h6>Información adicional</h6>
                                <p><strong>Envío:</strong> <span className="text-success animate__animated animate__pulse animate__infinite">Gratis en pedidos mayores a $50</span></p>
                                <p><strong>Disponibilidad:</strong> <span className="text-success fw-bold">En stock</span></p>
                                <p><strong>Marca:</strong> {producto.category === 'electronics' ? 'Tech Brand' : 'Premium Brand'}</p>
                            </div>

                            {/* Botones de acción */}
                            <div className="mt-4 d-flex gap-3 animate__animated animate__fadeInUp" style={{ animationDelay: '0.6s' }}>
                                <button className="btn btn-primary animate__animated animate__bounceIn">
                                    Agregar al carrito
                                </button>
                                <button className="btn btn-outline-success animate__animated animate__bounceIn" style={{ animationDelay: '0.1s' }}>
                                    Comprar ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comentarios simulados */}
                <div className="mt-5">
                    <h5 className="animate__animated animate__fadeInDown">Comentarios de Usuarios</h5>
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        {/* Comentarios simulados */}
                        {[
                            { comment: "Excelente producto, muy buena calidad", rating: 5, reviewerName: "Juan Pérez" },
                            { comment: "Cumple con lo esperado, buen precio", rating: 4, reviewerName: "María García" },
                            { comment: "Llegó en perfecto estado, lo recomiendo", rating: 5, reviewerName: "Carlos López" },
                            { comment: "Buen producto, pero el envío fue lento", rating: 3, reviewerName: "Ana Martínez" }
                        ].map((review, index) => (
                            <div className="col" key={index}>
                                <div className="card border-light shadow-sm animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="card-body">
                                        <p className="mb-1 animate__animated animate__fadeIn"><strong>Comentario:</strong> {review.comment}</p>
                                        <p className="mb-1 animate__animated animate__fadeIn" style={{ animationDelay: '0.1s' }}><strong>Calificación:</strong>
                                            <span className="ms-2 text-warning animate__animated animate__heartBeat animate__infinite animate__slower">
                                                {'★'.repeat(review.rating)}
                                                {'☆'.repeat(5 - review.rating)}
                                            </span>
                                        </p>
                                        <p className="mb-0 animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}><strong>Usuario:</strong> {review.reviewerName}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detalle;
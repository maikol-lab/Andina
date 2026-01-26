import { useEffect, useState } from "react";
import { useCarrito } from "../../context/CarritoContext";
import { formatCurrency, formatNumber } from "../util/funciones";
import Swal from 'sweetalert2';

const MostrarCarrito = () => {
    const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, enviarPedido } = useCarrito();
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [shipping, setShipping] = useState(3);
    const [impuesto, setImpuesto] = useState(16);
    const [totalFinal, setTotalFinal] = useState(0);

    // Calcular total cada vez que cambia el carrito
    useEffect(() => {
        const suma = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        setTotal(suma);

        const items = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        setTotalItems(items);

        const impuestoCalculado = (suma * impuesto) / 100;
        const totalFinalCalculado = suma + shipping + impuestoCalculado;
        setTotalFinal(totalFinalCalculado);

    }, [carrito, shipping, impuesto]);

    // Función para manejar el cambio de cantidad
    const handleCantidadChange = (item, valor) => {
        // Si el valor está vacío o no es un número, establecer a 1
        if (valor === '' || isNaN(valor)) {
            actualizarCantidad(item.id, 1);
            return;
        }

        const cantidad = parseInt(valor);

        // Validar rango
        if (cantidad >= 1 && cantidad <= (item.stock || 99)) {
            actualizarCantidad(item.id, cantidad);
        } else if (cantidad > (item.stock || 99)) {
            Swal.fire({
                icon: 'warning',
                title: 'Stock insuficiente',
                text: `Solo hay ${item.stock || 99} unidades disponibles.`,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d6efd',
            }).then(() => {
                actualizarCantidad(item.id, item.stock || 99);
            });
        } else if (cantidad < 1) {
            Swal.fire({
                title: '¿Eliminar del carrito?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarDelCarrito(item.id);
                } else {
                    actualizarCantidad(item.id, 1);
                }
            });
        }
    };

    return (
        <>
            {/* Agregar CSS de Animate.css */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

            <div className="container-fluid py-5">
                <div className="container py-5">
                    {/* Mensaje cuando el carrito está vacío */}
                    {carrito.length === 0 ? (
                        <div className="text-center py-5 animate__animated animate__fadeIn">
                            <i className="fas fa-shopping-cart fa-4x text-muted mb-4 animate__animated animate__pulse animate__infinite"></i>
                            <h3 className="mb-3 animate__animated animate__fadeInUp">Tu carrito está vacío</h3>
                            <p className="text-muted mb-4 animate__animated animate__fadeIn">Agrega productos para continuar con tu compra</p>
                            <a href="/productos" className="btn btn-primary rounded-pill px-4 py-3 animate__animated animate__bounceIn">
                                <i className="fas fa-shopping-bag me-2"></i>
                                Ver productos
                            </a>
                        </div>
                    ) : (
                        <>
                            {/* Resumen del carrito */}
                            <div className="mb-4 animate__animated animate__fadeInDown">
                                <h2 className="mb-3">Carrito de Compras</h2>
                                <p className="text-muted">
                                    Tienes <span className="fw-bold text-primary animate__animated animate__pulse animate__infinite animate__slower">{totalItems}</span> {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
                                </p>
                            </div>

                            <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <table className="table table-hover animate__animated animate__fadeInUp">
                                    <thead className="table-light animate__animated animate__fadeIn">
                                        <tr>
                                            <th scope="col" style={{ width: '80px' }}>Imagen</th>
                                            <th scope="col" style={{ minWidth: '200px' }}>Producto</th>
                                            <th scope="col" style={{ width: '100px' }}>Código</th>
                                            <th scope="col" style={{ width: '100px' }}>Precio</th>
                                            <th scope="col" style={{ width: '150px' }}>Cantidad</th>
                                            <th scope="col" style={{ width: '100px' }}>Total</th>
                                            <th scope="col" style={{ width: '80px' }}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carrito.map((item, index) => (
                                            <tr key={item.id} className="animate__animated animate__fadeInLeft" style={{ animationDelay: `${index * 0.05}s` }}>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="img-fluid rounded animate__animated animate__zoomIn"
                                                        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                                    />
                                                </td>
                                                <td>
                                                    <div className="d-flex flex-column">
                                                        <strong className="mb-1" style={{ fontSize: '0.9rem' }}>
                                                            {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                                                        </strong>
                                                        <small className="text-muted">{item.category}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-secondary animate__animated animate__bounceIn">{item.id}</span>
                                                </td>
                                                <td>
                                                    <strong className="animate__animated animate__fadeIn">{formatCurrency(item.price)}</strong>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn btn-sm btn-outline-danger rounded-circle"
                                                            onClick={() => handleCantidadChange(item, item.cantidad - 1)}
                                                            style={{ width: '30px', height: '30px' }}
                                                        >
                                                            <i className="fas fa-minus" style={{ fontSize: '10px' }} />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max={item.stock || 99}
                                                            value={item.cantidad}
                                                            onChange={(e) => {
                                                                handleCantidadChange(item, e.target.value);
                                                            }}
                                                            onBlur={(e) => {
                                                                if (e.target.value === '' || e.target.value < 1) {
                                                                    handleCantidadChange(item, 1);
                                                                }
                                                            }}
                                                            className="form-control form-control-sm mx-2"
                                                            style={{
                                                                width: '60px',
                                                                textAlign: 'center',
                                                                padding: '0.25rem',
                                                                // Asegurar que el texto sea visible
                                                                color: '#000',
                                                                backgroundColor: '#fff',
                                                                border: '1px solid #ced4da'
                                                            }}
                                                        />
                                                        <button
                                                            className="btn btn-sm btn-outline-success rounded-circle"
                                                            onClick={() => handleCantidadChange(item, item.cantidad + 1)}
                                                            style={{ width: '30px', height: '30px' }}
                                                        >
                                                            <i className="fas fa-plus" style={{ fontSize: '10px' }} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <strong className="text-primary animate__animated animate__fadeIn">
                                                        {formatCurrency(item.cantidad * item.price)}
                                                    </strong>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger rounded-circle animate__animated animate__fadeIn"
                                                        onClick={() => eliminarDelCarrito(item.id)}
                                                        style={{ width: '35px', height: '35px' }}
                                                        title="Eliminar producto"
                                                    >
                                                        <i className="fas fa-trash-alt" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Botones de acción */}
                            <div className="d-flex justify-content-between align-items-center mt-4 animate__animated animate__fadeInUp">
                                <div>
                                    <button
                                        className="btn btn-outline-primary rounded-pill px-4 py-2 animate__animated animate__fadeInLeft"
                                        type="button"
                                        onClick={() => window.history.back()}
                                    >
                                        <i className="fas fa-arrow-left me-2"></i>
                                        Seguir comprando
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-outline-danger rounded-pill px-4 py-2 me-3 animate__animated animate__fadeIn"
                                        type="button"
                                        onClick={() => { vaciarCarrito() }}
                                    >
                                        <i className="fas fa-trash-alt me-2"></i>
                                        Vaciar Carrito
                                    </button>
                                    <button
                                        className="btn btn-success rounded-pill px-4 py-2 animate__animated animate__fadeInRight"
                                        type="button"
                                        onClick={() => { enviarPedido() }}
                                    >
                                        <i className="fas fa-check-circle me-2"></i>
                                        Proceder al pago
                                    </button>
                                </div>
                            </div>

                            {/* Resumen de compra */}
                            <div className="row mt-5">
                                <div className="col-lg-8"></div>
                                <div className="col-lg-4">
                                    <div className="card border-0 shadow-sm animate__animated animate__fadeInRight">
                                        <div className="card-body">
                                            <h5 className="card-title mb-4 animate__animated animate__fadeIn">Resumen de compra</h5>

                                            <div className="d-flex justify-content-between mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.1s' }}>
                                                <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'}):</span>
                                                <strong>{formatCurrency(total)}</strong>
                                            </div>

                                            <div className="d-flex justify-content-between mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
                                                <span>Envío:</span>
                                                <span>${formatNumber(shipping)}</span>
                                            </div>

                                            <div className="d-flex justify-content-between mb-3 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.3s' }}>
                                                <span>IVA ({impuesto}%):</span>
                                                <span>{formatCurrency((total * impuesto) / 100)}</span>
                                            </div>

                                            <hr className="animate__animated animate__fadeIn" style={{ animationDelay: '0.4s' }} />

                                            <div className="d-flex justify-content-between mb-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.5s' }}>
                                                <h5>Total:</h5>
                                                <h4 className="text-primary animate__animated animate__pulse animate__infinite animate__slower">{formatCurrency(totalFinal)}</h4>
                                            </div>

                                            <button
                                                className="btn btn-primary w-100 py-3 animate__animated animate__bounceIn"
                                                type="button"
                                                onClick={() => { enviarPedido() }}
                                            >
                                                <i className="fas fa-lock me-2"></i>
                                                Comprar ahora
                                            </button>

                                            <div className="mt-3 text-center animate__animated animate__fadeIn" style={{ animationDelay: '0.6s' }}>
                                                <small className="text-muted">
                                                    <i className="fas fa-shield-alt me-1"></i>
                                                    Compra 100% segura
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default MostrarCarrito;
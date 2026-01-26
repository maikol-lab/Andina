// src/context/CarritoContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// 1. Crear el contexto
const CarritoContext = createContext();

// 2. Hook personalizado para usar el contexto
export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
    }
    return context;
};

// 3. Proveedor del contexto
export const CarritoProvider = ({ children }) => {
    // Inicializar desde localStorage
    const getInitialCart = () => {
        try {
            const saved = localStorage.getItem('carrito');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error al cargar el carrito:', e);
            return [];
        }
    };

    const [carrito, setCarrito] = useState(getInitialCart);

    // Guardar en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    // Funciones del carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            const existe = prev.find((item) => item.id === producto.id);

            if (existe) {
                // Si ya está en el carrito, verificar stock antes de sumar
                const nuevaCantidad = existe.cantidad + 1;
                if (nuevaCantidad > producto.stock) {
                    // Mostrar alerta y NO actualizar
                    Swal.fire({
                        icon: 'warning',
                        title: 'Stock insuficiente',
                        text: `Solo hay ${producto.stock} unidades disponibles de "${producto.title}".`,
                        confirmButtonColor: '#0d6efd',
                    });
                    return prev; // No cambia el carrito
                }
                // Si hay stock, incrementar
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: nuevaCantidad }
                        : item
                );
            } else {
                // Si es nuevo, verificar que al menos haya 1 unidad
                if (producto.stock < 1) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Producto agotado',
                        text: `"${producto.title}" no está disponible actualmente.`,
                        confirmButtonColor: '#dc3545',
                    });
                    return prev;
                }
                // Agregar con cantidad 1
                return [...prev, { ...producto, cantidad: 1 }];
            }
        });
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `${producto.title} se añadió al carrito.`,
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end',
        });
    };

    const eliminarDelCarrito = (id) => {
        const item = carrito.find((item) => item.id === id);
        Swal.fire({
            title: '¿Eliminar producto?',
            text: `¿Está seguro de que desea eliminar "${item?.title}" del carrito?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
        }).then((result) => {
            if (result.isConfirmed) {
                setCarrito((prev) => prev.filter((item) => item.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'El producto fue eliminado.',
                    showConfirmButton: false,
                    timer: 1200,
                    toast: true,
                    position: 'top-end',
                });
            }
        });
    };

    const actualizarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        const item = carrito.find((item) => item.id === id);
        if (item && nuevaCantidad > item.stock) {
            Swal.fire({
                icon: 'warning',
                title: 'Stock insuficiente',
                text: `Solo hay ${item.stock} unidades disponibles.`,
                confirmButtonColor: '#0d6efd',
            }).then(() => {
                setCarrito((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, cantidad: item.stock } : item
                    )
                );
            });
            return;
        }
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad: nuevaCantidad } : item
            )
        );
    };

    const vaciarCarrito = () => {
        Swal.fire({
            title: '¿Vaciar carrito?',
            text: 'Esta acción eliminará todos los productos.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
        }).then((result) => {
            if (result.isConfirmed) {
                setCarrito([]);
                Swal.fire({
                    icon: 'success',
                    title: 'Carrito vacío',
                    text: 'Se han eliminado todos los productos.',
                    showConfirmButton: false,
                    timer: 1200,
                    toast: true,
                    position: 'top-end',
                });
            }
        });
    };

    const enviarPedido = async () => {
        if (carrito.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Carrito vacío',
                text: 'No hay productos para comprar.',
                confirmButtonColor: '#0d6efd',
            });
            return;
        }

        const result = await Swal.fire({
            title: '¿Finalizar compra?',
            text: `Está a punto de comprar ${carrito.reduce((sum, item) => sum + item.cantidad, 0)} productos.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#198754',
            cancelButtonColor: '#6c757d',
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch('https://fakestoreapi.com/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 1,
                    date: new Date().toISOString().split('T')[0],
                    products: carrito.map((item) => ({
                        productId: item.id,
                        quantity: item.cantidad,
                    })),
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error('Error al enviar el pedido');

            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                html: `ID del carrito: <strong>${data.id}</strong><br>¡Gracias por su compra!`,
                confirmButtonColor: '#198754',
            });
            setCarrito([]);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en la compra',
                text: error.message || 'No se pudo procesar la compra.',
                confirmButtonColor: '#dc3545',
            });
        }
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                actualizarCantidad,
                vaciarCarrito,
                enviarPedido,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};
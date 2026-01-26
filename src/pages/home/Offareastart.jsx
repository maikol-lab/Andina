import React, { useState } from 'react';

const Offareastart = () => {
    const [hoverFirst, setHoverFirst] = useState(false);
    const [hoverSecond, setHoverSecond] = useState(false);

    const accentColor = '#b18b5e'; // Color dorado/marrón claro

    const OfferItem = ({ 
        backgroundImage, 
        discount, 
        title, 
        link = "/product-details",
        discountBg = "warning",
        isHovered,
        onMouseEnter,
        onMouseLeave
    }) => {
        return (
            <div className="col-lg-6">
                <a 
                    href={link} 
                    className="furniture-off__item d-block position-relative overflow-hidden rounded"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    style={{
                        height: '450px',
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    {/* Imagen de fondo con zoom */}
                    <div 
                        className="background-image"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url('${backgroundImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.7s ease',
                            zIndex: 0
                        }}
                    />
                    
                    {/* Overlay con gradiente */}
                    <div 
                        className="overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: isHovered 
                                ? 'linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))' 
                                : 'linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,0,0,0.15))',
                            transition: 'background 0.5s ease',
                            zIndex: 1
                        }}
                    />
                    
                    {/* Contenido */}
                    <div className="position-relative z-2 p-5 h-100 d-flex flex-column justify-content-between">
                        <div>
                            <span className={`fo-discount px-3 py-2 rounded-pill d-inline-block fw-bold ${
                                discountBg === 'warning' ? 'bg-warning text-dark' : 'bg-danger text-white'
                            }`}>
                                {discount}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-white text-capitalize mb-3 display-4 fw-bold">
                                {title}
                            </h3>
                            <div className={`solid-btn mt-30 d-inline-block px-4 py-3 rounded-pill fw-semibold d-flex align-items-center ${
                                isHovered ? 'hovered' : ''
                            }`}>
                                Buy Now
                                <span className="ms-3">
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    };

    return (
        <section className="furniture-off pb-100">
            <div className="container">
                <div className="row g-4">
                    <OfferItem 
                        backgroundImage="/imgs/furniture/product/off-01.png"
                        discount="GET 30% OFF"
                        title="wicker hanging chairs"
                        discountBg="warning"
                        isHovered={hoverFirst}
                        onMouseEnter={() => setHoverFirst(true)}
                        onMouseLeave={() => setHoverFirst(false)}
                    />
                    
                    <OfferItem 
                        backgroundImage="/imgs/furniture/product/off-02.png"
                        discount="GET 15% OFF"
                        title="Brasslegged Armchair"
                        discountBg="danger"
                        isHovered={hoverSecond}
                        onMouseEnter={() => setHoverSecond(true)}
                        onMouseLeave={() => setHoverSecond(false)}
                    />
                </div>
            </div>

            {/* Estilos CSS */}
            <style jsx>{`
                .furniture-off__item {
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                    overflow: hidden;
                }
                
                .furniture-off__item:hover {
                    transform: translateY(-15px);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.2);
                }
                
                .solid-btn {
                    background-color: white;
                    color: #333;
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                    border: 2px solid transparent;
                    width: fit-content;
                }
                
                .solid-btn i {
                    color: ${accentColor};
                    transition: all 0.3s ease;
                }
                
                .solid-btn.hovered {
                    background-color: ${accentColor};
                    color: white;
                    transform: translateX(15px);
                    border-color: ${accentColor};
                }
                
                .solid-btn.hovered i {
                    color: white;
                    transform: translateX(5px);
                }
                
                /* Efecto de brillo en el botón */
                .solid-btn::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: left 0.6s ease;
                }
                
                .solid-btn.hovered::after {
                    left: 100%;
                }
                
                /* Animación del badge */
                .fo-discount {
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                    letter-spacing: 1.5px;
                }
                
                .furniture-off__item:hover .fo-discount {
                    transform: translateY(-5px) scale(1.05);
                }
                
                /* Animación del título */
                h3 {
                    transition: all 0.3s ease;
                    text-shadow: 2px 2px 5px rgba(0,0,0,0.4);
                }
                
                .furniture-off__item:hover h3 {
                    transform: translateY(-5px);
                }
                
                /* Responsive */
                @media (max-width: 1200px) {
                    .furniture-off__item {
                        height: 400px !important;
                    }
                }
                
                @media (max-width: 992px) {
                    .furniture-off__item {
                        height: 350px !important;
                    }
                    
                    h3 {
                        font-size: 2.5rem !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .furniture-off__item {
                        height: 300px !important;
                    }
                    
                    h3 {
                        font-size: 2rem !important;
                    }
                    
                    .solid-btn {
                        padding: 0.75rem 1.5rem !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .furniture-off__item {
                        height: 250px !important;
                    }
                    
                    h3 {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Offareastart;
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Topsaleareastart = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    }, [Autoplay({ delay: 4000 })]);
    
    const products = [
        { id: 1, name: "Alexander roll Arm sofa", price: "USD 150.00", discount: "10% off", image: "/imgs/furniture/product/product1.png", rating: 4, hasDiscount: true },
        { id: 2, name: "Brasslegged Armchair", price: "USD 150.00", discount: "New", image: "/imgs/furniture/product/product2.png", rating: 4, hasDiscount: true },
        { id: 3, name: "Leather Chair", price: "USD 200.00", discount: "10% off", image: "/imgs/furniture/product/product3.png", rating: 4, hasDiscount: true },
        { id: 4, name: "Chair pillow", price: "USD 49.00", discount: "", image: "/imgs/furniture/product/product4.png", rating: 4, hasDiscount: false }
    ];

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="discount-area section-space pt-80 pb-80">
            <div className="container">
                <div className="section-title-wrapper-4 mb-60 text-center">
                    <span className="section-subtitle-4" style={{ color: '#b18b5e', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>top sale</span>
                    <h2 className="section-title-4" style={{ fontSize: '3rem', fontWeight: '700', marginTop: '10px' }}>Featured Product</h2>
                </div>

                <div className="discount-main p-relative">
                    {/* Botones laterales */}
                    <button className="nav-btn prev" onClick={scrollPrev}><i className="fas fa-angle-left" /></button>
                    <button className="nav-btn next" onClick={scrollNext}><i className="fas fa-angle-right" /></button>

                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container">
                            {products.map((product) => (
                                <div className="embla__slide" key={product.id}>
                                    <div className="product-card">
                                        {/* CONTENEDOR CUADRADO Y GRANDE */}
                                        <div className="product-thumb-container">
                                            {product.hasDiscount && (
                                                <span className="badge">{product.discount}</span>
                                            )}
                                            <div className="thumb-bg">
                                                <img src={product.image} alt={product.name} className="main-img" />
                                            </div>
                                            
                                            {/* Iconos que aparecen al hacer hover */}
                                            <div className="hover-actions">
                                                <button className="icon-btn"><i className="fa-regular fa-basket-shopping" /></button>
                                                <button className="icon-btn"><i className="fa-regular fa-eye" /></button>
                                                <button className="icon-btn"><i className="fa-regular fa-heart" /></button>
                                            </div>
                                        </div>

                                        <div className="product-info mt-25">
                                            <h4 className="title"><a href="#">{product.name}</a></h4>
                                            <div className="stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className={`fas fa-star ${i < product.rating ? 'active' : ''}`} />
                                                ))}
                                            </div>
                                            <p className="price">{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .embla { overflow: hidden; padding: 10px; }
                .embla__container { display: flex; margin-left: -30px; }
                
                /* Configuración de slides: 3 por fila en desktop para que sean grandes */
                .embla__slide { 
                    flex: 0 0 100%; 
                    padding-left: 30px; 
                    min-width: 0; 
                }
                @media (min-width: 768px) { .embla__slide { flex: 0 0 50%; } }
                @media (min-width: 1100px) { .embla__slide { flex: 0 0 33.33%; } }

                /* EL CONTENEDOR CUADRADO */
                .product-thumb-container {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1 / 1; /* Esto lo hace cuadrado perfecto */
                    background: #F5F1E6;
                    border-radius: 4px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.4s;
                }

                .thumb-bg {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px; /* Espacio para que la imagen no toque los bordes */
                }

                .main-img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain; /* Mantiene la proporción de la silla */
                    transition: 0.6s transform ease;
                }

                /* HOVER EFFECTS */
                .product-card:hover .main-img {
                    transform: scale(1.1);
                }

                .product-card:hover .product-thumb-container {
                    background: #ede8da;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.05);
                }

                .badge {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background: #b18b5e;
                    color: white;
                    padding: 5px 15px;
                    font-size: 12px;
                    font-weight: 600;
                    z-index: 2;
                }

                .hover-actions {
                    position: absolute;
                    bottom: -60px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 10px;
                    transition: 0.4s;
                }

                .product-card:hover .hover-actions {
                    bottom: 20px;
                }

                .icon-btn {
                    width: 45px;
                    height: 45px;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 10px #b18b5e;
                    transition: 0.3s;
                }

                .icon-btn:hover { background: #b18b5e; color: #white; }
                .icon-btn:hover i { color: white; }

                /* TEXTO */
                .product-info .title { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
                .product-info .title a { color: #222; text-decoration: none; }
                .product-info .price { font-size: 1.2rem; color: #b18b5e; font-weight: 700; margin-top: 10px; }
                .stars i { font-size: 14px; color: #ddd; margin-right: 3px; }
                .stars i.active { color: #ffb400; }

                /* FLECHAS */
                .nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: white;
                    border: 1px solid #eee;
                    cursor: pointer;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    transition: 0.3s;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .nav-btn:hover { background: #b18b5e; color: white; border-color: #b18b5e; }
                .nav-btn.prev { left: -30px; }
                .nav-btn.next { right: -30px; }

                @media (max-width: 1200px) {
                    .nav-btn.prev { left: 0; }
                    .nav-btn.next { right: 0; }
                }
            `}</style>
        </section>
    );
};

export default Topsaleareastart;
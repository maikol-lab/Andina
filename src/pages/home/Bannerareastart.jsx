import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const Bannerareastart = () => {
    // 1. Configuración: 'align: start' ayuda a que reconozca los 3 puntos correctamente
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false
    }, [Autoplay({ delay: 5000 })])

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        onSelect()
    }, [emblaApi, onSelect])

    const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

    // Estilo de los puntos
    const dotStyle = (isActive) => ({
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: isActive ? '#b18b5e' : '#D1D1D1',
        margin: '10px 0', // Espaciado vertical
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isActive ? 'scale(1.3)' : 'scale(1)'
    })

    return (
        <section
            className="banner-4 p-relative furniture-banner-area fix bg-image pb-100"
            style={{
                backgroundImage: "url('/imgs/furniture/banner/bg.png')",
                backgroundColor: "#F5F1E6",
                position: 'relative'
            }}
        >
            <div className="embla" ref={emblaRef} style={{ overflow: 'hidden' }}>
                <div className="embla__container" style={{ display: 'flex' }}>

                    {/* SLIDE 1 */}
                    <div className="embla__slide" style={{ flex: '0 0 100%', minWidth: 0 }}>
                        <div className="banner-item-4 d-flex align-items-end">
                            <div className="container">
                                <div className="row g-5 align-self-end">
                                    <div className="col-xxl-6 col-lg-6">
                                        <div className="banner-content-4 furniture__content">
                                            <span>New Arrival...</span>
                                            <h2 className="banner-title-4">Elevate <br /> Your Home Aesthetics</h2>
                                            <p>A furniture e-commerce company operates in the digital space...</p>
                                            <div className="banner-btn-wrapper furniture__btn-group">
                                                <a className="solid-btn" href="#">Buy Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-lg-6">
                                        <div className="banner-thumb-4 p-relative z-index-1">
                                            <img src="/imgs/furniture/banner/chair1.png" alt="Silla 1" style={{ maxWidth: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 2 */}
                    <div className="embla__slide" style={{ flex: '0 0 100%', minWidth: 0 }}>
                        <div className="banner-item-4 d-flex align-items-end">
                            <div className="container">
                                <div className="row g-5 align-self-end">
                                    <div className="col-xxl-6 col-lg-6">
                                        <div className="banner-content-4 furniture__content">
                                            <span>Exclusive...</span>
                                            <h2 className="banner-title-4">Modern <br /> Design Concept</h2>
                                            <p>Quality furniture for your daily comfort.</p>
                                            <div className="banner-btn-wrapper furniture__btn-group">
                                                <a className="solid-btn" href="#">Buy Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-lg-6">
                                        <div className="banner-thumb-4 p-relative z-index-1">
                                            <img src="/imgs/furniture/banner/chair2.png" alt="Silla 2" style={{ maxWidth: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 3 */}
                    <div className="embla__slide" style={{ flex: '0 0 100%', minWidth: 0 }}>
                        <div className="banner-item-4 d-flex align-items-end">
                            <div className="container">
                                <div className="row g-5 align-self-end">
                                    <div className="col-xxl-6 col-lg-6">
                                        <div className="banner-content-4 furniture__content">
                                            <span>Luxury...</span>
                                            <h2 className="banner-title-4">Premium <br /> Wood Texture</h2>
                                            <p>The best materials for your home aesthetics.</p>
                                            <div className="banner-btn-wrapper furniture__btn-group">
                                                <a className="solid-btn" href="#">Buy Now</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-6 col-lg-6">
                                        <div className="banner-thumb-4 p-relative z-index-1">
                                            <img src="/imgs/furniture/banner/chair3.png" alt="Silla 3" style={{ maxWidth: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* DOTS VERTICALES - Asegúrate de que el contenedor padre tenga position: relative */}
            <div
                style={{
                    position: 'absolute',
                    right: '40px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 99
                }}
            >
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        style={dotStyle(index === selectedIndex)}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </section>
    )
}

export default Bannerareastart;
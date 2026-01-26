import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Testimonialareastart = () => {
    const swiperRef = useRef(null);

    // Datos de testimonios
    const testimonials = [
        {
            id: 1,
            name: "Annette Black",
            role: "Dog Trainer",
            rating: 4,
            text: "Lorem ipsum dolor sit amet consectetur the adipiscing elit vestibulum viverra eget felis interdum fusce odio lacus."
        },
        {
            id: 2,
            name: "Ralph Edwards",
            role: "UI/UX Designer",
            rating: 4,
            text: "Lorem ipsum dolor sit amet consectetur the adipiscing elit vestibulum viverra eget felis interdum fusce odio lacus."
        },
        {
            id: 3,
            name: "Jerome Bell",
            role: "Web Designer",
            rating: 4,
            text: "Lorem ipsum dolor sit amet consectetur the adipiscing elit vestibulum viverra eget felis interdum fusce odio lacus."
        },
        {
            id: 4,
            name: "Annette Black",
            role: "Dog Trainer",
            rating: 5,
            text: "Lorem ipsum dolor sit amet consectetur the adipiscing elit vestibulum viverra eget felis interdum fusce odio lacus."
        },
        {
            id: 5,
            name: "Ralph Edwards",
            role: "UI/UX Designer",
            rating: 4,
            text: "Lorem ipsum dolor sit amet consectetur the adipiscing elit vestibulum viverra eget felis interdum fusce odio lacus."
        }
    ];

    // Función para renderizar estrellas
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i key={i} className="fas fa-star" />);
            } else {
                stars.push(<i key={i} className="fal fa-star" />);
            }
        }
        return stars;
    };

    return (
        <section
            className="furniture-testimonial section-space"
            style={{
                backgroundImage: "url('/imgs/furniture/testimonial/bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="container">
                <div className="section-title-wrapper-4 is-white mb-40 text-center">
                    <span className="section-subtitle-4 mb-10">Testimonials</span>
                    <h2 className="section-title-4">Client Feedback</h2>
                </div>

                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                    className="testimonial-active-3"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="furniture-testimonial__item h-100">
                                <div className="ft-head">
                                    <div className="ft-info">
                                        <div className="fs-rating mb-2">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                        <h5 className="mb-1">{testimonial.name}</h5>
                                        <span className="text-muted">{testimonial.role}</span>
                                    </div>
                                    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_276_28)">
                                            <path d="M23.9729 40C23.9729 37.384 23.9729 34.7679 23.9729 32.0675C27.1379 32.1519 29.7642 30.8861 31.717 27.7637C32.7945 26.076 33.5352 23.7131 33.5352 21.8565C29.8989 21.8565 26.1952 21.8565 22.4915 21.8565C22.4915 14.5148 22.4915 7.25738 22.4915 0C28.2827 0 34.0739 0 39.9325 0C39.9325 0.253165 39.9325 0.421941 39.9325 0.675106C39.9325 7.34177 39.9325 14.0084 39.9325 20.5907C39.9325 29.9578 35.084 37.5527 27.8113 39.5781C26.5992 40 25.3197 40.0844 23.9729 40ZM35.084 20C35.084 20.0844 35.1514 20.1688 35.1514 20.1688C35.4207 26.6667 31.7844 32.4895 26.6665 33.7553C26.2625 33.8397 25.7238 33.8397 25.5218 34.0928C25.3197 34.4304 25.4544 35.1055 25.4544 35.6118C25.4544 36.4557 25.4544 37.2996 25.4544 38.2278C26.3972 37.9747 27.2726 37.8903 28.148 37.6371C34.276 35.6118 38.451 28.8608 38.451 20.8439C38.451 14.6835 38.451 8.6076 38.451 2.44726C38.451 2.27848 38.451 2.1097 38.451 1.94093C33.6026 1.94093 28.8214 1.94093 24.0403 1.94093C24.0403 8.01688 24.0403 14.0084 24.0403 20C27.744 20 31.3803 20 35.084 20Z" fill="#B18B5E" />
                                            <path d="M1.4141 40C1.4141 37.384 1.4141 34.7679 1.4141 32.0675C4.4444 32.1519 7.00332 30.9705 8.95619 28.0169C10.1683 26.2447 10.909 23.8819 10.9764 21.7721C7.34002 21.7721 3.63632 21.7721 -0.0673828 21.7721C-4.2744e-05 14.5148 -4.2744e-05 7.25738 -4.2744e-05 0C5.7912 0 11.5824 0 17.3737 0C17.3737 0.168776 17.3737 0.337553 17.3737 0.506329C17.3737 7.25738 17.3737 14.0928 17.3737 20.8439C17.3064 29.7046 12.6599 37.2152 5.7912 39.4093C4.37706 39.9156 2.96292 40.0844 1.4141 40ZM15.9596 1.85654C11.1111 1.85654 6.32992 1.85654 1.54878 1.85654C1.54878 7.93249 1.54878 13.924 1.54878 20C5.25248 20 8.95619 20 12.5926 20C12.9293 27.0042 8.75417 33.4177 2.96292 34.0084C2.96292 35.3586 2.96292 36.7932 2.96292 38.2278C3.83834 37.9747 4.71376 37.8903 5.58918 37.5527C11.7171 35.6118 15.8922 28.7764 15.9596 20.7595C15.9596 14.5992 15.9596 8.52321 15.9596 2.36287C15.9596 2.27848 15.9596 2.1097 15.9596 1.85654Z" fill="#B18B5E" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_276_28">
                                                <rect width={40} height={40} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p className="mt-3">{testimonial.text}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="navigation__wrapper text-center mt-40">
                    <div className="common-slider-navigation d-flex justify-content-center align-items-center gap-4">
                        <button
                            className="testimonial-button-prev d-flex align-items-center justify-content-center"
                            onClick={() => swiperRef.current?.swiper.slidePrev()}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '1px solid #B18B5E',
                                background: 'transparent',
                                color: '#B18B5E',
                                fontSize: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#B18B5E';
                                e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = '#B18B5E';
                            }}
                        >
                            <i className="fa-regular fa-arrow-left" />
                        </button>
                        <button
                            className="testimonial-button-next d-flex align-items-center justify-content-center"
                            onClick={() => swiperRef.current?.swiper.slideNext()}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '1px solid #B18B5E',
                                background: 'transparent',
                                color: '#B18B5E',
                                fontSize: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#B18B5E';
                                e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = '#B18B5E';
                            }}
                        >
                            <i className="fa-regular fa-arrow-right" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonialareastart;
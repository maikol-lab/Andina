import React, { useState, useEffect } from 'react'

const Adbannerareastart = () => {
    // Configura la fecha objetivo (puedes cambiarla)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 350) // 365 días desde hoy
    targetDate.setHours(23, 59, 59, 999) // Hasta el final del día

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    function calculateTimeLeft() {
        const now = new Date()
        const difference = targetDate.getTime() - now.getTime()

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
                isExpired: false
            }
        }

        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Formatear números con dos dígitos
    const formatNumber = (num) => {
        return num < 10 ? `0${num}` : num.toString()
    }

    return (
        <section className="furniture-ad pb-100">
            <div className="container">
                <div className="row g-4">
                    <div className="col-xxl-7 col-xl-6">
                        <div className="furniture-ad__item h-100"
                            style={{
                                backgroundImage: "url('/imgs/furniture/ad/ad-discount.png')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            <div className="fad-content">
                                <h6 className="text-white mb-20 text-uppercase">HOT DEAL furniture</h6>
                                <h2 className="text-capitalize text-white">Furniture limit offer <br /> 30% Off</h2>
                                <a className="border__btn-f mt-35" href="product-details.html">Buy Now<span><i className="fa-regular fa-angle-right" /></span></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-5 col-xl-6">
                        <div className="furniture-ad__item h-100"
                            style={{
                                backgroundImage: "url('/imgs/furniture/ad/ad-timer.png')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            <div className="fad-content fad-timer text-center">
                                <h6 className="text-white mb-20 text-uppercase">HOT DEAL furniture</h6>
                                <h2 className="text-capitalize text-white mb-30">Deals OF the Week</h2>

                                {timeLeft.isExpired ? (
                                    <div className="expired-message">
                                        <h3 className="text-white">¡La oferta ha expirado!</h3>
                                    </div>
                                ) : (
                                    <div className="countdown-wrapper">
                                        <ul>
                                            <li><span className="countdown-number">{formatNumber(timeLeft.days)}</span>days</li>
                                            <li><span className="countdown-number">{formatNumber(timeLeft.hours)}</span>hrs</li>
                                            <li><span className="countdown-number">{formatNumber(timeLeft.minutes)}</span>mins</li>
                                            <li><span className="countdown-number">{formatNumber(timeLeft.seconds)}</span>secs</li>
                                        </ul>
                                    </div>
                                )}

                                <a className="border__btn-f mt-40" href="product-details.html">
                                    {timeLeft.isExpired ? 'Ver Ofertas' : 'Buy Now'}
                                    <span><i className="fa-regular fa-angle-right" /></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Adbannerareastart;
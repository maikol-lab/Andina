import React from 'react';

const Footer = () => {
  return (
    <>
      {/* Agregar CSS de Animate.css */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      
      <footer className="footer-bg">
        <div className="footer-area section-space-medium">
          <div className="footer-style-4">
            <div className="container">
              <div className="footer-grid-3">
                {/* Columna 1: Logo y redes sociales */}
                <div className="footer-widget-4 animate__animated animate__fadeInUp">
                  <div className="footer-logo mb-35 animate__animated animate__fadeInLeft">
                    <a href="pharmacy.html">
                      <img src="/imgs/logo/logo-white.svg" alt="Logo" />
                    </a>
                  </div>
                  <p className="animate__animated animate__fadeIn">
                    It helps designers plan out where the content will sit, the content to be written and approved.
                  </p>
                  <div className="theme-social">
                    <a href="https://www.facebook.com/" target='_blank' className="animate__animated animate__fadeIn" style={{ animationDelay: '0.1s' }}>
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com/" target='_blank' className="animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}>
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target='_blank' className="animate__animated animate__fadeIn" style={{ animationDelay: '0.3s' }}>
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.instagram.com/" target='_blank' className="animate__animated animate__fadeIn" style={{ animationDelay: '0.4s' }}>
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                </div>

                {/* Columna 2: Servicios */}
                <div className="footer-widget-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <div className="footer-widget-title">
                    <h4 className="animate__animated animate__fadeIn">Services</h4>
                  </div>
                  <div className="footer-link">
                    <ul>
                      <li><a href="home-startup.html" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>Log In</a></li>
                      <li><a href="about.html" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.3s' }}>Wishlist</a></li>
                      <li><a href="services.html" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>Return Policy</a></li>
                      <li><a href="portfolio-2.html" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.5s' }}>Testimonial</a></li>
                      <li><a href="blog-grid.html" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.6s' }}>Shopping FAQs</a></li>
                      <li><a href="blog-grid.html" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.7s' }}>Privacy policy</a></li>
                    </ul>
                  </div>
                </div>

                {/* Columna 3: Compañía */}
                <div className="footer-widget-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <div className="footer-widget-title">
                    <h4 className="animate__animated animate__fadeIn">Company</h4>
                  </div>
                  <div className="footer-link">
                    <ul>
                      <li><a href="#" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.3s' }}>Home</a></li>
                      <li><a href="#" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>About us</a></li>
                      <li><a href="#" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.5s' }}>How its work</a></li>
                      <li><a href="#" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.6s' }}>Pages</a></li>
                      <li><a href="#" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.7s' }}>Blog</a></li>
                      <li><a href="#" className="animate__animated animate__fadeInLeft" style={{ animationDelay: '0.8s' }}>Contact us</a></li>
                    </ul>
                  </div>
                </div>

                {/* Columna 4: Métodos de pago */}
                <div className="footer-widget-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <div className="footer-widget-title">
                    <h4 className="animate__animated animate__fadeIn">We Accept</h4>
                  </div>
                  <div className="footer-payment">
                    <div className="footer-payment-item animate__animated animate__fadeIn" style={{ animationDelay: '0.4s' }}>
                      <div className="footer-payment-thumb">
                        <img src="/imgs/icons/payoneer.png" alt="Payoneer" />
                      </div>
                    </div>
                    <div className="footer-payment-item animate__animated animate__fadeIn" style={{ animationDelay: '0.5s' }}>
                      <div className="footer-payment-thumb">
                        <img src="/imgs/icons/maser.png" alt="Mastercard" />
                      </div>
                    </div>
                    <div className="footer-payment-item animate__animated animate__fadeIn" style={{ animationDelay: '0.6s' }}>
                      <div className="footer-payment-thumb">
                        <img src="/imgs/icons/paypal.png" alt="PayPal" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Esta es la sección separada que debe aparecer abajo */}
        <div className="container">
          <div className="footer-copyright-area b-t">
            <div className="footer-copyright-wrapper animate__animated animate__fadeInUp">
              <div className="footer-copyright-text">
                <p className="mb-0 animate__animated animate__fadeInLeft">
                  © All Copyright 2024 by{" "}
                  <a 
                    target="_blank" 
                    href="#" 
                    rel="noopener noreferrer"
                    className="animate__animated animate__pulse animate__infinite animate__slower"
                  >
                    Addina
                  </a>
                </p>
              </div>
              <div className="footer-conditions">
                <ul>
                  <li><a href="#" className="animate__animated animate__fadeIn" style={{ animationDelay: '0.1s' }}>Terms & Condition</a></li>
                  <li><a href="#" className="animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}>Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
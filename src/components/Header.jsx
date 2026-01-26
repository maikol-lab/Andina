import React, { useState, useEffect, useRef } from 'react'
import { useCarrito } from '../context/CarritoContext';
import { Link, useNavigate } from 'react-router-dom'
import FiltroCategorias from './FiltroCategorias'
import { formatCurrency } from '../pages/util/funciones';

const Header = () => {
    const { carrito } = useCarrito();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Calcular total y cantidad cada vez que cambia el carrito
    useEffect(() => {
        const suma = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        setTotal(suma);
        setCantidadTotal(cantidad);
    }, [carrito]);

    // Estados para los menús desplegables superiores
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    // Refs para detectar clics fuera
    const languageRef = useRef(null);
    const currencyRef = useRef(null);
    const settingsRef = useRef(null);

    // Datos para los menús
    const languages = ['English', 'Español', 'Russian', 'Portuguese'];
    const currencies = ['USD', 'EUR', 'CHF', 'GBP', 'KWD'];

    // Función para manejar la búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Navegar a la página de búsquedas con el término de búsqueda
            navigate('/busquedas', { 
                state: { 
                    txtBuscar: searchTerm.trim() 
                } 
            });
            setSearchTerm(''); // Limpiar el campo de búsqueda
        }
    };

    // Función para manejar búsqueda desde el offcanvas
    const handleOffcanvasSearch = (e) => {
        e.preventDefault();
        const offcanvasSearchInput = document.querySelector('.offcanvas__search input');
        const searchValue = offcanvasSearchInput ? offcanvasSearchInput.value : '';
        
        if (searchValue.trim()) {
            navigate('/busquedas', { 
                state: { 
                    txtBuscar: searchValue.trim() 
                } 
            });
            setShowOffcanvas(false); // Cerrar el offcanvas
            if (offcanvasSearchInput) {
                offcanvasSearchInput.value = ''; // Limpiar el input
            }
        }
    };

    // Cerrar todos los menús
    const closeAllMenus = () => {
        setShowLanguageMenu(false);
        setShowCurrencyMenu(false);
        setShowSettingsMenu(false);
    };

    // Alternar menú de idioma
    const toggleLanguageMenu = () => {
        setShowLanguageMenu(!showLanguageMenu);
        setShowCurrencyMenu(false);
        setShowSettingsMenu(false);
    };

    // Alternar menú de moneda
    const toggleCurrencyMenu = () => {
        setShowCurrencyMenu(!showCurrencyMenu);
        setShowLanguageMenu(false);
        setShowSettingsMenu(false);
    };

    // Alternar menú de configuración
    const toggleSettingsMenu = () => {
        setShowSettingsMenu(!showSettingsMenu);
        setShowLanguageMenu(false);
        setShowCurrencyMenu(false);
    };

    // Abrir offcanvas
    const openOffcanvas = () => {
        setShowOffcanvas(true);
        // Agregar overlay
        const overlay = document.querySelector('.offcanvas__overlay');
        if (overlay) {
            overlay.classList.add('overlay-open');
        }
        document.body.style.overflow = 'hidden';
    };

    // Cerrar offcanvas
    const closeOffcanvas = () => {
        setShowOffcanvas(false);
        // Remover overlay
        const overlay = document.querySelector('.offcanvas__overlay');
        if (overlay) {
            overlay.classList.remove('overlay-open');
        }
        document.body.style.overflow = 'auto';
    };

    // Seleccionar idioma
    const selectLanguage = (lang) => {
        setSelectedLanguage(lang);
        closeAllMenus();
    };

    // Seleccionar moneda
    const selectCurrency = (curr) => {
        setSelectedCurrency(curr);
        closeAllMenus();
    };

    // Detectar clics fuera para cerrar menús
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (languageRef.current && !languageRef.current.contains(event.target)) {
                setShowLanguageMenu(false);
            }
            if (currencyRef.current && !currencyRef.current.contains(event.target)) {
                setShowCurrencyMenu(false);
            }
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSettingsMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Cerrar offcanvas con Escape key
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && showOffcanvas) {
                closeOffcanvas();
            }
        };

        if (showOffcanvas) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [showOffcanvas]);

    // Estilos inline que sobreescriben el CSS
    const dropdownStyle = {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'white',
        minWidth: '120px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '4px',
        padding: '10px 15px',
        zIndex: 1111,
        visibility: 'visible',
        opacity: 1,
        display: 'block'
    };

    const dropdownItemStyle = {
        display: 'block',
        padding: '8px 0',
        color: '#333',
        textDecoration: 'none',
        fontSize: '14px',
        transition: 'background-color 0.2s'
    };

    return (
        <>
            {/* Agregar CSS de Animate.css - Esto no afecta la funcionalidad */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

            <header>
                <div className="header">
                    <div className="header-top-area">
                        <div className="header-layout-4">
                            <div className="header-to-main d-none d-sm-flex">
                                <div className="link-text">
                                    <span><img src="/imgs/icons/call.png" alt="icon" /></span>
                                    <a href="tel:+380961381876">+380 961 381 876</a>
                                </div>
                                <div className="header-top-notice d-none d-lg-block">
                                    {/* Animación en el banner - solo visual */}
                                    <p className="mb-0 animate__animated animate__pulse animate__infinite animate__slower">
                                        CUIDA TU SALUD 25% DE DESCUENTO <span className="text-color-2"></span> USA EL CÓDIGO "SALUD25"
                                    </p>
                                </div>
                                <div className="tp-header-top-menu d-flex align-items-center justify-content-end">

                                    {/* Menú de Idioma */}
                                    <div className="header-lang-item header-lang" ref={languageRef} style={{ position: 'relative' }}>
                                        <span
                                            className="header-lang-toggle"
                                            id="header-lang-toggle"
                                            onClick={toggleLanguageMenu}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {selectedLanguage}
                                        </span>

                                        {showLanguageMenu && (
                                            <ul style={dropdownStyle}>
                                                {languages.map((lang) => (
                                                    <li key={lang} style={{ listStyle: 'none' }}>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                selectLanguage(lang);
                                                            }}
                                                            style={dropdownItemStyle}
                                                            onMouseEnter={(e) => e.currentTarget.style.color = '#B18B5E'}
                                                            onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                                                        >
                                                            {lang}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Menú de Moneda */}
                                    <div className="header-lang-item tp-header-currency" ref={currencyRef} style={{ position: 'relative', marginLeft: '15px' }}>
                                        <span
                                            className="header-currency-toggle"
                                            id="header-currency-toggle"
                                            onClick={toggleCurrencyMenu}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {selectedCurrency}
                                        </span>

                                        {showCurrencyMenu && (
                                            <ul style={{ ...dropdownStyle, minWidth: '100px' }}>
                                                {currencies.map((curr) => (
                                                    <li key={curr} style={{ listStyle: 'none' }}>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                selectCurrency(curr);
                                                            }}
                                                            style={dropdownItemStyle}
                                                            onMouseEnter={(e) => e.currentTarget.style.color = '#B18B5E'}
                                                            onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                                                        >
                                                            {curr}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Menú de Configuración */}
                                    <div className="header-lang-item tp-header-setting" ref={settingsRef} style={{ position: 'relative', marginLeft: '15px' }}>
                                        <span
                                            className="header-setting-toggle"
                                            id="header-setting-toggle"
                                            onClick={toggleSettingsMenu}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Configuración
                                        </span>

                                        {showSettingsMenu && (
                                            <ul style={{ ...dropdownStyle, minWidth: '150px' }}>
                                                <li style={{ listStyle: 'none' }}>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            closeAllMenus();
                                                        }}
                                                        style={dropdownItemStyle}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#B18B5E'}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                                                    >
                                                        Mi Perfil
                                                    </a>
                                                </li>
                                                <li style={{ listStyle: 'none' }}>
                                                    <Link
                                                        to="/wishlist"
                                                        onClick={closeAllMenus}
                                                        style={dropdownItemStyle}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#B18B5E'}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                                                    >
                                                        Lista de Deseos
                                                    </Link>
                                                </li>
                                                <li style={{ listStyle: 'none' }}>
                                                    <Link
                                                        to="/cartpage"
                                                        onClick={closeAllMenus}
                                                        style={dropdownItemStyle}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#B18B5E'}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                                                    >
                                                        Carrito
                                                    </Link>
                                                </li>
                                                <li style={{ listStyle: 'none' }}>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            closeAllMenus();
                                                            console.log('Cerrar sesión');
                                                        }}
                                                        style={dropdownItemStyle}
                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#B18B5E'}
                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                                                    >
                                                        Cerrar Sesión
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-layout-4 header-bottom">
                        <div id="header-sticky" className="header-4">
                            <div className="mega-menu-wrapper">
                                <div className="header-main-4">
                                    <div className="header-left">
                                        {/* Animación en el logo - solo visual */}
                                        <div className="header-logo animate__animated animate__fadeInLeft">
                                            <Link to="/">
                                                <img src="/imgs/logo/logo.svg" alt="logo" />
                                            </Link>
                                        </div>
                                        <div className="mean__menu-wrapper d-none d-lg-block">
                                            <div className="main-menu">
                                                <nav id="mobile-menu">
                                                    <ul>
                                                        <li>
                                                            <Link to={'/home'} className="animate__animated animate__fadeIn">Inicio</Link>
                                                        </li>
                                                        <li className="has-dropdown">
                                                            <a className="animate__animated animate__fadeIn">Ropa</a>
                                                            <ul className="submenu">
                                                                <li>
                                                                    <Link to={'/ropadehombre'}>Ropa de Hombre</Link>
                                                                </li>
                                                                <li>
                                                                    <hr className="my-2" />
                                                                </li>
                                                                <li>
                                                                    <Link to={'/ropademujer'}>Ropa de Mujer</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="has-dropdown">
                                                            <a className="animate__animated animate__fadeIn">Electrónicos</a>
                                                            <ul className="submenu">
                                                                <li>
                                                                    <Link to={'/electronicos'}>Todos los Electrónicos</Link>
                                                                </li>
                                                                <li>
                                                                    <hr className="my-2" />
                                                                </li>
                                                                <li>
                                                                    <Link to={'/joyas'}>Joyas</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="has-dropdown">
                                                            <a className="animate__animated animate__fadeIn">Categorías</a>
                                                            <ul className="submenu">
                                                                <FiltroCategorias />
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <Link to={'/contacto'} className="animate__animated animate__fadeIn">Contacto</Link>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-right d-inline-flex align-items-center justify-content-end">
                                        {/* Búsqueda principal - Actualizada */}
                                        <div className="header-search d-none d-xxl-block mx-3 animate__animated animate__fadeInRight">
                                            <form onSubmit={handleSearch}>
                                                <input 
                                                    type="text" 
                                                    placeholder="Buscar productos..." 
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSearch(e);
                                                        }
                                                    }}
                                                />
                                                <button type="submit">
                                                    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.4443 13.4445L16.9999 17" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M15.2222 8.11111C15.2222 12.0385 12.0385 15.2222 8.11111 15.2222C4.18375 15.2222 1 12.0385 1 8.11111C1 4.18375 4.18375 1 8.11111 1C12.0385 1 15.2222 4.18375 15.2222 8.11111Z" stroke="white" strokeWidth={2} />
                                                    </svg>
                                                </button>
                                            </form>
                                        </div>

                                        <div className="header-action d-flex align-items-center ml-30">
                                            <div className="header-action-item me-3 animate__animated animate__fadeIn">
                                                <Link to="/wishlist" className="header-action-btn">
                                                    <svg width={23} height={21} viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21.2743 2.33413C20.6448 1.60193 19.8543 1.01306 18.9596 0.609951C18.0649 0.206838 17.0883 -0.0004864 16.1002 0.00291444C14.4096 -0.0462975 12.7637 0.529279 11.5011 1.61122C10.2385 0.529279 8.59252 -0.0462975 6.90191 0.00291444C5.91383 -0.0004864 4.93727 0.206838 4.04257 0.609951C3.14788 1.01306 2.35732 1.60193 1.72785 2.33413C0.632101 3.61193 -0.514239 5.92547 0.245772 9.69587C1.4588 15.7168 10.5548 20.6578 10.9388 20.8601C11.11 20.9518 11.3028 21 11.4988 21C11.6948 21 11.8875 20.9518 12.0587 20.8601C12.445 20.6534 21.541 15.7124 22.7518 9.69587C23.5164 5.92547 22.37 3.61193 21.2743 2.33413ZM20.4993 9.27583C19.6416 13.5326 13.4074 17.492 11.5011 18.6173C8.81516 17.0587 3.28927 13.1457 2.50856 9.27583C1.91872 6.35103 2.72587 4.65208 3.50773 3.74126C3.9212 3.26166 4.43995 2.87596 5.02678 2.61185C5.6136 2.34774 6.25396 2.21175 6.90191 2.21365C7.59396 2.16375 8.28765 2.2871 8.91534 2.57168C9.54304 2.85626 10.0833 3.29235 10.4835 3.83743C10.5822 4.012 10.7278 4.15794 10.9051 4.26003C11.0824 4.36212 11.2849 4.41662 11.4916 4.41787C11.6983 4.41911 11.9015 4.36704 12.0801 4.26709C12.2587 4.16714 12.4062 4.02296 12.5071 3.84959C12.9065 3.30026 13.448 2.86048 14.0781 2.57361C14.7081 2.28674 15.4051 2.16267 16.1002 2.21365C16.7495 2.21061 17.3915 2.34604 17.9798 2.6102C18.5681 2.87435 19.0881 3.26065 19.5025 3.74126C20.282 4.65208 21.0892 6.35103 20.4993 9.27583Z" fill="currentColor" />
                                                    </svg>
                                                    <span className="header-action-badge animate__animated animate__bounce animate__infinite animate__slower">3</span>
                                                </Link>
                                            </div>

                                            {/* Carrito Mejorado */}
                                            <div className="header-action-item position-relative animate__animated animate__fadeIn">
                                                <Link
                                                    to="/cartpage"
                                                    className="header-action-btn cartmini-open-btn d-flex align-items-center position-relative"
                                                    style={{
                                                        padding: '8px 12px',
                                                        borderRadius: '8px',
                                                        transition: 'background-color 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    <div className="position-relative">
                                                        <svg
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 21 23"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.0625 10.6C14.0625 12.5883 12.4676 14.2 10.5 14.2C8.53243 14.2 6.9375 12.5883 6.9375 10.6M1 5.8H20M1 5.8V13C1 20.6402 2.33946 22 10.5 22C18.6605 22 20 20.6402 20 13V5.8M1 5.8L2.71856 2.32668C3.12087 1.5136 3.94324 1 4.84283 1H16.1571C17.0568 1 17.8791 1.5136 18.2814 2.32668L20 5.8"
                                                                stroke="currentColor"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>

                                                        {/* Badge de cantidad - Animación solo cuando hay items */}
                                                        {cantidadTotal > 0 && (
                                                            <span
                                                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate__animated animate__heartBeat animate__infinite animate__slower"
                                                                style={{
                                                                    fontSize: '0.65rem',
                                                                    padding: '3px 6px',
                                                                    minWidth: '20px',
                                                                    border: '2px solid white',
                                                                    transform: 'translate(-50%, -20%)'
                                                                }}
                                                            >
                                                                {cantidadTotal > 99 ? '99+' : cantidadTotal}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Total del carrito - Solo en pantallas grandes */}
                                                    <div className="d-none d-lg-flex flex-column ms-2">
                                                        <span
                                                            className="fw-bold"
                                                            style={{
                                                                fontSize: '14px',
                                                                lineHeight: '1.2'
                                                            }}
                                                        >
                                                            ${formatCurrency(total)}
                                                        </span>
                                                        <span
                                                            className="text-muted"
                                                            style={{
                                                                fontSize: '11px',
                                                                lineHeight: '1.2'
                                                            }}
                                                        >
                                                            {cantidadTotal} {cantidadTotal === 1 ? 'artículo' : 'artículos'}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="header-humbager ml-30 animate__animated animate__fadeIn">
                                            <a
                                                className="sidebar__toggle"
                                                href="javascript:void(0)"
                                                onClick={openOffcanvas}
                                                style={{ padding: '10px' }}
                                            >
                                                <div className="bar-icon-2">
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Offcanvas Component */}
            <div className="offcanvas-area">
                <div className={`offcanvas__info ${showOffcanvas ? 'info-open animate__animated animate__slideInRight' : ''}`}>
                    <div className="offcanvas__wrapper">
                        <div className="offcanvas__content">
                            <div className="offcanvas__top mb-40 d-flex justify-content-between align-items-center">
                                <div className="offcanvas__logo animate__animated animate__fadeInLeft">
                                    <Link to="/" onClick={closeOffcanvas}>
                                        <img src="/imgs/furniture/logo/logo-light.svg" alt="logo not found" />
                                    </Link>
                                </div>
                                <div className="offcanvas__close">
                                    <button onClick={closeOffcanvas} className="animate__animated animate__rotateIn">
                                        <i className="fal fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="offcanvas__search mb-25 animate__animated animate__fadeInUp">
                                <form onSubmit={handleOffcanvasSearch}>
                                    <input 
                                        type="text" 
                                        placeholder="¿Qué estás buscando?" 
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleOffcanvasSearch(e);
                                            }
                                        }}
                                    />
                                    <button type="submit"><i className="far fa-search"></i></button>
                                </form>
                            </div>

                            <div className="offcanvas__contact mt-30 mb-20">
                                <h4 className="animate__animated animate__fadeIn">Información de Contacto</h4>
                                <ul>
                                    <li className="d-flex align-items-center animate__animated animate__fadeInLeft">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="fal fa-map-marker-alt"></i>
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps">
                                                123 Calle Principal, Ciudad
                                            </a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center animate__animated animate__fadeInLeft">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="far fa-phone"></i>
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <a href="tel:+1234567890">+1 234 567 890</a>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center animate__animated animate__fadeInLeft">
                                        <div className="offcanvas__contact-icon mr-15">
                                            <i className="fal fa-envelope"></i>
                                        </div>
                                        <div className="offcanvas__contact-text">
                                            <a href="mailto:info@tienda.com">info@tienda.com</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="offcanvas__social">
                                <ul>
                                    <li><a href="https://www.facebook.com/" target='_blank' className="animate__animated animate__fadeIn"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="https://twitter.com/" target='_blank' className="animate__animated animate__fadeIn"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="https://www.instagram.com/" target='_blank' className="animate__animated animate__fadeIn"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="https://www.linkedin.com/" target='_blank' className="animate__animated animate__fadeIn"><i className="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Overlay - Siempre presente pero oculto */}
                <div
                    className={`offcanvas__overlay ${showOffcanvas ? 'overlay-open' : ''}`}
                    onClick={closeOffcanvas}
                ></div>
            </div>
        </>
    )
}

export default Header;
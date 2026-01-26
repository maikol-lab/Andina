
const Breadcrumbareastart = () => {
    const breadcrumbStyle = {
        backgroundImage: "url('/imgs/bg/breadcrumb-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden'
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay oscuro para mejor legibilidad
        zIndex: 1
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 2
    };

    return (
        <div className="breadcrumb__area theme-bg-1 p-relative z-index-11 pt-95 pb-95" style={breadcrumbStyle}>
            {/* Overlay para mejor contraste */}
            <div style={overlayStyle}></div>
            
            <div className="container" style={contentStyle}>
                <div className="row justify-content-center">
                    <div className="col-xxl-12">
                        <div className="breadcrumb__wrapper text-center">
                            <h2 className="breadcrumb__title text-white">Contact</h2>
                            <div className="breadcrumb__menu">
                                <nav>
                                    <ul className="list-unstyled d-flex justify-content-center">
                                        <li className="me-3">
                                            <span>
                                                <a href="/" className="text-white text-decoration-none">
                                                    Home
                                                </a>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-white">Contact</span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumbareastart;
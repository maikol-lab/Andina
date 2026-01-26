import { useLocation, Link } from 'react-router-dom';

const Error405 = () => {
    const location = useLocation();
    const errorData = location.state || {
        message: 'Página no encontrada',
        tipo: 'pagina_no_encontrada',
        sugerencia: 'La página que buscas no existe o ha sido movida'
    };

    return (
        <div className="container text-center py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-1 text-danger">404</h1>
                    <h2 className="mb-4">¡Ups! Algo salió mal</h2>
                    
                    <div className="alert alert-warning mb-4">
                        <h4>{errorData.message}</h4>
                        {errorData.busqueda && (
                            <p className="mb-0">
                                <strong>Búsqueda:</strong> "{errorData.busqueda}"
                            </p>
                        )}
                        {errorData.categoria && (
                            <p className="mb-0">
                                <strong>Categoría:</strong> {errorData.categoria}
                            </p>
                        )}
                    </div>
                    
                    <p className="lead mb-4">{errorData.sugerencia}</p>
                    
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Link to="/inicio" className="btn btn-primary">
                            <i className="fas fa-home me-2"></i>
                            Ir al inicio
                        </Link>
                        
                        <Link to="/productos" className="btn btn-success">
                            <i className="fas fa-shopping-bag me-2"></i>
                            Ver todos los productos
                        </Link>
                        
                        <button 
                            onClick={() => window.history.back()} 
                            className="btn btn-outline-secondary"
                        >
                            <i className="fas fa-arrow-left me-2"></i>
                            Volver atrás
                        </button>
                    </div>
                    
                    <div className="mt-5">
                        <p className="text-muted">
                            Si el problema persiste, por favor contacta con nuestro soporte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error405;
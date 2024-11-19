const Footer = () => {
    return (
    <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Contacto</h5>
              <p>Email: hola@ventagamer.com</p>
              <p>Tel: +5411687777</p>
            </div>
            
            <div className="col-md-4">
              <h5>Redes Sociales</h5>
              <div>
                <a href="https://facebook.com/venta.gamer" target="_blank" rel="noopener noreferrer" className="text-white me-2">Facebook</a>
                <a href="https://twitter.com/venta.gamer" target="_blank" rel="noopener noreferrer" className="text-white me-2">Twitter</a>
                <a href="https://instagram.com/venta.gamer" target="_blank" rel="noopener noreferrer" className="text-white">Instagram</a>
              </div>
            </div>
            
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <p>&copy; {new Date().getFullYear()} Venta Gamer. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
    </footer>
    );
};

export default Footer;
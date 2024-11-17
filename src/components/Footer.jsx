const Footer = () => {
    return (
    <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <p>Email: info@example.com</p>
              <p>Phone: +123 456 7890</p>
            </div>
            
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <div>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-2">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-2">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">Instagram</a>
              </div>
            </div>
            
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </div>
    </footer>
    );
};

export default Footer;
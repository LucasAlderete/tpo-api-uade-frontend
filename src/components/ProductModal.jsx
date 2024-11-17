const ProductModal = ({ product, show, onClose }) => {
    if (!show) return null;
  
    return (
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{product.name}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <img src={product.url_image} alt={product.name} className="img-fluid mb-3" />
              <p><strong>Descripción:</strong> {product.description}</p>
              <p><strong>Precio:</strong> ${product.price}</p>
              <p><strong>Categoría:</strong> {product.category_name}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Información Adicional:</strong> {product.additional_information}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductModal;
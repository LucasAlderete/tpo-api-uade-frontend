import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import PropTypes from 'prop-types';

const StockInput = ({ stockItems, handleStockChange }) => {
    const addStockField = () => {
      handleStockChange([...stockItems, { size: '', stock: '' }]);
    };
  
    const removeStockField = (index) => {
      const updatedStockItems = stockItems.filter((_, i) => i !== index);
      handleStockChange(updatedStockItems);
    };
  
    const handleStockFieldChange = (e, index, field) => {
      const value = e.target.value;
    
      const updatedStockItems = [...stockItems];
      
      updatedStockItems[index] = {
        ...updatedStockItems[index],
        [field]: value
      };
    
      handleStockChange(updatedStockItems);
    };
  
    return (
      <div>
        {stockItems.map((item, index) => (
          <div className="row mb-2 g-2" key={index}>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                value={item.size}
                onChange={(e) => handleStockFieldChange(e, index, 'size')}
                placeholder="Ingresa un talle"
              />
            </div>
            <div className="col-md-5">
              <input
                type="number"
                className="form-control"
                value={item.stock}
                onChange={(e) => handleStockFieldChange(e, index, 'stock')}
                placeholder="Ingresa una cantidad"
              />
            </div>
            <div className="col-md-1 d-flex justify-content-end">
              <Button variant="outline-danger" onClick={() => removeStockField(index)}>
              </Button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-outline-primary" onClick={addStockField}>
          + Agregar talle
        </button>
      </div>
    );
  };

StockInput.propTypes = {
  stockItems: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Talla puede ser string o number
      stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // Cantidad de stock puede ser string o number
    })
  ).isRequired,
  handleStockChange: PropTypes.func.isRequired // Función para manejar cambios en los items de stock
};

export default StockInput;
import PropTypes from 'prop-types';

const StockInput = ({ stockTotal, handleStockChange }) => {


    const handleInputChange = (e) => {
      const value = e.target.value;
      handleStockChange(parseInt(value, 10) || 0); 
    };
  
    return (
      <div>
        <div className="col-md-5">
          <label htmlFor="stockTotal" className="form-label">Cantidad total en stock</label>
          <input
            type="number"
            id="stockTotal"
            className="form-control"
            value={stockTotal}
            onChange={handleInputChange}
            placeholder="Ingresa la cantidad total"
          />
        </div>
      </div>
    );
  };

StockInput.propTypes = {
  stockTotal: PropTypes.number.isRequired,
  handleStockChange: PropTypes.func.isRequired,
};

export default StockInput;
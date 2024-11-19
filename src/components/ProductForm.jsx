import { Form, Row, Col, Button } from 'react-bootstrap';
import FormField from './FormField';
import TextAreaField from './TextAreaField';
import StockInput from './StockInput';
import PropTypes from 'prop-types';

const ProductForm = ({ formValues, isEditing, handleInputChange, handleImageChange, handleStockChange, handleRemoveImage, images }) => {

 return (
   <Form className="product-form">
     <h4>Detalle de producto</h4>

     <Form.Group className="mb-3 text-start">
      <Form.Label>Imágenes del modelo</Form.Label>
      <div className="image-upload">
        {/* Mostrar las imágenes existentes */}
        {images.length > 0 && !isEditing && (
          <div className="existing-images">
            {images.map((image, index) => (
              <div key={image.id} className="image-preview-container">
                <img
                  src={image.path}
                  alt={`Preview ${index + 1}`}
                  className="image-preview mb-3"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveImage(index)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Campo para ingresar URLs de imágenes si es un nuevo producto */}
        {!isEditing && (
          <div className="url-upload">
            <input
              type="text"
              placeholder="Ingresa una o más URLs, separadas por coma"
              onChange={handleImageChange} // Esta función debe manejar el cambio de URLs
            />
            <Button onClick={handleImageChange}>Agregar imágenes</Button>
          </div>
        )}
      </div>
    </Form.Group>

     
     <Row>
       <Col md={6}>
         <FormField
           label="Modelo"
           type="text"
           name="model"
           value={formValues.model}
           onChange={handleInputChange}
           placeholder="Ingresa el nombre del modelo"
         />
       </Col>
       <Col md={6}>
         <FormField
           label="Categoría"
           type="text"
           name="category"
           value={formValues.category}
           onChange={handleInputChange}
           placeholder="Ingresa una categoría"
         />
       </Col>
     </Row>


     <TextAreaField
       label="Descripción"
       name="description"
       value={formValues.description}
       onChange={handleInputChange}
       placeholder="Ingresa una descripción"
     />
    
     <Row className="mt-3 mb-4">
       <Col md={6}>
         <FormField
           label="Precio"
           type="number"
           name="price"
           value={formValues.price}
           onChange={handleInputChange}
           placeholder="Ingresa el precio"
         />
       </Col>
     </Row>


     <h4>Stock de producto</h4>
     <StockInput
       stockItems={formValues.stockTotal}
       handleStockChange={handleStockChange} 
     />
   </Form>
 );
};

ProductForm.propTypes = {
  formValues: PropTypes.shape({
    model: PropTypes.string.isRequired, 
    category: PropTypes.string.isRequired, 
    description: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired, 
    stockTotal: PropTypes.number.isRequired, 
  }).isRequired,
  isEditing: PropTypes.bool,
  handleInputChange: PropTypes.func.isRequired, 
  handleImageChange: PropTypes.func.isRequired, 
  handleStockChange: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired, 
  images: PropTypes.arrayOf( 
    PropTypes.shape({
      id: PropTypes.number.isRequired, 
      path: PropTypes.string.isRequired, 
    })
  ),
};


export default ProductForm;

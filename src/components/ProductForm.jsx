import { Form, Row, Col, Button } from 'react-bootstrap';
import FormField from './FormField';
import TextAreaField from './TextAreaField';
import StockInput from './StockInput';
import PropTypes from 'prop-types';

const ProductForm = ({ formValues, handleInputChange, handleImageChange, handleStockChange, handleRemoveImage, images }) => {

 return (
   <Form className="product-form">
     <h4>Detalle de producto</h4>

     <Form.Group className="mb-3 text-start">
  <Form.Label>Imágenes del modelo</Form.Label>
  <div className="image-upload">
    {images.map((url, index) => (
      <div key={index} className="image-preview-container">
        <img src={url} alt={`Preview ${index + 1}`} className="image-preview mb-3" />
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleRemoveImage(index)}
        >
          Eliminar
        </Button>
      </div>
    ))}
    <Form.Control
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="shadow-sm"
    />
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

ProductForm.defaultProps = {
  images: [], 
};

ProductForm.propTypes = {
  formValues: PropTypes.shape({
    model: PropTypes.string.isRequired, // Nombre del modelo del producto
    category: PropTypes.string.isRequired, // Categoría del producto
    description: PropTypes.string.isRequired, // Descripción del producto
    price: PropTypes.number.isRequired, // Precio del producto
    stockTotal: PropTypes.number.isRequired, // Total del stock disponible
    urlImageList: PropTypes.arrayOf(PropTypes.number).isRequired, // Lista de IDs de imágenes asociadas
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired, // Función para manejar cambios en los campos del formulario
  handleImageChange: PropTypes.func.isRequired, // Función para manejar el cambio de imágenes
  handleStockChange: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired, // Función para manejar los cambios en el stock
  images: PropTypes.arrayOf( // Lista de imágenes disponibles (opcional, para obtener paths)
    PropTypes.shape({
      id: PropTypes.number.isRequired, // ID de la imagen
      path: PropTypes.string.isRequired, // Ruta de la imagen en el servidor
    })
  ),
};


export default ProductForm;

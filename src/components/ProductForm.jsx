import { Form, Row, Col, Button } from 'react-bootstrap';
import FormField from './FormField';
import TextAreaField from './TextAreaField';
import PropTypes from 'prop-types';

const ProductForm = ({ formValues, isEditing, handleInputChange, handleImageChange, handleRemoveImage, images }) => {

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

        {!isEditing && (
          <div className="url-upload">
            <input
              type="text"
              placeholder="Ingresa una o más URLs, separadas por coma"
              onChange={handleImageChange} 
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
           name="name"
           value={formValues.name}
           onChange={handleInputChange}
           placeholder="Ingresa el nombre del modelo"
         />
       </Col>
       <Col md={6}>
         <FormField
           label="Categoría"
           type="text"
           name="category_name"
           value={formValues.category_name}
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
      <Row className="mt-3 mb-4">
        <Col md={6}>
          <FormField
            label="Stock"
            type="number"
            name="stock"
            value={formValues.stock}
            onChange={handleInputChange}
            placeholder="Ingresa la cantidad en stock"
          />
        </Col>
        </Row>
   </Form>
 );
};

ProductForm.propTypes = {
  formValues: PropTypes.shape({
    name: PropTypes.string, 
    category_name: PropTypes.string, 
    description: PropTypes.string, 
    price: PropTypes.number, 
    stock: PropTypes.number, 
  }).isRequired,
  isEditing: PropTypes.bool,
  handleInputChange: PropTypes.func.isRequired, 
  handleImageChange: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired, 
  images: PropTypes.arrayOf( 
    PropTypes.shape({
      id: PropTypes.number, 
      path: PropTypes.string, 
    })
  ),
};


export default ProductForm;

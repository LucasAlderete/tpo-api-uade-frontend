import { Form, Row, Col, Button } from 'react-bootstrap';
import FormField from './FormField';
import TextAreaField from './TextAreaField';
import { useState } from 'react';

const ProductForm = ({ formValues, isEditing, handleInputChange, handleImageChange, handleRemoveImage, images }) => {

  const [imageInput, setImageInput] = useState('');

  const handleInputLocalChange = (e) => {
    setImageInput(e.target.value);
  };

  const handleButtonClick = () => {
    handleImageChange(imageInput);
    setImageInput('');
  };

 return (
   <Form className="product-form">
     <h4>Detalle de producto</h4>

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

    <Form.Group className="mb-3 text-start">
      <Form.Label>Imágenes del modelo</Form.Label>
      <div className="image-upload">
        {/* Mostrar las imágenes existentes */}
        {images.length > 0 && !isEditing && (
          <div className="existing-images">
            {images.map((image, index) => (
              <div key={`${image.path}${index}`} className="image-preview-container">
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
              value={imageInput}
              onChange={handleInputLocalChange}
            />
            <Button onClick={handleButtonClick}>Agregar imágenes</Button>
          </div>
        )}
      </div>
    </Form.Group>

    
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

export default ProductForm;

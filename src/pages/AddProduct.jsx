import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import ProductForm from '../components/ProductForm';
import BackButton from '../components/BackButton';
import { Button } from 'react-bootstrap';
import { getProductById, addProductToDb, uploadImage, updateProductInDb } from '../services/serviceProducts'; 
import '../styles/ProductManagementPage.css';
import AuthContext from '../context/AuthContext';

const AddProduct = () => {
  const { error } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    model: '',
    category: '',
    description: '',
    price: 0,
    stockTotal: 0,
  });

  const [images, setImages] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); 

  const location = useLocation();
  const navigate = useNavigate();
  
  const productId = new URLSearchParams(location.search).get('productId'); 

  useEffect(() => {
    if (productId) {
      setIsEditMode(true);
      getProductById(productId)
        .then((product) => {
          setFormValues({
            model: product.model,
            category: product.category,
            description: product.description,
            price: product.price,
            stockTotal: product.stock,
          });
          setImages(product.urlImageList || []);
        })
        .catch((error) => console.error("Error al obtener el producto:", error));
    }
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setFormValues({
        ...formValues,
        [name]: checked ? [...formValues[name], value] : formValues[name].filter(item => item !== value),
      });
    } else if (type === 'number') {
      setFormValues({
        ...formValues,
        [name]: parseFloat(value),
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
  
    try {
      const imageIds = await Promise.all(
        files.map((file) => uploadImage(file, formValues.secureId))
      );
  
      // Actualizar el estado con los nuevos IDs de imágenes
      setFormValues((prev) => ({
        ...prev,
        urlImageList: [...prev.urlImageList, ...imageIds],
      }));
    } catch (error) {
      console.error("Error al manejar las imágenes:", error);
    }
  };

  const handleStockChange = (value) => {
    setFormValues({
      ...formValues,
      stockTotal: value,  
    });
  };

  const isFormValid = () => {
    return (
      formValues.model.trim() !== '' && 
      formValues.category.trim() !== '' &&
      formValues.description.trim() !== '' &&
      formValues.price > 0 && 
      formValues.stockTotal > 0 && 
      images 
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formValues,
      urlImageList: images, // Asegúrate de que sea un array
    };
  
    try {
      if (isEditMode) {
        await updateProductInDb(productId, productData);
        console.log("Producto actualizado con éxito.");
      } else {
        await addProductToDb(productData);
        console.log("Producto agregado con éxito.");
      }
      navigate("/products"); // Redirige a la lista de productos
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // Eliminar la imagen seleccionada
  };


  return (
    <div className="container mt-5">
      <BackButton text="Volver al inicio" />
      <h2>{isEditMode ? 'Editar producto' : 'Agregar producto'}</h2>
      <p>{isEditMode ? 'Modifica los detalles del producto.' : 'Completa la siguiente información para agregar un producto a tu tienda.'}</p>
      <ProductForm
        formValues={formValues}
        images={images}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleStockChange={handleStockChange}
        handleRemoveImage={handleRemoveImage}
      />

      <div className="d-flex justify-content-end mt-4">
        <Button 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={!isFormValid()}
        >
          {isEditMode ? 'Guardar cambios' : 'Agregar producto'} 
        </Button>
      </div>

      {error && <p className="text-danger mt-3">Hubo un error al agregar o actualizar el producto.</p>}
    </div>
  );
};

export default AddProduct;
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import ProductForm from '../components/ProductForm';
import BackButton from '../components/BackButton';
import { Button } from 'react-bootstrap';
import { getProductById, addProductToDb, updateProductInDb } from '../services/serviceProducts'; 
import '../styles/ProductManagementPage.css';
import {AuthContext} from '../context/AuthContext';


const AddProduct = () => {
  const { error } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    name: '',
    category_name: '',
    description: '',
    price: 0,
    stock: 0,
    images: [],
    id: 0,
    secure_id: ''
  });

  const [imagesList, setImagesList] = useState([]);
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
            name: product.name,
            category_name: product.category_name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            id: product.id,
            secure_id: product.secure_id
          });
          setImagesList(
            product.images?.map((id) => ({
              id, 
            })) || []
          );
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
    } else if (type === 'number' && name === 'price') {
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

  const handleImageChange = async (inputValue) => {
    if (!inputValue) {
      console.error("No se proporcionó un valor para manejar imágenes.");
      return;
    }

    const urls = inputValue.split(',').map((url) => url.trim());
  
    const newImages = urls.map((url) => ({
      path: url,
      product: formValues.id, 
    }));
  
    try {
  
      setImagesList((prev) => [...prev, ...newImages]); 

      imagesList.map((img) => console.log(img));
  
      setFormValues((prev) => ({
        ...prev,
        images: [...prev.images, ...imagesList.map((img) => img.path)], 
      }));
    } catch (error) {
      console.error("Error al agregar las imágenes:", error);
    }
  };

  const isFormValid = () => {
    return (
      formValues.name.trim() !== '' && 
      formValues.category_name.trim() !== '' &&
      formValues.description.trim() !== '' &&
      formValues.price > 0 && 
      formValues.stock > 0 && 
      imagesList 
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productData = {
      ...formValues,
      images: imagesList.map((image) => image.id), 
    };
  
    try {
      if (isEditMode) {
        await updateProductInDb(productData);
        console.log("Producto actualizado con éxito.");
      } else {
        await addProductToDb(productData);
        console.log("Producto agregado con éxito.");
      }
      navigate("/product-management");
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };
  

  const handleRemoveImage = (index) => {
    setImagesList(imagesList.filter((_, i) => i !== index)); 
  };


  return (
    <div className="container mt-5">
      <BackButton text="Volver al inicio" />
      <h2>{isEditMode ? 'Editar producto' : 'Agregar producto'}</h2>
      <p>{isEditMode ? 'Modifica los detalles del producto.' : 'Completa la siguiente información para agregar un producto a tu tienda.'}</p>
      <ProductForm
        formValues={formValues}
        images={imagesList}
        isEditing={isEditMode}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
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
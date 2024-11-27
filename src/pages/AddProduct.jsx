import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import ProductForm from '../components/ProductForm';
import BackButton from '../components/BackButton';
import { Button } from 'react-bootstrap';
import { getProductById, addProductToDb, updateProductInDb, addImageToDb } from '../services/serviceProducts'; 
import '../styles/ProductManagementPage.css';
import {AuthContext} from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';


const AddProduct = () => {
  const { error } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    name: '',
    category_name: '',
    description: '',
    price: 0,
    stock: 0,
    url_image_list: [],
    new: true
  });

  const [images, setImages] = useState([]);
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
            new: product.new,
          });
          setImages(
            product.url_image_list?.map((id) => ({
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
    const urls = e.target.value.split(',').map((url) => url.trim());
    console.log(urls);
  
    const newImages = urls.map((url) => ({
      id: uuidv4(), 
      path: url,
      product: `${formValues.id} | ${formValues.name}`, 
    }));
  
    try {
      
      const savedImages = await Promise.all(newImages.map((image) => addImageToDb(image)));
  
      setImages((prev) => [...prev, ...savedImages]); 
  
      setFormValues((prev) => ({
        ...prev,
        url_image_list: [...prev.url_image_list, ...savedImages.map((img) => img.id)], 
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
      images 
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productData = {
      ...formValues,
      url_image_list: images.map((image) => image.id), 
    };
  
    try {
      if (isEditMode) {
        await updateProductInDb(productId, productData);
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
    setImages(images.filter((_, i) => i !== index)); 
  };


  return (
    <div className="container mt-5">
      <BackButton text="Volver al inicio" />
      <h2>{isEditMode ? 'Editar producto' : 'Agregar producto'}</h2>
      <p>{isEditMode ? 'Modifica los detalles del producto.' : 'Completa la siguiente información para agregar un producto a tu tienda.'}</p>
      <ProductForm
        formValues={formValues}
        images={images}
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
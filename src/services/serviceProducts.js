import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3000/products';

const axiosWithInterceptor = axios.create();

axiosWithInterceptor.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



export const addProductToDb = async ({productData, productId}) => {
  try {
    console.log(productId)
    if (!productId) {
      const productWithId = { ...productData, id: uuidv4() };
      const response = await axios.post(API_URL, productWithId);
      return response.data;
    } else {
      const response = await axios.patch(`${API_URL}/${productId}`, productData);
      return response.data;
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw new Error('Error al agregar o modificar producto');
  }
};

export const getDestacados = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos/destacados`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos destacados', error);
  }
};

export const getCategorias = async () => {
  let categorias = [];
    try {
        const response = await fetchProductsFromDb();
        response.forEach(product => {
            if (!categorias.includes(product.category)) {
                categorias.push(product.category);
            }
        });
        return categorias;
    } catch (error) {
        throw new Error('Error al obtener las categorias', error);
    }
};


export const getCategoria = async (categoria) => {
  try {
    const response = await axios.get(`${API_URL}/productos/categoria/${categoria}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los productos por categoria', error);
  }
};

export const getTodosProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener todos los productos', error);
  }
};

export const getDetalleProductos = async (productoId) => {
  try {
    const response = await axiosWithInterceptor.get(`${API_URL}/productos/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el detalle del producto', error);
  }
};

export const getVisitados = async (user) => {
  let productosVisitados= [];
  try {
    for (const productoId of user.visitados) {
      const producto = await getProductById(productoId);
        productosVisitados.push(producto);
    }
    return productosVisitados;
    } catch (error) {
        throw new Error('Error al obtener los productos visitados', error);
  }
}

export const addProductToDB = async (productData) => {
  try {
    const response = await axiosWithInterceptor.put(API_URL, productData);
    return response.data; 
  } catch (error) {
    console.error('Error al agregar el producto a la tienda', error);
    throw error;
  }
};

export const fetchProductsFromDb = async () => {
  try {
    const response = await axiosWithInterceptor.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    throw new Error('Error al obtener la lista de productos');
  }
};

export const deleteProductById = async (id) => {
  try {
    const response = await axiosWithInterceptor.delete(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw new Error('Error al eliminar el producto');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosWithInterceptor.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw new Error('Error al obtener el producto');
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(API_URL, { params: { featured: true } });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos destacados:', error);
    throw new Error('Error al obtener los productos destacados');
  }
};

export const getViewProduct_2 = async () => {
  const response = await fetch("http://localhost:3100/view-product-2");
  return response.json();
};

import { v4 as uuidv4 } from 'uuid';
import useApiClient from '../hooks/useApiClient';

const { apiClient } = useApiClient();

const PRODUCTS_ENDPOINT = '/products';

export const addProductToDb = async (productData) => {
  try {

    console.log(productData);
    const productWithId = { ...productData, secure_id: uuidv4() };
    const response = await apiClient.post( `${PRODUCTS_ENDPOINT}/create`, productWithId);
    return response.data;

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw new Error('Error al agregar o modificar producto');
  }
};

export const getTodosProductos = async () => {
  try {
    const response = await apiClient.get(`${PRODUCTS_ENDPOINT}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener todos los productos', error);
  }
};

export const fetchProductsFromDb = async () => {
  try {
    const response = await apiClient.get(`${PRODUCTS_ENDPOINT}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    throw new Error('Error al obtener la lista de productos');
  }
};

export const deleteProductById = async (id) => {
  try {
    const response = await apiClient.delete(`${PRODUCTS_ENDPOINT}/delete/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw new Error('Error al eliminar el producto');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`${PRODUCTS_ENDPOINT}/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw new Error('Error al obtener el producto');
  }
};

export const updateProductInDb = async (productId, productData) => {
  try {
    const response = await apiClient.put(`${PRODUCTS_ENDPOINT}/${productId}`, productData);
    return response.data; 
  } catch (error) {
    console.error("Error en updateProductInDb:", error);
    throw error; 
  }
};


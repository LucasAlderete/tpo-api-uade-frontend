import axios from "axios";

const API_BASE_URL = '/cart';

const getCart = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}?userId=${userId}`);
  return response.data; 
};

const addProduct = async (userId, productId) => {
  await axios.post(`${API_BASE_URL}/add`, null, {
    params: { userId, productId }
  });
};

const decreaseProductQuantity = async (userId, productId) => {
  await axios.delete(`${API_BASE_URL}/decrease-quantity`, {
    params: { userId, productId }
  });
};

const removeProduct = async (userId, productId) => {
  await axios.delete(`${API_BASE_URL}/remove`, {
    params: { userId, productId }
  });
};

const emptyCart = async (userId) => {
  await axios.delete(`${API_BASE_URL}/empty`, {
    params: { userId }
  });
};

const checkout = async (userId) => {
  const response = await axios.post(`${API_BASE_URL}/checkout`, null, {
    params: { userId }
  });
  return response.data;
};


export default cartService;
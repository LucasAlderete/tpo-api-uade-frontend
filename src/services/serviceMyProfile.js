import axios from "axios";
import useApiClient from '../hooks/useApiClient';

const { apiClient } = useApiClient();
const ENDPOINT = '/my-profile';

export const getUserWithOrders = async() => {
  try{
    const response = await apiClient.get(`${ENDPOINT}`)
  return response.data;
  } catch (e) {
    console.error("Error al obtener productos con ordenes", e)
  }
};
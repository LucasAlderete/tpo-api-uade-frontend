import useApiClient from '../hooks/useApiClient';

const { apiClient } = useApiClient();

export const getProductDetail = async (id) => {
  try {
    const response = await apiClient.get(`/product/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product detail:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error fetching product detail");
  }
};

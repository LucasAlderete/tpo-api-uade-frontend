import useApiClient from '../hooks/useApiClient';

const { apiClient } = useApiClient();

export const add = async (product_id) => {
  try {
    const response = await apiClient.post(`/favorite/${product_id}`, {
      product_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error adding to favorites");
  }
};

export const remove = async (product_id) => {
  try {
    await apiClient.delete(`/favorite/${product_id}`);
    return { success: true };
  } catch (error) {
    console.error("Error removing from favorites:", error.response?.data || error.message);
    return { success: false, error: "No se pudo eliminar de favoritos." };
  }
};

export const getFavs = async () => {
  try {
    const response = await apiClient.get(`/favorite`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching favorites:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error fetching favorites");
  }
};

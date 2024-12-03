import useApiClient from '../hooks/useApiClient';

const { apiClient } = useApiClient();

export const post = async (product_id) => {
  try {
    const response = await apiClient.post(`/navigation`, { product_id });
    return response.data;
  } catch (error) {
    console.error("Error in postNavigation:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error posting navigation");
  }
};

export const get = async () => {
  try {
    const response = await apiClient.get(`/navigation`);
    return response.data;
  } catch (error) {
    console.error("Error in getNavigation:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error fetching navigation");
  }
};

import useApiClient from '../hooks/useApiClient';

const { apiClient } = useApiClient();

export const getHome = async () => {
  try {
    const response = await apiClient.get(`/home`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

import apiClient from "./apiClient";

export const getPokemonsAxios = async () => {
  const response = await apiClient.get("/api/v2/pokemon");
  return response.data.results;
};

export const getPokemonsByIdAxios = async (id) => {
  const response = await apiClient.get(`/api/v2/pokemon/${id}`);
  return response.data;
};

export const getPokemonTypeById = async (id) => {
  const response = await apiClient.get(`/api/v2/type/${id}`);
  return response.data;
};

import axios from "axios";

const useApiClient = () => {

  const apiClient = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp >= Date.now() / 1000;
    } catch {
      return false;
    }
  };

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      // if (token && isTokenValid(token)) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        return Promise.reject(new Error("Invalid or expired token, redirecting to login."));
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return {apiClient};
}

export default useApiClient;
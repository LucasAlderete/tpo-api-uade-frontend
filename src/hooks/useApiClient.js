import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const useApiClient = () => {

  const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log(`decoded: ${decoded}`)
      console.log(`decoded.exp: ${decoded.exp}`)
      return (decoded.exp * 1000) >= Date.now();
    } catch (e) {
      console.log(`exception: ${e}`)
      return false;
    }
  };

  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      console.log(`token de request: ${token}`)
      if (token && isTokenValid(token)) {
        console.log("token valido")
        config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
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
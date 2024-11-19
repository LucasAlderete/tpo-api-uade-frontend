import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react";

const useApiClient = () => {
  
  const apiClient = axios.create( {
    baseURL: "http://localhost:3000/",
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  apiClient.interceptors.request.use(
    (config) => {
      const { logout } = useContext(AuthContext);
      const token = localStorage.getItem("token");
      if (token) {
        if (jwtDecode(token).exp < Date.now() / 1000) {
          logout();
          useNavigate("/login");
          return Promise.reject(new Error("Token expired, redirecting to login."));
        }
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        logout();
        useNavigate("/login");
        return Promise.reject(new Error("No token found, redirecting to login."));
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    }
  );
  
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { logout } = useContext(AuthContext)
      if (error.response.status === 403 || error.response.status === 401) {
        logout();
        useNavigate("/login");
      }
      return Promise.reject(error);
    }
  )

  return apiClient;
}

export default useApiClient;
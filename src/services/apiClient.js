import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../context/AuthContext"

const apiClient = axios.create( {
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json"
  }
});


apiClient.interceptors.request.use(
  (config) => {
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
    if (error.response.status === 403 || error.response.status === 401) {
      logout();
      useNavigate("/login");
    }
    return Promise.reject(error);
  }
)

export default apiClient;
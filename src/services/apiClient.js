import axios from "axios";
import { useNavigate } from "react-router-dom";

//AUTH CLIENT
const authClient = axios.create( {
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json"
  }
});

authClient.interceptors.response.use(
  (response) => { navigate("/home") },
  (error) => { return Promise.reject(error) }
);

const apiClient = axios.create( {
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json"
  }
});

//API CLIENT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) {
        useNavigate("/login");
        return Promise.reject(new Error("Token expired, redirecting to login."));
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
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
    if (error.response.status === 403) {
      navigate("/login");
    }
    return Promise.reject(error);
  }
)

export {authClient, apiClient};
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerService, authenticateService, serviceError } from "../services/serviceAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("user");
    try {
      return JSON.parse(savedToken) ?? null;
    } catch (e) {
      return null;
    }
  });

  const register = async (username, email, password, birthday, name, surname) => {
    const responseData = await registerService(username, email, password, birthday, name, surname);
    if (!serviceError) {
      succesToken(responseData);
    } else {
      alert("hubo un error al registrarlo")
    }
  }

  const login = async (username, password) => {
    if (isAuthenticated) {
      navigate("/home");
    }
    const responseData = await authenticateService(email, password);
    if (!serviceError) {
      succesToken(responseData);
    } else {
      alert("credenciales incorrectas");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!token;
  }

  const succesToken = (responseData) => {
    setToken(responseData);
    localStorage.setItem("token", JSON.stringify(responseData));
    navigate("/home");
  }

  return (
    <AuthContext.Provider value={{ register, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
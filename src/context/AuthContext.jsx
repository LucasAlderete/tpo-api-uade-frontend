import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useServiceAuth from "../hooks/useServiceAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const { registerService, authenticateService } = useServiceAuth();

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    try {
      return JSON.parse(savedToken) ?? null;
    } catch (e) {
      return null;
    }
  });

  const register = async (username, email, password, birthday, name, surname) => {
    try {
      const responseData = await registerService(username, email, password, birthday, name, surname);
      saveUserData(responseData);
      succesToken(responseData);
    } catch (error) {
      alert("usuario o mail ya en uso, pruebe nuevamente");
    }
  }

  const login = async (email, password) => {
    if (isAuthenticated()) {
      navigate("/");
    }
    try {
      const responseData = await authenticateService(email, password);
      saveUserData(responseData);
      succesToken(responseData);
    } catch (error) {
      console.log(error);
      alert("credenciales incorrectas");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData")
    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!token;
  }

  const succesToken = (responseData) => {
    setToken(responseData);
    localStorage.setItem("token", JSON.stringify(responseData));
    navigate("/");
  }

  const saveUserData = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    const event = new CustomEvent("userDataChanged", { detail: userData });
    window.dispatchEvent(event);
  }

  return (
    <AuthContext.Provider value={{ register, login, logout, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
}
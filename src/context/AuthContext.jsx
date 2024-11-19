import { createContext, useState } from "react";
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

  const register = async (username, email, password, birthday, name, surname, role) => {
    try {
      const responseData = await registerService(username, email, password, birthday, name, surname, role);
      saveUserData(responseData);
      successfulAuth(responseData);
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
      successfulAuth(responseData);
    } catch (error) {
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

  const isAdmin = () => {
    try {
      const userData = localStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      return (parsedData.role == "ADMIN")
    } catch (error) {
      return false;
    }
  }

  const successfulAuth = (responseData) => {
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
    <AuthContext.Provider value={{ register, login, logout, isAuthenticated, isAdmin, token }}>
      {children}
    </AuthContext.Provider>
  );
}
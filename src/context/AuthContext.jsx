import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/serviceAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("user");
    return JSON.parse(savedToken) ?? null;
  });

  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const responseData = await authenticate(username, password);
      setToken(responseData);
      localStorage.setItem("token", JSON.stringify(responseData));
      navigate("/home");
    } catch (error) {
      alert("credenciales incorrectas")
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
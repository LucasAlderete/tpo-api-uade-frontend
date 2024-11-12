import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/serviceAuth";
import PropTypes from 'prop-types';

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
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/home");
    } catch{
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

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export default AuthContext;
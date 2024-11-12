import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { authenticate } from "../services/serviceLogin";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return JSON.parse(savedUser) ?? null;
  });
  const [error, setError] = useState(null);
  const login = async (username, password) => {
    try {
      const response = await authenticate(username, password);

      setUser(response);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(response));
      redirect("/home");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    redirect("/login");
  };

  useEffect(() => {
    setError(null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node 
};

export default AuthContext;

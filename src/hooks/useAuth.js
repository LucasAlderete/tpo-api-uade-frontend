import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { redirect } from "react-router-dom";

const useAuth = () => {
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  

  const authenticate = async (usuarioOEmail, contrasenia) => {
    setError(null); 

    try {
      const user = await loginUser(usuarioOEmail, contrasenia);
      if (user) {
        login(user);
        if (user.role === 'admin') {
          redirect('/product-management');
        } else {
          redirect('/');
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { authenticate, error };
};

export default useAuth;

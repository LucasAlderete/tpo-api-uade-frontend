import axios from "axios";

const API_URL = 'http://localhost:3000/users';

export const authenticate = async (usuarioOEmail, contrasenia) => {
  const params = {
    [usuarioOEmail.includes('@') ? 'email' : 'username']: usuarioOEmail,
    password: contrasenia,
  };

  try {
    const response = await axios.get(API_URL, { params });
    const user = response.data;

    return user;

  } catch{
    throw new Error('Error al iniciar sesión');
  }

};

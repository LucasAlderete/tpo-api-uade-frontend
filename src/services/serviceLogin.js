import axios from "axios";

export const authenticate = async (email, password) => {
  const response = await axios.post(
    "http://localhost:8080/api/v1/auth/authenticate",
    {
      email,
      password,
    }
  );
  return response.data;
};

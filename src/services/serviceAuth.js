import { authClient } from "./apiClient"

const authenticate = async (email, password) => {
  const response = await authClient.post(
    "/authenticate", {email, password}
  );
  return response.data;
};

const register = async (username, email, password, birthday, name, surname) => {
  const response = await authClient.post(
    "/register", {username, email, password, birthday, name, surname}
  );
  return response.data;
};

export {authenticate, register};
import { useState } from "react";
import { authClient } from "./apiClient"

const [serviceError, setServiceError] = useState(null)

const registerService = async (username, email, password, birthday, name, surname) => {
  setServiceError(null)
  try {
    const response = await authClient.post(
      "/register", {username, email, password, birthday, name, surname}
    );
    return response.data;
  } catch (serviceError) {
    setServiceError(serviceError);
  }
};

const authenticateService = async (email, password) => {
  setServiceError(null)
  try {
    const response = await authClient.post(
      "/authenticate", {email, password}
    );
    return response.data;
  } catch (serviceError) {
    setServiceError(serviceError);
  }
};

export {registerService, authenticateService, serviceError};
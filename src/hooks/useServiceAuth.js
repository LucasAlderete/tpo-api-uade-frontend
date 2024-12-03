import authClient from "../services/authClient"

const useServiceAuth = () => {

  const registerService = async (username, email, password, birthday, name, surname, role) => {
    const response = await authClient.post(
      "/auth/register", {username, email, password, birthday, name, surname, role}
    );
    if (response.status != 200) {
      throw new Error();
    }
    return response.data;
  };
  

  const authenticateService = async (username, password) => {
    const response = await authClient.post(
      "/authenticate", {username, password}
    );
    if (response.status != 200) {
      throw new Error();
    }
    return response.data;
  };

  return { registerService, authenticateService }
}

export default useServiceAuth;
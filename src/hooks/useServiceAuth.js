import authClient from "../services/authClient"

const useServiceAuth = () => {

  /* FOR BACKEND INTEGRATION
  */
  const registerService = async (username, email, password, birthday, name, surname, role) => {
    const response = await authClient.post(
      "/auth/register", {username, email, password, birthday, name, surname, role}
    );
    return response.data;
    //AGREGAR UN THROW SI NO ES EXITOSO
  };

  /*
  const registerService = async (username, email, password, birthday, name, surname, role) => {
    const response = await authClient.post(
      "/users", {username, email, password, birthday, name, surname, role}
    );
    return response.data;
  };*/
  
  /* FOR BACKEND INTEGRATION
  */
  const authenticateService = async (email, password) => {
    //setServiceError(false)
    const response = await authClient.post(
      "/auth/authenticate", {email, password}
    );
    return response.data;
    //AGREGAR UN THROW SI NO ES EXITOSO
  };
  /*
  const authenticateService = async (email, password) => {
     const response = await authClient.get(
      "/users", {email, password}
    );
    const user = response.data.filter(user => user.email === email && user.password === password)
    if (user.length === 0) {
      throw new Error();
    }
    return user[0];
  };
*/
  return { registerService, authenticateService }
}

export  default useServiceAuth;
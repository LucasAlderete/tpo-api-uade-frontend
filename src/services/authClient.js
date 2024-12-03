import axios from "axios";

const authClient = axios.create( {
    baseURL: "http://localhost:8080/api",
    headers: {"Content-Type": "application/json"}
});

authClient.interceptors.response.use(
    (response) => response,
    (error) => { return Promise.reject(error) }
);

export default authClient;
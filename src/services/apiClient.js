import axios from "axios";

const apiClient = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = ""
        config.headers.Authorization = "Bearer token";
        return config;
    }
);

export default apiClient;
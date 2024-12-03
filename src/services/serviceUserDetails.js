import useApiClient from "../hooks/useApiClient"
import { AuthContext } from "../context/AuthContext";

export const getUserDetails = async () => {
    const { apiClient } = useApiClient();
    const { token } = useContext(AuthContext);
    const userData = await apiClient.get(
        "/user/", {token}
    );
}
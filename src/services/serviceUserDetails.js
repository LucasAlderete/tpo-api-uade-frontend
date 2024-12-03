import useApiClient from "../hooks/useApiClient"

export const getUserDetails = async () => {
    const { apiClient } = useApiClient();
    const userData = await apiClient.get(
        "/user"
    );
    console.log(userData.data);
    return userData.data;
}
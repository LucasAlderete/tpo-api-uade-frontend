import axios from "axios";
//import { apiClient } from "./apiClient";

const API_BASE_URL = 'http://localhost:3001/my-profile';


const myProfileService = {
    async getMyProfile() {
      const response = await axios.get(`${API_BASE_URL}`);
      console.log(response.data[0]);
      return response.data[0]; // seleccionamos el primer elemento
    }
  };

//const myProfileService = {
//  async getMyProfileById() {
//    const response = await apiClient.get(`/my-profile?userId=1`);
//    return response.data[0]; // seleccionamos el primer elemento
//  }
//};

export default myProfileService;

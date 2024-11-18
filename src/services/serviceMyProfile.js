import axios from "axios";
//import { apiClient } from "./apiClient";

const myProfileService = {
    async getMyProfile() {
      const response = await axios.get('http://localhost:3000/myProfile');
      //console.log(response.data);
      return response.data;
    }
  };

//const myProfileService = {
//  async getMyProfileById() {
//    const response = await apiClient.get(`/my-profile?userId=1`);
//    return response.data[0]; // seleccionamos el primer elemento
//  }
//};

export default myProfileService;

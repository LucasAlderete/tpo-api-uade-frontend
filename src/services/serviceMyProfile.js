import axios from "axios";
//import { apiClient } from "./apiClient";

const myProfileService = {
    async getMyProfile() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.get(`http://localhost:3000/orders?user_id=${userData.userId}`);
      //console.log(response.data)
      response.data.map(order => {
        order.order_items.map(item=> {
          
          const detailsResponse = async (id) => await(await fetch(`http://localhost:3000/products/${id}`)).json();
          console.log(detailsResponse)
          return detailsResponse(item.product_id).name;
        })
      });
      console.log(response.data);
      console.log(userData);
      return response.data;
    }
  };

export default myProfileService;

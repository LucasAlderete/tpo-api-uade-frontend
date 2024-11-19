import axios from "axios";

const myProfileService = {

    async ordersById() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const orders = await axios.get(`http://localhost:3000/orders?user_id=${userData.id}`);
      console.log("Usuario:", userData);
      console.log("Lista ordenes de usuario:", orders.data);
      return orders.data;
    },

    async productNameById() {
      this.ordersById().map(order => {
        order.order_items.map(item=> {
          const productDetails = async () => {
            return await axios.get(`http://localhost:3000/products/${item.product_id}`);
          }
          console.log("nombre del producto:", productDetails().data);
        })
      });
    }

  };

export default myProfileService;

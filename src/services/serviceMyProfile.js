import axios from "axios";

const serviceMyProfile = {

    async ordersById() {

      const userData = JSON.parse(localStorage.getItem('userData'));
      const orders = await axios.get(`http://localhost:3000/orders?user_id=${userData.id}`);
      //console.log("Usuario:", userData);
      //console.log("Lista ordenes de usuario:", orders.data);
      return orders.data;
    },
    
    async productNameById(id) {
      const product_id = await axios.get(`http://localhost:3000/products/${id}`)
      return product_id.data.name;
    },

    async ProductIdList() {
      let lista = [];
      const orderList = await this.ordersById();
      orderList.map(order => {
        order.order_items.map(item=> {
          lista.push(item.product_id)
        })
      });
      return lista;
    }

  };

export default serviceMyProfile;

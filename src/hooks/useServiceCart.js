import useApiClient from "./useApiClient";


let products = [];

const useServiceCart = () => {
  const getCart = async () => {
    const {apiClient} = useApiClient();
    try {
      getProducts();

      const response = await apiClient.get(`/cart`);

      const cartData = response.data;
  

      return {id:cartData.id, items: cartData.items, total: cartData.total, success: true};
    } catch (error) {
      return {success: false};
    }
  };


  const addProduct = async (productName) => {
    const {apiClient} = useApiClient();
    try {
      const product = products.find(product => product.name === productName);
      
      await apiClient.post(`/cart/add?productId=${product.id}`);
      
      return {success: true};
    } catch (error) {
      console.log(error); 
      return {success: false};
    }
  };

  const decreaseProductQuantity = async (productName) => {
    const {apiClient} = useApiClient();

    try {
      const product = products.find(product => product.name === productName);


      const response = await apiClient.delete(`/cart/decrease_quantity?productId=${product.id}` );
  
      return {success: true};
    } catch (error) {
      return {success: false};
    }
  }

  const emptyCart = async () => {
    const {apiClient} = useApiClient();
    try {
      await apiClient.delete(`/cart/empty`);
      
      return {success: true};
    } catch (error) {
      return {success: false};
    }
  }

  const removeProduct = async (productName) => {
    const {apiClient} = useApiClient();
    try {
      const product = products.find(product => product.name === productName);

      await apiClient.delete(`/cart/remove?productId=${product.id}`);
      
      return {success: true};
    } catch (error) {
      console.log(error)
      return {success: false};
    }
  }

  const checkout = async () => {
    const {apiClient} = useApiClient();
    try {
      const response = await apiClient.post(`/cart/checkout`);

      if (response.data.success == true) {
        return {
          success: true,
          products: [],
          status: 200
        }
      } 

      return {
        success: false,
        products: response.data.products,
        status: 200
      }

    } catch (error) {
      return {success: false, status: 'error'};
    }
  }

  const getProducts = async () => {
    const {apiClient} = useApiClient();
    try {
      const response = await apiClient.get(`/product`);
      products = response.data;
    } catch (error) {
      return {success: false};
    }
  }

  return {getCart, addProduct, decreaseProductQuantity, emptyCart, removeProduct, checkout};
}

export default useServiceCart;


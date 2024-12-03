import useApiClient from "./useApiClient";

const useServiceCart = () => {
  const getCart = async () => {
    const {apiClient} = useApiClient();
    try {
      const response = await apiClient.get(`/cart/`);

      const cartData = response.data[0];



      const productRequests = cartData.items.map((item) =>
        apiClient.get(`/product/${item.product_id}`)
      );
      
      const productResponses = await Promise.all(productRequests);

      return {id:cartData.id, items: productResponses, total: cartData.total, success: true};
    } catch (error) {
      return {success: false};
    }
  };


  const addProduct = async (productId) => {
    const {apiClient} = useApiClient();
    try {
      await apiClient.post(`/cart/add` , {
        params: {
          productId: productId,
        },
      });

      return {success: true};
    } catch (error) {
      return {success: false};
    }
  };

  const decreaseProductQuantity = async (productId) => {
    const {apiClient} = useApiClient();
    try {
      await apiClient.delete(`/cart/decrease_quantity` , {
        params: {
          productId: productId,
        },
      });
  
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

  const removeProduct = async (productId) => {
    const {apiClient} = useApiClient();
    try {
      await apiClient.delete(`/cart/remove` , {
        params: {
          productId: productId,
        },
      });
      
      return {success: true};
    } catch (error) {
      return {success: false};
    }
  }

  const checkout = async () => {
    const {apiClient} = useApiClient();
    try {
      const response = await apiClient.post(`/cart/checkout`);

      if (response.data[0].success == true) {
        return {
          success: true,
          products: [],
          status: 200
        }
      } 

      return {
        success: false,
        products: response.data[0].products,
        status: 200
      }

    } catch (error) {
      return {success: false, status: 'error'};
    }
  }
  return {getCart, addProduct, decreaseProductQuantity, emptyCart, removeProduct, checkout};
}

export default useServiceCart;


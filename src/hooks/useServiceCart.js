import useApiClient from "./useApiClient";

const useServiceCart = () => {
  const getCart = async (userId) => {
    const {apiClient} = useApiClient();
    try {
      const response = await apiClient.get(`/carts/` , {
        params: {
          user_id: userId,
        },
      });

      const cartData = response.data[0];

      if(response.data.length === 0) {
        await apiClient.post(`/carts`, {
          user_id: userId,
          total: 0,
          items: []
        });
      }

      const productRequests = cartData.items.map((item) =>
        apiClient.get(`/products/${item.product_id}`)
      );
      
      const productResponses = await Promise.all(productRequests);

      const enrichedItems = await Promise.all(
        cartData.items.map(async (item, index) => {
          const productData = productResponses[index].data;

          let firstImageUrl = null;
          if (productData.url_image_list && productData.url_image_list.length > 0) {
            const firstImageId = productData.url_image_list[0];
            const imageResponse = await apiClient.get(
              `/images/${firstImageId}`
            );
            firstImageUrl = imageResponse.data.path;
          }

          return {
            ...item,
            name: productData.name,
            image: firstImageUrl, 
          };
        })
      );

      return {id:cartData.id, items: enrichedItems, total: cartData.total, success: true};
    } catch (error) {
      return {success: false};
    }
  };


  const addProduct = async (userId, productId) => {
    const {apiClient} = useApiClient();
    try {
      const cartResponse = await apiClient.get(`/carts/` , {
        params: {
          user_id: userId,
        },
      });
      const cart = cartResponse.data[0];
      const items = cart.items;

      const item = items.find((item) => item.product_id === productId);
      if (item) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        const updatedOrderItems = items.map((item) =>
          item.product_id === productId ? updatedItem : item
        );

        const newTotal = updatedOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        await apiClient.patch(`/carts/${cart.id}/`, {
          items: updatedOrderItems,
          total: newTotal
        });

      } else {
        const productResponse = await apiClient.get(`/products/${productId}`);
        const product = productResponse.data;

        const carts = await apiClient.get(`/carts/`);

        let maxItemId = 0;
        carts.data.forEach(async (cart) => {
          const items = cart.items;
          const item = items.find((item) => {
              if (item.id > maxItemId) {
                maxItemId = item.id
              }
            }
          );
        });

        const newItem = {
          id: maxItemId + 1,
          cart_id: cart.id,
          product_id: productId,
          price: product.price,
          quantity: 1
        };

        const updatedOrderItems = [...items, newItem];
        const newTotal = updatedOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        await apiClient.patch(`/carts/${cart.id}/`, {
          id: cart.id,
          user_id: userId,
          items: updatedOrderItems,
          total: newTotal
        });

      }
      return {success: true};
    } catch (error) {
      return {success: false};
    }
  };

  const decreaseProductQuantity = async (userId, productId) => {
    const {apiClient} = useApiClient();
    try {
      const cartResponse = await apiClient.get(`/carts/` , {
        params: {
          user_id: userId,
        },
      });
      const cart = cartResponse.data[0];
      const items = cart.items;

      const item = items.find((item) => item.product_id === productId);
      if (item) {
        if (item.quantity === 1) {
          await removeProduct(userId, productId);
        } else {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          const updatedOrderItems = items.map((item) =>
            item.product_id === productId ? updatedItem : item
          );

          const newTotal = updatedOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

          await apiClient.patch(`/carts/${cart.id}/`, {
            items: updatedOrderItems,
            total: newTotal
          });
        }
      }
      return {success: true};
    } catch (error) {
      return {success: false};
    }
  }

  const emptyCart = async (userId) => {
    const {apiClient} = useApiClient();
    try {
      const cartResponse = await apiClient.get(`/carts/` , {
        params: {
          user_id: userId,
        },
      });
      const cart = cartResponse.data[0];
      await apiClient.patch(`/carts/${cart.id}/`, {
        items: [],
        total: 0
      });

      return {success: true};
    } catch (error) {
      return {success: false};
    }
  }

  const removeProduct = async (userId, productId) => {
    const {apiClient} = useApiClient();
    try {
      const cartResponse = await apiClient.get(`/carts/` , {
        params: {
          user_id: userId,
        },
      });
      const cart = cartResponse.data[0];
      const items = cart.items;

      const item = items.find((item) => item.product_id === productId);
      if (item) {
        const updatedOrderItems = items.filter((item) => item.product_id !== productId);
        const newTotal = updatedOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        await apiClient.patch(`/carts/${cart.id}/`, {
          items: updatedOrderItems,
          total: newTotal
        });
      }

      return {success: true};
    } catch (error) {
      return {success: false};
    }
  }

  const checkout = async (userId) => {
    const {apiClient} = useApiClient();
    try {
      const cartResponse = await apiClient.get(`/carts/` , {
        params: {
          user_id: userId,
        },
      });
      const cart = cartResponse.data[0];
      const items = cart.items;

      const productRequests = items.map((item) =>
        apiClient.get(`/products/${item.product_id}`)
      );

      const productResponses = await Promise.all(productRequests);

      let outOfStockItems = items.filter(item => item.quantity > productResponses.find(product => product.data.id == item.product_id).data.stock);
      
      outOfStockItems = outOfStockItems.map(item => {
        const product = productResponses.find(product => product.data.id == item.product_id).data;
        return product.name;
      }
      );
    

      if (outOfStockItems.length > 0) {
        return {
          success: false,
          products: outOfStockItems,
          status: 200
        }
      } else {
        const orders = await apiClient.get(`/orders/`);

        let maxOrderItemId = 0;
        orders.data.forEach(async (order) => {
          const orderItems = order.order_items;
          const orderItem = orderItems.find((item) => {
              if (item.id > maxOrderItemId) {
                maxOrderItemId = item.id
              }
            }
          );
        });

        let maxOrderId = 0;
        orders.data.forEach(async (order) => {
          if (order.id > maxOrderId) {
            maxOrderId = order.id
          }
        });

        const newOrderItems = items.map((item, index) => ({
          id: maxOrderItemId + index + 1,
          order_id: maxOrderId + index + 1,
          product_id: item.product_id,
          price: item.price,
          quantity: item.quantity,
        }));

        const newTotal = newOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);


        await apiClient.post(`/orders`, {
          id: maxOrderId + 1,
          user_id: userId,
          date: new Date().toISOString(),
          order_items: newOrderItems,
          total: newTotal,
        });

        for (const item of items) {
          const productResponse = await apiClient.get(`/products/${item.product_id}`);
          const product = productResponse.data;
          product.stock -= item.quantity;
          await apiClient.patch(`/products/${item.product_id}`, product);
        }

        await emptyCart(userId);

        return {
          success: true,
          products: [],
          status: 200
        }
      }
    } catch (error) {
      return {success: false, status: 'error'};
    }
  }
  return {getCart, addProduct, decreaseProductQuantity, emptyCart, removeProduct, checkout};
}

export default useServiceCart;


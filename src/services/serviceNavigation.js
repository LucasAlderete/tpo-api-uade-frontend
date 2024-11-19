import { getProductDetail } from "./serviceProductDetail";

export const postNavigation = async (id, user_id) => {
    try {
        await deleteIfExists(id);

        const response = await fetch("http://localhost:3000/navigation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, user_id}),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error in postNavigation:", error.message);
        throw error;
    }
};

export const getNavigationDecoredByUserid = async (user_id) => {
    try {
        const navigationResponse = await fetch("http://localhost:3000/navigation?user_id=" + user_id);
        if (!navigationResponse.ok) {
            throw new Error(`Error al obtener la navegación: ${navigationResponse.statusText}`);
        }
        const navigationData = await navigationResponse.json();

        const lastFour = navigationData
            .slice(-4) 
            .map(item => item.id);

        const productDetailsPromises = lastFour.map(id =>
                getProductDetail(id)
                .then(product => ({
                    ...product,
                    product_id: product.id,
                }))
        );

        const productDetails = await Promise.all(productDetailsPromises);

        return productDetails;
    } catch (error) {
        console.error("Error en getNavigationDecored:", error.message);
        throw error;
    }
};

const deleteIfExists = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/navigation/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          console.log(`El recurso con id=${id} no existe.`);
          return false;
        }
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      console.log(`Recurso con id=${id} eliminado.`);
      return true;
    } catch (error) {
      console.error("Error al intentar eliminar el recurso:", error);
      throw error;
    }
  };
  

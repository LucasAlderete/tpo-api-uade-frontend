export const addToFavs = async (product_id) => {
  try {
      const response = await fetch(`http://localhost:3100/api/fav`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ product_id })
      });
      
      if (response.ok) {
          return { success: true };
      } else {
          return { success: false, error: 'No se pudo agregar a favoritos.' };
      }
  } catch (error) {
      return { success: false, error: 'Error en la solicitud.' };
  }
};

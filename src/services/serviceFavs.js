export const addToFavs = async (product_id) => {
  try {
      const response = await fetch(`http://localhost:3000/favorites-add`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
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

export const removeFromFavs = async (product_id) => {
  try {
    const response = await fetch(`http://localhost:3000/favorites-remove`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        return { success: true };
    } else {
        return { success: false, error: 'No se pudo elimiunar de favoritos.' };
    }
} catch (error) {
    return { success: false, error: 'Error en la solicitud.' };
}
};

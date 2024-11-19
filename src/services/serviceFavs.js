import { v4 as uuidv4 } from 'uuid';

export const add = async (product_id, user_id) => {
    try {
        let id = uuidv4();
        const response = await fetch("http://localhost:3000/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, product_id, user_id }),
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

export const remove = async (product_id, user_id) => {
    try {
        const fav = await this.get(product_id, user_id);

        const response = await fetch(`http://localhost:3000/favorites/${fav.id}`, {
            method: 'DELETE',
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

export const get = async (id, user_id) => {
    try {
      const response = await fetch(`http://localhost:3000/favorites?product_id=${id}&user_id=${user_id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching fav:", error);
      throw error;
    }
  };

export const getAllByUser = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3000/favorites?user_id=${user_id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching fav:", error);
      throw error;
    }
};
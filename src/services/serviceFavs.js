import { v4 as uuidv4 } from 'uuid';

export const add = async (product_id, user_id) => {
    if (await exists(product_id, user_id)) {
        return;
    }
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
};

export const remove = async (product_id, user_id) => {
    const fav = await get(product_id, user_id);
    if (fav) {
        const response = await fetch(`http://localhost:3000/favorites/${fav[0].id}`, {
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
    }
};

export const get = async (id, user_id) => {
    try {
      const response = await fetch(`http://localhost:3000/favorites?product_id=${id}&user_id=${user_id}`);
      const j = await response.json();
      console.log("GET FAVO", j);
      return j;
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

export const exists = async (product_id, user_id) => {
    let result = await get(product_id, user_id);
    return result && result.length > 0;
};
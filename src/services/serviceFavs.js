export const add = async (product_id) => {
    const response = await fetch(`http://localhost:3000/favorite/${product_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({product_id,}),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const remove = async (product_id) => {
    const response = await fetch(`http://localhost:3000/favorite/${product_id}`, {
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
};

export const get = async () => {
    try {
      const response = await fetch(`http://localhost:3000/favorite`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching fav:", error);
      throw error;
    }
};


export const post = async (product_id) => {
    try {

        const response = await fetch("http://localhost:3000/api/navigation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id}),
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

export const get = async () => {
    try {
        const navigationResponse = await fetch("http://localhost:3000/api/navigation");
        if (!navigationResponse.ok) {
            throw new Error(`Error al obtener la navegación: ${navigationResponse.statusText}`);
        }
        const navigationData = await navigationResponse.json();
        return navigationData;
    } catch (error) {
        console.error("Error en getNavigationDecored:", error.message);
        throw error;
    }
};


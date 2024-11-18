export const postNavigation = async (id) => {
    try {
        const exists = await existsInNavigation(id);
        if (exists) {
            console.log(`El recurso con id ${id} ya existe en navigation.`);
            return { message: "El recurso ya existe", id };
        }

        const response = await fetch("http://localhost:3000/navigation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, status: "added to navigation history" }),
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

export const getNavigationDecored = async () => {
    try {
        const navigationResponse = await fetch("http://localhost:3000/navigation");
        if (!navigationResponse.ok) {
            throw new Error(`Error al obtener la navegación: ${navigationResponse.statusText}`);
        }
        const navigationData = await navigationResponse.json();

        const lastFour = navigationData
            .slice(-4) 
            .map(item => item.id);

        const productDetailsPromises = lastFour.map(id =>
            fetch(`http://localhost:3000/product-detail/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al obtener el producto ${id}: ${response.statusText}`);
                    }
                    return response.json();
                })
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


const existsInNavigation = async (id) => {
    const response = await fetch(`http://localhost:3000/navigation?id=${id}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.length > 0;
};

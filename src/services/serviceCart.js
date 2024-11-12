export const addToCart = async () => {
    const response = await fetch("http://localhost:3100/api/add-to-cart");
    return response.json();
  };
  
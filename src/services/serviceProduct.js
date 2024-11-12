export const getProduct = async () => {
    const response = await fetch("http://localhost:3100/api/product/2");
    return response.json();
  };
  
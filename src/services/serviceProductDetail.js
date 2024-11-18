export const getProductDetail = async (id) => {
    const response = await fetch("http://localhost:3000/products/" + id);
    return response.json();
  };
  
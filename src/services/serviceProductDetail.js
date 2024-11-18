export const getProductDetail = async (id) => {
    const response = await fetch("http://localhost:3000/product-detail/" + id);
    return response.json();
  };
  
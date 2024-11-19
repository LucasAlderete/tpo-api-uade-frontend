export const getProductDetail = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    const product = await response.json();

    const imagePaths = await Promise.all(
      product.url_image_list.map(async (imageId) => {
        const imageResponse = await fetch(`http://localhost:3000/images/${imageId}`);
        const imageData = await imageResponse.json();
        return imageData.path;
      })
    );

    return {
      ...product,
      images: imagePaths,
    };
  } catch (error) {
    console.error("Error fetching product detail or images:", error);
    throw error;
  }
};

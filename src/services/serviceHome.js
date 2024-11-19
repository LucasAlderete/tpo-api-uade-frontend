export const getHome = async () => {
  try {
    const [homeResponse, imagesResponse] = await Promise.all([
      fetch("http://localhost:3000/home"),
      fetch("http://localhost:3000/images"),
    ]);

    // Parseamos las respuestas como JSON
    const homeData = await homeResponse.json();
    const imagesData = await imagesResponse.json();

    const imageMap = new Map(
      imagesData.map((image) => [
        parseInt(image.product.split(" | ")[0], 10),
        image.path,
      ])
    );

    const mapImages = (products) => {
      return products.map((product) => ({
        ...product,
        url_image: imageMap.get(product.product_id) || product.url_image,
      }));
    };

    // Mapeamos los productos en las diferentes secciones
    const mappedProducts = Object.keys(homeData.products).reduce(
      (acc, category) => ({
        ...acc,
        [category]: mapImages(homeData.products[category]),
      }),
      {}
    );

    const mappedRecentlyViewed = mapImages(homeData.recently_viewed_products);
    const mappedFeatured = mapImages(homeData.featured_products);

    return {
      ...homeData,
      products: mappedProducts,
      recently_viewed_products: mappedRecentlyViewed,
      featured_products: mappedFeatured,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

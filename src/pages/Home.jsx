import { useEffect, useState } from 'react';
import { getHome } from '../services/serviceHome.js';
import ProductCarousel from "../components/ProductCarousel.jsx";
import CategorySection from "../components/CategorySection.jsx";
import { getNavigationDecored } from '../services/serviceNavigation.js';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await getHome();

        const recentlyViewedProducts = await getNavigationDecored();

        setData({
          ...homeData,
          recently_viewed_products: recentlyViewedProducts, 
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container text-center my-5">
      <h1>Bienvenido, Usuario</h1>

      {data.recently_viewed_products && (
        <ProductCarousel title="Productos Vistos Recientemente" products={data.recently_viewed_products}/>
      )}

      {data.featured_products && (
        <ProductCarousel title="Productos Destacados" products={data.featured_products} />
      )}

      {data.products && Object.keys(data.products).map((categoryName, index) => (
        <CategorySection key={index} categoryName={categoryName} products={data.products[categoryName]} />
      ))}
    </div>
  );
};

export default Home;

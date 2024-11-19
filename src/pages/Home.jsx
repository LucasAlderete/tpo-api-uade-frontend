import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getHome } from '../services/serviceHome.js';
import ProductCarousel from "../components/ProductCarousel.jsx";
import CategorySection from "../components/CategorySection.jsx";
import { getNavigationDecoredByUserid } from '../services/serviceNavigation.js';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await getHome();
        let recentlyViewedProducts = null;
        if (isAuthenticated()) {  
          const storedData = localStorage.getItem("userData");
          const user_id = storedData && isAuthenticated() ? JSON.parse(storedData).id : 0;
          recentlyViewedProducts = await getNavigationDecoredByUserid(user_id);
        }

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
      {data.recently_viewed_products && data.recently_viewed_products.length > 0 && (
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

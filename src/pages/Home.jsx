import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getHome } from '../services/serviceHome.js';
import ProductCarousel from "../components/ProductCarousel.jsx";
import CategorySection from "../components/CategorySection.jsx";
import { get } from '../services/serviceNavigation.js';
import { getFavs } from '../services/serviceFavs.js';
import { useNavigate } from "react-router-dom";
import useServiceCart from "../hooks/useServiceCart";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await getHome();
        const favorites = await getFavs();
        const cart = await useServiceCart().getCart();
        let recentlyViewedProducts = null;
        if (isAuthenticated()) {  
          recentlyViewedProducts = await get();
        }

        setData({
          ...homeData,
          recently_viewed_products: recentlyViewedProducts,
          favorites: favorites,
          cart: cart
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        navigate("/login");
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
        <ProductCarousel title="Productos Vistos Recientemente" products={data.recently_viewed_products} favorites={data.favorites} cart={data.cart}/>
      )}
      {data.featured_products && (
        <ProductCarousel title="Productos Destacados" products={data.featured_products} favorites={data.favorites}  cart={data.cart}/>
      )}
      {data.products && Object.keys(data.products).map((categoryName, index) => (
        <CategorySection key={index} categoryName={categoryName} products={data.products[categoryName]} favorites={data.favorites}  cart={data.cart}/>
      ))}
    </div>
  );
};

export default Home;

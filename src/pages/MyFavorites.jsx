import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import CategorySection from "../components/CategorySection.jsx";
import { getFavs } from '../services/serviceFavs.js';

const MyFavorites = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let favorites = null;
        if (isAuthenticated()) {  
          favorites = await getFavs();
        }

        setData({
          favorites: favorites, 
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
      <>
        <div className="container text-center my-5">
            <CategorySection key="0" categoryName="Mis Favoritos" products={data.favorites} favorites={data.favorites} />
        </div>
      </>
    );
  };
  
  export default MyFavorites;
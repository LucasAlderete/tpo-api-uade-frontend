import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import CategorySection from "../components/CategorySection.jsx";
import { getAllDecoratedByUser } from '../services/serviceFavs.js';

const MyFavorites = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let favorites = null;
        if (isAuthenticated()) {  
          const storedData = localStorage.getItem("userData");
          const user_id = storedData && isAuthenticated() ? JSON.parse(storedData).id : 0;
          favorites = await getAllDecoratedByUser(user_id);
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
            <CategorySection key="0" categoryName="Mis Favoritos" products={data.favorites} />
        </div>
      </>
    );
  };
  
  export default MyFavorites;
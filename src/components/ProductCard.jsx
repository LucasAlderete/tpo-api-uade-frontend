import {useContext, useState, useEffect } from 'react';
import { add, remove, getAllByUser } from '../services/serviceFavs.js';
import useServiceCart from "../hooks/useServiceCart";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [user_id, setUserId] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData).id : 0;
  });
  

  const navigate = useNavigate(); 
  
  useEffect(() => {
    if (isAuthenticated()) {
      const storedData = localStorage.getItem("userData");
      const id = storedData ? JSON.parse(storedData).id : 0;
      setUserId(id);
    }
  }, [isAuthenticated]);
  
  useEffect(() => {
    const fetchCart = async () => {
      const favorites = await getAllByUser(user_id);
      console.log("favorites", favorites);
      const cart = await useServiceCart().getCart(user_id);
      const items = cart.items;

      const isFavorite = favorites.some(
        (favorite) => favorite.product_id == product.product_id && favorite.user_id == user_id
      );
      console.log("isFavorite", isFavorite);
      setIsFavorite(isFavorite);

      const item = items.find((item) => item.product_id === product.product_id);
      if (item) {
        setIsCart(true);
      } else {
        setIsCart(false);
      }
    }
    fetchCart();
  }, [product.product_id]);

  const handleViewProduct = () => {
    navigate(`/product/${product.product_id}`);
  };
  
  const handleAddToFavorites = async () => {

    if (isFavorite) {
      const response = await remove(product.product_id, user_id);
      console.log("handleAddToFavorites", response);
      if (response) {
        setIsFavorite(false);
      } else {
        console.error(response.error || "Error al manejar favoritos.");
        return;
      }
    } else {
      
      const response = await add(product.product_id, user_id);
      if (response) {
        setIsFavorite(true);
      } else {
        console.error(response.error || "Error al manejar favoritos.");
        return;
      }
    }
  };

  
  const handleAddToCart = async () => {
    if (isCart) {
      await useServiceCart().removeProduct(user_id, product.product_id);
      setIsCart(false);
    } else {
      const response = await useServiceCart().addProduct(user_id, product.product_id);
      if (response.success) {
        setIsCart(true);
      } else {
        console.error(response.error || "Error al manejar carrito.");
        return;
      }
    }
  };

  return (
    <div
      className="card m-2 p-2 shadow-sm border-0"
      style={{
        width: "20rem",
        borderRadius: "15px",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.05)";
      }}
    >
      <img
        src={product.url_image || "https://via.placeholder.com/150"}
        className="card-img-top"
        alt={product.name}
        style={{
          height: "200px",
          objectFit: "cover",
          borderRadius: "15px 15px 0 0",
        }}
      />
      <div className="card-body text-center">
        <h5 className="card-title fw-bold">{product.name}</h5>
        <p className="card-text text-muted">{product.description}</p>
        <p className="text-success fw-bold">Precio: ${product.price}</p>

        {isAuthenticated() && (<div className="d-flex justify-content-center gap-4 my-3">
          <span
            className="material-icons"
            onClick={handleAddToFavorites}
            style={{
              fontSize: "32px",
              color: isFavorite ? "red" : "gray",
              cursor: "pointer",
              transition: "transform 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isFavorite ? "favorite" : "favorite_border"}
          </span>

          <span
            className="material-icons"
            onClick={handleAddToCart}
            style={{
              fontSize: "32px",
              color: isCart ? "green" : "gray",
              cursor: "pointer",
              transition: "transform 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isCart ? "shopping_cart_checkout" : "shopping_cart"}
          </span>
          </div>)}

        <button
          onClick={handleViewProduct}
          className="btn btn-primary mt-3 rounded-pill"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0px 4px 8px rgba(0, 123, 255, 0.2)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0, 123, 255, 0.4)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 123, 255, 0.2)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Ver Producto
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

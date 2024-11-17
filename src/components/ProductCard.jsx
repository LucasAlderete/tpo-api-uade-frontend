import React, { useState } from 'react';
import { addToFavs, removeFromFavs } from '../services/serviceFavs.js';
import { addToCart } from '../services/serviceCart.js';

const ProductCard = ({ product, onViewProduct }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const handleAddToFavorites = async () => {
    const response = isFavorite ? await removeFromFavs(product.id) : await addToFavs(product.id);
    if (response.success) setIsFavorite(!isFavorite);
    else console.error(response.error || "Error al manejar favoritos.");
  };

  const handleAddToCart = async () => {
    const response = await addToCart(product.id);
    if (response.status) setIsCart(!isCart);
    else console.error(response.error || "Error al manejar carrito.");
  };

  return (
    <div
      className="card m-1 p-2 shadow-sm border-0"
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

        <div className="d-flex justify-content-center gap-4 my-3">
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
        </div>
        <button
          onClick={() => onViewProduct(product)}
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

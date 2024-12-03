
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../services/serviceProductDetail";
import { post } from "../services/serviceNavigation";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductDetail(productId);
      
      if (isAuthenticated()) {
        await post(productId);
      }
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="text-center mt-5">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">Producto no encontrado.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div
            id="productImageCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="d-block w-100 rounded product-image-fixed"
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productImageCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productImageCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="fw-bold">{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <p className="fw-bold">Precio: ${product.price}</p>
          <p>Stock disponible: {product.stock}</p>
          <p><strong>Categoría:</strong> {product.category_name}</p>
          <p><strong>Información adicional:</strong> {product.additional_information}</p>
          {product.highlighted && (
            <p className="text-success fw-bold">¡Producto destacado!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

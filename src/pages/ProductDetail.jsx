import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../services/serviceProductDetail";
import { postNavigation } from "../services/serviceNavigation";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductDetail(productId);
      await postNavigation(productId);
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
          <img
            src={product.url_image || "https://via.placeholder.com/400"}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold">{product.name}</h1>
          <p className="text-muted">{product.description}</p>
          <p className="fw-bold">Precio: ${product.price}</p>
          <p>Stock disponible: {product.stock}</p>
          <p>{product.additional_information}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

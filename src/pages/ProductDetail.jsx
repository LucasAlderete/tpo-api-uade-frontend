import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null); // Estado para guardar el producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const getViewProduct_2 = async (id) => {
    const response = await fetch("http://localhost:3000/view-product-2");
    return response.json();
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getViewProduct_2(productId); // Llamar al servicio con el ID
      setProduct(data);
      setLoading(false); // Terminar la carga
    };

    fetchProduct();
  }, [productId]); // Vuelve a ejecutar si `productId` cambia

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
          {/* Aquí puedes agregar más información y acciones */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

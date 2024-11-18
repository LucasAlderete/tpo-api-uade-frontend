import React, { useEffect, useState } from 'react';
import { getHome } from '../services/serviceHome.js';
import ProductCarousel from "../components/ProductCarousel.jsx";
import CategorySection from "../components/CategorySection.jsx";
import ProductModal from "../components/ProductModal.jsx";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getHome();
        setData(responseData);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewProduct = (product) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container text-center my-5">
      <h1>Bienvenido, Usuario</h1>

      {data.recently_viewed_products && (
        <ProductCarousel title="Productos Vistos Recientemente" products={data.recently_viewed_products} onViewProduct={handleViewProduct} />
      )}

      {data.featured_products && (
        <ProductCarousel title="Productos Destacados" products={data.featured_products} onViewProduct={handleViewProduct} />
      )}

      {data.products && Object.keys(data.products).map((categoryName, index) => (
        <CategorySection key={index} categoryName={categoryName} products={data.products[categoryName]} onViewProduct={handleViewProduct} />
      ))}

      {showModal && modalProduct && (
        <ProductModal product={modalProduct} show={showModal} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;

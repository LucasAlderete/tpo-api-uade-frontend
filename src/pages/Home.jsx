import React, { useEffect, useState } from 'react';
import { getHome } from '../services/serviceHome.js';
import { addToCart } from '../services/serviceCart.js';
import { useAuth } from "../hooks/useAuth";
import { addToFavs, removeFromFavs } from '../services/serviceFavs.js';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onViewProduct }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const handleAddToFavorites = async () => {
    if (isFavorite) {
      const response = await removeFromFavs(product.id);
      if (response.success) setIsFavorite(false);
      else console.error(response.error || "No se pudo agregar a favoritos.");
      return;
    }
    const response = await addToFavs(product.id);
    if (response.success) setIsFavorite(true);
    else console.error(response.error || "No se pudo agregar a favoritos.");
  };

  const handleAddToCart = async () => {
    if (isCart) {
      const response = await addToCart();
      if (response.status) setIsCart(false);
      else console.error(response.error || "No se pudo agregar");
      return;
    }
    const response = await addToCart();
    if (response.status) setIsCart(true);
    else console.error(response.error || "No se pudo agregar a Carrito.");
  };

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={product.url_image || 'https://via.placeholder.com/150'} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p><strong>Precio:</strong> ${product.price}</p>

        <button className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-primary'}`} onClick={handleAddToFavorites}>
          {isFavorite ? '❤️' : 'Agregar a Favoritos'}
        </button>
        <br />
        <button className={`btn ${isCart ? 'btn-warning' : 'btn-outline-primary'}`} onClick={handleAddToCart}>
          {isCart ? 'Sacar de carrito' : 'Agregar a Carrito'}
        </button>
        <br />

        <button onClick={() => onViewProduct(product)} className="btn btn-primary ms-2 mt-2">
          Ver Producto
        </button>
      </div>
    </div>
  );
};

const ProductCarousel = ({ title, products, onViewProduct }) => {
  const productsPerPage = 4;

  return (
    <div className="mb-5">
      <h3>{title}</h3>
      <div id={`${title.replace(/\s+/g, '-')}-carousel`} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => {
            const currentProducts = products.slice(index * productsPerPage, (index + 1) * productsPerPage);
            return (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="d-flex justify-content-start">
                  {currentProducts.map((product, index) => (
                    <div key={index} className="col-3">
                      <ProductCard product={product} onViewProduct={onViewProduct} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target={`#${title.replace(/\s+/g, '-')}-carousel`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={`#${title.replace(/\s+/g, '-')}-carousel`} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
};

const CategorySection = ({ categoryName, products, onViewProduct }) => (
  <div className="mb-4">
    <h3>{categoryName}</h3>
    <div className="row">
      {products.map((product, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-lg-3">
          <ProductCard product={product} onViewProduct={onViewProduct} />
        </div>
      ))}
    </div>
  </div>
);

const ProductModal = ({ product, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img src={product.url_image} alt={product.name} className="img-fluid mb-3" />
            <p><strong>Descripción:</strong> {product.description}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Categoría:</strong> {product.category_name}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Información Adicional:</strong> {product.additional_information}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { user } = useAuth();
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
      <h1>Bienvenido, {user?.name || 'Usuario'}</h1>

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

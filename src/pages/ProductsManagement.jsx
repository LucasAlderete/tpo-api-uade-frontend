import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';
import Search from '../components/Search';
import { Button } from 'react-bootstrap';
import '../styles/ProductManagementPage.css';
import { AuthContext } from '../context/AuthContext';
import { fetchProductsFromDb } from '../services/serviceProducts';

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(AuthContext); 
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchProducts = async () => {
    try {
        if(isAuthenticated() && isAdmin()){
            const productList = await fetchProductsFromDb();
            setProducts(productList);
            setFilteredProducts(productList);
        }
    } catch {
      setError('No podemos cargar tus productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filteredProducts]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleSearchClick = () => {
    const filtered = products.filter((product) =>
      product.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const onProductDeleted = () => {
    fetchProducts();
  }

  return (
    <div className="product-management">
      <h2>Mis productos</h2>
      <p className="description">Aquí podrás agregar, modificar y eliminar los productos de tu tienda.</p>
      <div className="search-container">
        <Search  onSearch={setSearchTerm} onSearchClick={handleSearchClick} />
        <Button onClick={handleAddProduct} variant="primary" className="add-product-button">
          Agregar producto
        </Button>
      </div>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ProductTable products={filteredProducts} onProductDeleted={onProductDeleted} />
      )}
    </div>
  );
};

export default ProductManagementPage;
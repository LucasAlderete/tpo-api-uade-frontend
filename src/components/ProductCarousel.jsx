import ProductCard from "./ProductCard.jsx";

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
        </div>
      </div>
    );
  };

export default ProductCarousel;
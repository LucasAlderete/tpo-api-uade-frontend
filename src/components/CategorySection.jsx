import ProductCard from "./ProductCard.jsx";
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

export default CategorySection;
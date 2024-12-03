import ProductCard from "./ProductCard.jsx";

const capitalizeWords = (text) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

const CategorySection = ({ categoryName, products, onViewProduct, favorites }) => (
  <div className="mb-5">
    <h3
      className="fw-bold text-dark mb-4"
      style={{
        borderBottom: "2px solid #007bff",
        display: "inline-block",
        paddingBottom: "5px",
        fontSize: "1.5rem",
      }}
    >
      {capitalizeWords(categoryName)}
    </h3>
    <div className="row g-3">
      {products.map((product, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-lg-3">
          <ProductCard product={product} onViewProduct={onViewProduct} favorites={favorites} />
        </div>
      ))}
    </div>
  </div>
);

export default CategorySection;

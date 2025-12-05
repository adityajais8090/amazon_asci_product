import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/productList.css";

const ProductList = ({ products, onProductClick }) => {
  if (!products || products.length === 0) {
    return (
      <div className="product-list-empty">
        
        <div className="product-list-empty-text">No products found</div>
        <div className="product-list-empty-subtext">Add products using the ASIN Extractor tab</div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product._id || product.asin || index}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

import React from 'react';
import '../styles/productCard.css';
import { getImageUrl, handleImageError, DEFAULT_PRODUCT_IMAGE } from '../utils/defaultImage';

const ProductCard = ({ product, onClick }) => {
  // Safely parse JSON fields
  const ai_title = product.ai_title 
    ? (typeof product.ai_title === 'string' ? JSON.parse(product.ai_title)?.title : product.ai_title?.title)
    : product.title || product.asin || 'Product Title';
  
  const price = product.price?.current || product.price || 'N/A';
  const rating = product.rating?.stars || product.ratings?.stars || '4.0';
  const ratingCount = product.rating?.ratings_count || product.ratings?.ratings_count || 0;
  const brand = product.brand || 'Unknown Brand';
  
  // Get image - try multiple possible fields with default fallback
  const imageUrl = getImageUrl(
    product.images?.main || product.image || product.images?.[0]
  );

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-card-image-wrapper">
        <img
          src={imageUrl}
          alt={ai_title}
          className="product-card-image"
          onError={(e) => handleImageError(e, DEFAULT_PRODUCT_IMAGE)}
        />
        {rating && (
          <div className="product-card-rating-badge">
             {rating}
          </div>
        )}
      </div>

      <div className="product-card-content">
        <h3 className="product-card-title" title={ai_title}>
          {ai_title}
        </h3>
        
        <p className="product-card-brand">{brand}</p>

        <div className="product-card-footer">
          <span className="product-card-price">
            {typeof price === 'string' && price.includes('₹') ? price : `₹${price}`}
          </span>
          {ratingCount > 0 && (
            <span className="product-card-rating-count">
              ({ratingCount} reviews)
            </span>
          )}
        </div>

        <button className="product-card-button">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


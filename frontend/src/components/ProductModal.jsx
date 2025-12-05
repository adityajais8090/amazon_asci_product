import React from "react";
import "../styles/modal.css";
import { getImageUrl, handleImageError, DEFAULT_PRODUCT_IMAGE } from "../utils/defaultImage";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  // Helper function to safely parse JSON
  const safeParse = (str) => {
    if (!str) return null;
    if (typeof str === 'object') return str;
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  };

  // Parsing JSON fields safely
  const ai_title_obj = safeParse(product.ai_title);
  const ai_title = ai_title_obj?.title || product.title || product.asin || 'Product Title';
  
  const ai_product_info = safeParse(product.ai_product_information) || {};
  const ai_description_obj = safeParse(product.ai_description);
  const ai_description = ai_description_obj?.description || ai_description_obj || '';
  
  const feature_bullets = safeParse(product.ai_feature_bullets) || [];
  const detail_bullets = safeParse(product.ai_detail_bullets) || {};
  
  // Get image with default fallback
  const imageUrl = getImageUrl(
    product.images?.main || product.image || product.images?.[0]
  );
  
  // Get price and rating
  const price = product.price?.current || product.price || null;
  const rating = product.rating?.stars || product.ratings?.stars || null;
  const ratingCount = product.rating?.ratings_count || product.ratings?.ratings_count || 0;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="modal-close-button"
          aria-label="Close modal"
        >
          ✖
        </button>

        {/* Header */}
        <div className="modal-header">
          <h1 className="modal-title">{ai_title}</h1>
          {product.brand && <p className="modal-brand">{product.brand}</p>}
        </div>

        {/* Body */}
        <div className="modal-body">
        {/* Image */}
        <div className="modal-image-container">
          <img 
            src={imageUrl} 
            alt={ai_title} 
            className="modal-image"
            onError={(e) => handleImageError(e, DEFAULT_PRODUCT_IMAGE)}
          />
        </div>

          {/* Price + Rating */}
          {(price || rating) && (
            <div className="modal-badges">
              {price && (
                <span className="modal-badge modal-badge-price">
                  💰 {typeof price === 'string' && price.includes('₹') ? price : `₹${price}`}
                </span>
              )}
              {rating && (
                <span className="modal-badge modal-badge-rating">
                  ⭐ {rating} {ratingCount > 0 && `(${ratingCount} reviews)`}
                </span>
              )}
            </div>
          )}

          {/* Product Information */}
          {Object.keys(ai_product_info).length > 0 && (
            <>
              <h3 className="modal-section-title">📌 Product Information</h3>
              <ul className="modal-list">
                {Object.entries(ai_product_info).map(([k, v], i) => (
                  <li key={i} className="modal-list-item">
                    <strong>{k}:</strong> {typeof v === "object" ? JSON.stringify(v) : String(v)}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Key Features */}
          {Array.isArray(feature_bullets) && feature_bullets.length > 0 && (
            <>
              <h3 className="modal-section-title">🚀 Key Features</h3>
              <ul className="modal-list">
                {feature_bullets.map((bullet, i) => (
                  <li key={i} className="modal-list-item">
                    {bullet}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Specifications */}
          {Object.keys(detail_bullets).length > 0 && (
            <>
              <h3 className="modal-section-title">📍 Specifications</h3>
              <ul className="modal-list">
                {Object.entries(detail_bullets).map(([k, v], i) => (
                  <li key={i} className="modal-list-item">
                    <strong>{k}:</strong> {typeof v === "object" ? JSON.stringify(v) : String(v)}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Description */}
          {ai_description && (
            <>
              <h3 className="modal-section-title">📝 Description</h3>
              <p className="modal-description">{ai_description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

import React from 'react';
import '../styles/productDetailsDisplay.css';
import { getImageUrl, handleImageError, DEFAULT_PRODUCT_IMAGE } from '../utils/defaultImage';

const ProductDetailsDisplay = ({ product }) => {
  if (!product) return null;

  // Helper to safely parse JSON strings
  const safeParse = (str) => {
    if (!str) return null;
    if (typeof str === 'object') return str;
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  };

  // Extract title - handle JSON string format
  let title = product.title;
  if (!title && product.ai_title) {
    const aiTitleObj = safeParse(product.ai_title);
    title = aiTitleObj?.title || aiTitleObj || 'Product Title Not Available';
  }
  title = title || 'Product Title Not Available';

  const brand = product.brand || 'Unknown Brand';
  const category = product.category || 'Uncategorized';
  const asin = product.asin || 'N/A';
  const url = product.url || '#';

  // Price information - handle both object and string formats
  let price = null;
  let listPrice = null;
  let currency = 'INR';
  let discount = null;

  if (product.price) {
    // Handle JSON string format
    let priceData = product.price;
    if (typeof priceData === 'string') {
      priceData = safeParse(priceData);
    }
    
    if (typeof priceData === 'object' && priceData !== null) {
      // Extract primitive values, never assign the object itself
      price = priceData.current || null;
      listPrice = priceData.list_price || null;
      currency = priceData.currency || 'INR';
      discount = priceData.discount_percent || null;
    } else if (typeof priceData === 'number' || typeof priceData === 'string') {
      // Handle direct price value
      price = priceData;
    }
  }
  
  // Ensure price is always a primitive or null
  if (price && typeof price === 'object') {
    price = null;
  }

  // Images - handle JSON string format
  let imagesData = product.images || {};
  if (typeof imagesData === 'string') {
    imagesData = safeParse(imagesData) || {};
  }
  const mainImage = getImageUrl(imagesData?.main || product.image);
  const allImages = Array.isArray(imagesData?.all) ? imagesData.all : 
                    Array.isArray(imagesData?.high_res) ? imagesData.high_res : 
                    [];

  // Rating - handle JSON string format and extract primitive values
  let ratingData = product.rating || product.ratings || {};
  if (typeof ratingData === 'string') {
    ratingData = safeParse(ratingData) || {};
  }
  const rating = ratingData?.average_rating || ratingData?.stars || null;
  const totalRatings = ratingData?.total_ratings || ratingData?.ratings_count || 0;
  
  // Ensure rating is a number or null
  const ratingValue = rating && typeof rating === 'number' ? rating : null;
  const ratingsCount = totalRatings && typeof totalRatings === 'number' ? totalRatings : 0;

  // Product information - parse JSON strings if needed
  let productInfo = product.product_information || {};
  if (typeof productInfo === 'string') {
    productInfo = safeParse(productInfo) || {};
  }

  let technicalDetails = product.technical_details || {};
  if (typeof technicalDetails === 'string') {
    technicalDetails = safeParse(technicalDetails) || {};
  }

  let featureBullets = product.feature_bullets || [];
  if (typeof featureBullets === 'string') {
    featureBullets = safeParse(featureBullets) || [];
  }
  if (!Array.isArray(featureBullets)) {
    featureBullets = [];
  }

  const description = product.description || '';

  return (
    <div className="product-details-display">
      {/* Header Section */}
      <div className="product-header">
        <div className="product-title-section">
          <h1 className="product-title">{title}</h1>
          <div className="product-meta">
            {brand && <span className="product-brand">by {brand}</span>}
            {category && <span className="product-category">in {category}</span>}
          </div>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="view-on-amazon-btn">
          View on Amazon ↗
        </a>
      </div>

      {/* Main Content Grid */}
      <div className="product-content-grid">
        {/* Left Column - Images */}
        <div className="product-images-section">
          <div className="main-image-container">
            <img 
              src={mainImage} 
              alt={title}
              className="main-product-image"
              onError={(e) => handleImageError(e, DEFAULT_PRODUCT_IMAGE)}
            />
          </div>

          {allImages.length > 0 && (
            <div className="image-thumbnails">
              {allImages.slice(0, 5).map((img, idx) => (
                <img 
                  key={idx} 
                  src={getImageUrl(img)} 
                  alt={`${title} - Image ${idx + 1}`}
                  className="thumbnail-image"
                  onError={(e) => handleImageError(e, DEFAULT_PRODUCT_IMAGE)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="product-info-section">
          {/* Price Section */}
          <div className="price-section">
            {price ? (
              <>
                <div className="price-row">
                  <span className="price-label">Price:</span>
                  <span className="current-price">
                    {currency === 'INR' ? '₹' : currency} {price}
                  </span>
                </div>
                {listPrice && listPrice !== price && (
                  <div className="price-row">
                    <span className="list-price-label">List Price:</span>
                    <span className="list-price">
                      {currency === 'INR' ? '₹' : currency} {listPrice}
                    </span>
                  </div>
                )}
                {discount && (
                  <div className="discount-badge">
                    Save {discount}%
                  </div>
                )}
              </>
            ) : (
              <div className="price-unavailable">Price not available</div>
            )}
          </div>

          {/* Rating Section */}
          {ratingValue && (
            <div className="rating-section">
              <div className="rating-display">
                <span className="rating-stars">
                  {'★'.repeat(Math.floor(ratingValue))}
                  {'☆'.repeat(5 - Math.floor(ratingValue))}
                </span>
                <span className="rating-value">{ratingValue}</span>
              </div>
              {ratingsCount > 0 && (
                <div className="rating-count">
                  {ratingsCount.toLocaleString()} ratings
                </div>
              )}
            </div>
          )}

          {/* ASIN */}
          <div className="asin-section">
            <span className="asin-label">ASIN:</span>
            <span className="asin-value">{asin}</span>
          </div>

          {/* Feature Bullets */}
          {featureBullets.length > 0 && (
            <div className="features-section">
              <h3 className="section-title">About this item</h3>
              <ul className="feature-list">
                {featureBullets.map((bullet, idx) => (
                  <li key={idx} className="feature-item">{bullet}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Product Information */}
          {Object.keys(productInfo).length > 0 && (
            <div className="product-info-section-details">
              <h3 className="section-title">Product Information</h3>
              <div className="info-table">
                {Object.entries(productInfo).slice(0, 10).map(([key, value]) => (
                  <div key={key} className="info-row">
                    <span className="info-label">{key}:</span>
                    <span className="info-value">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Details */}
          {Object.keys(technicalDetails).length > 0 && (
            <div className="technical-details-section">
              <h3 className="section-title">Technical Details</h3>
              <div className="info-table">
                {Object.entries(technicalDetails).slice(0, 10).map(([key, value]) => (
                  <div key={key} className="info-row">
                    <span className="info-label">{key}:</span>
                    <span className="info-value">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="description-section">
              <h3 className="section-title">Product Description</h3>
              <p className="description-text">{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsDisplay;


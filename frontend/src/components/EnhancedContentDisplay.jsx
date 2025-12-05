import React from 'react';
import '../styles/productDetailsDisplay.css';
import { DEFAULT_PRODUCT_IMAGE } from '../utils/defaultImage';

const EnhancedContentDisplay = ({ enhancedData }) => {
  if (!enhancedData) return null;

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

  // Extract AI-enhanced title
  let title = null;
  if (enhancedData.ai_title) {
    const aiTitleObj = safeParse(enhancedData.ai_title);
    title = aiTitleObj?.title || aiTitleObj || null;
  }

  // Extract AI product information
  let aiProductInfo = {};
  if (enhancedData.ai_product_information) {
    const parsed = safeParse(enhancedData.ai_product_information);
    aiProductInfo = typeof parsed === 'object' && parsed !== null ? parsed : {};
  }

  // Extract AI detail bullets
  let aiDetailBullets = {};
  if (enhancedData.ai_detail_bullets) {
    const parsed = safeParse(enhancedData.ai_detail_bullets);
    aiDetailBullets = typeof parsed === 'object' && parsed !== null ? parsed : {};
  }

  // Extract AI feature bullets
  let aiFeatureBullets = [];
  if (enhancedData.ai_feature_bullets) {
    const parsed = safeParse(enhancedData.ai_feature_bullets);
    if (Array.isArray(parsed)) {
      aiFeatureBullets = parsed.filter(b => b && typeof b === 'string');
    } else if (typeof parsed === 'object' && parsed !== null) {
      // If it's an object, try to extract array values or string values
      const values = Object.values(parsed);
      aiFeatureBullets = values.filter(v => typeof v === 'string' && v.trim() !== '');
    } else if (typeof parsed === 'string') {
      // If it's a single string, wrap it in an array
      aiFeatureBullets = [parsed];
    }
  }

  // Extract AI description
  let aiDescription = '';
  if (enhancedData.ai_description) {
    const parsed = safeParse(enhancedData.ai_description);
    if (typeof parsed === 'object' && parsed?.description) {
      aiDescription = parsed.description;
    } else if (typeof parsed === 'string') {
      aiDescription = parsed;
    }
  }

  // Use default image utility

  return (
    <div className="product-details-display enhanced-content-display">
      <div className="product-header">
        <div className="product-title-section">
          {title ? (
            <>
              <h1 className="product-title">{title}</h1>
              <div className="product-meta">
                <span className="ai-badge">AI Enhanced</span>
              </div>
            </>
          ) : (
            <h1 className="product-title">AI Enhanced Content</h1>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="product-content-grid">
        {/* Left Column - Placeholder Image */}
        <div className="product-images-section">
          <div className="main-image-container">
            <img 
              src={DEFAULT_PRODUCT_IMAGE}
              alt="AI Enhanced Product"
              className="main-product-image"
              onError={(e) => {
                e.target.src = DEFAULT_PRODUCT_IMAGE;
                e.target.onerror = null;
              }}
            />
          </div>
        </div>

        {/* Right Column - Enhanced Details */}
        <div className="product-info-section">
          {/* AI Feature Bullets */}
          {aiFeatureBullets.length > 0 && (
            <div className="features-section">
              <h3 className="section-title"> AI-Enhanced Key Features</h3>
              <ul className="feature-list">
                {aiFeatureBullets.map((bullet, idx) => (
                  <li key={idx} className="feature-item">{bullet}</li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Product Information */}
          {Object.keys(aiProductInfo).length > 0 && (
            <div className="product-info-section-details">
              <h3 className="section-title">AI-Enhanced Product Information</h3>
              <div className="info-table">
                {Object.entries(aiProductInfo).slice(0, 15).map(([key, value]) => (
                  <div key={key} className="info-row">
                    <span className="info-label">{key}:</span>
                    <span className="info-value">
                      {typeof value === 'object' && value !== null 
                        ? JSON.stringify(value) 
                        : String(value || 'N/A')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Detail Bullets */}
          {Object.keys(aiDetailBullets).length > 0 && (
            <div className="technical-details-section">
              <h3 className="section-title"> AI-Enhanced Specifications</h3>
              <div className="info-table">
                {Object.entries(aiDetailBullets).slice(0, 15).map(([key, value]) => (
                  <div key={key} className="info-row">
                    <span className="info-label">{key}:</span>
                    <span className="info-value">
                      {typeof value === 'object' && value !== null 
                        ? JSON.stringify(value) 
                        : String(value || 'N/A')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Description */}
          {aiDescription && (
            <div className="description-section">
              <h3 className="section-title"> AI-Enhanced Description</h3>
              <p className="description-text">{aiDescription}</p>
            </div>
          )}

          {/* Empty State */}
          {!title && aiFeatureBullets.length === 0 && Object.keys(aiProductInfo).length === 0 && 
           Object.keys(aiDetailBullets).length === 0 && !aiDescription && (
            <div className="empty-state">
              <div className="empty-state-text">No enhanced content available</div>
              <div className="empty-state-subtext">AI enhancement data will appear here</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedContentDisplay;


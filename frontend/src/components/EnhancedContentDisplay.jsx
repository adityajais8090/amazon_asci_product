import React from "react";
import "../styles/productDetailsDisplay.css";
import { DEFAULT_PRODUCT_IMAGE } from "../utils/defaultImage";

const EnhancedContentDisplay = ({ enhancedData }) => {
  if (!enhancedData) return null;

  // Safe JSON parser
  const safeParse = (data) => {
    if (!data) return null;
    if (typeof data === "object") return data;
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  };

  // Parse AI data
  const aiTitle = safeParse(enhancedData.ai_title)?.title || null;
  const aiDescription = safeParse(enhancedData.ai_description)?.description || null;

  const aiProductInfo = safeParse(enhancedData.ai_product_information) || {};
  const aiDetailBullets = safeParse(enhancedData.ai_detail_bullets) || {};
  const aiFeatureBulletsObj = safeParse(enhancedData.ai_feature_bullets) || {};

  // Convert bullet objects to array
  const aiFeatureBullets = Object.values(aiFeatureBulletsObj).filter(Boolean);
  const aiDetailBulletsArr = Object.values(aiDetailBullets).filter(Boolean);

  console.log("Title :",aiTitle, "Description :",aiDescription, "ProductINFO :", aiProductInfo,
    "DetailBullet :", aiDetailBullets, " FeatureBullets :", aiFeatureBullets
   )

  const hasNoContent =
    !aiTitle &&
    !aiDescription &&
    aiFeatureBullets.length === 0 &&
    aiDetailBulletsArr.length === 0 &&
    Object.keys(aiProductInfo).length === 0;

  return (
    <div className="product-details-display">

      {/* Title */}
      <div className="product-header">
        <div className="product-title-section">
          <h1 className="product-title">{aiTitle || "AI Enhanced Content"}</h1>
          {aiTitle && <span className="ai-badge">✨ AI Enhanced</span>}
        </div>
      </div>

      <div className="product-content-grid">
        
        {/* Image Display */}
        <div className="product-images-section">
          <div className="main-image-container">
            <img 
              src={DEFAULT_PRODUCT_IMAGE} 
              alt="Enhanced AI Content" 
              className="main-product-image"
              onError={(e)=>{e.target.src=DEFAULT_PRODUCT_IMAGE}} 
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="product-info-section">

           <div className="price-section">
            {aiDescription ? (
              <>
                <div className="description-section">
              <h3 className="section-title">Enhanced Product Description</h3>
              <p className="description-text">{aiDescription}</p>
            </div>
              </>
            ) : (
              <div className="price-unavailable">Description not available</div>
            )}
          </div>

         {/* Feature Bullets */}
          {aiFeatureBullets.length > 0 && (
            <div className="features-section">
              <h3 className="section-title">✨ AI-Enhanced Key Features</h3>

              <ul className="feature-list enhanced-bullet-ui">
                {aiFeatureBullets.map((bullet, i) => (
                  <li key={i} className="feature-item">
                    <span className="bullet-icon">•</span>
                    <span dangerouslySetInnerHTML={{ __html: bullet }} />
                  </li>
                ))}
              </ul>
            </div>
          )}



          {/* Product Information */}
          {Object.keys(aiProductInfo).length > 0 && (
            <div className="product-info-section-details">
              <h3 className="section-title">📦 AI Product Information</h3>
              <div className="info-table">
                {Object.entries(aiProductInfo).map(([key,val]) => (
                  <div key={key} className="info-row">
                    <span className="info-label">{key.replace(/_/g," ")}:</span>
                    <span className="info-value">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Detail Bullets */}
          {aiDetailBulletsArr.length > 0 && (
            <div className="technical-details-section">
              <h3 className="section-title">📌 Additional Highlights</h3>
              <ul className="feature-list">
                {aiDetailBulletsArr.map((b,i)=>
                  <li key={i} className="feature-item" dangerouslySetInnerHTML={{ __html: b }} />
                )}
              </ul>
            </div>
          )}


          {/* Empty State */}
          {hasNoContent && (
            <div className="empty-state">
              <div className="empty-state-icon">✨</div>
              <p>No enhanced details found yet</p>
              <small>Upload AI processed data to view here</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedContentDisplay;

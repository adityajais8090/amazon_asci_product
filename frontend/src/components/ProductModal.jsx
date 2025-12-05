import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  // Parsing JSON fields safely
  const ai_title = product.ai_title ? JSON.parse(product.ai_title)?.title : product.asin;
  const ai_product_info = product.ai_product_information ? JSON.parse(product.ai_product_information) : {};
  const ai_description = product.ai_description ? JSON.parse(product.ai_description)?.description : "";
  const feature_bullets = product.ai_feature_bullets ? JSON.parse(product.ai_feature_bullets) : [];
  const detail_bullets = product.ai_detail_bullets ? JSON.parse(product.ai_detail_bullets) : [];
  
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-3">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh] relative">

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 bg-red-500 text-white px-2 rounded hover:bg-red-600"
        >
          ✖
        </button>

        {/* Header */}
        <h1 className="text-2xl font-bold pr-6">{ai_title}</h1>
        <p className="text-gray-600 mt-1">{product.brand}</p>

        {/* Optional Image */}
        {product.image && (
          <div className="mt-4 flex justify-center">
            <img 
              src={product.image} 
              alt="product" 
              className="h-48 object-contain rounded-md"
            />
          </div>
        )}

        <hr className="my-4" />

        {/* Price + Rating Row */}
        <div className="flex flex-wrap gap-3 text-sm">
          {product.price && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">
              💰 {product.price}
            </span>
          )}

          {product.ratings && (
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded font-medium">
              ⭐ {product.ratings.stars || ""} ({product.ratings.ratings_count || 0})
            </span>
          )}
        </div>

        {/* Product Info */}
        <h3 className="font-semibold text-lg mt-6 mb-2">📌 Product Information</h3>
        <ul className="text-sm ml-4 list-disc space-y-1">
          {Object.entries(ai_product_info).map(([k, v], i) => (
            <li key={i}>
              <strong>{k}: </strong>
              {typeof v === "object" ? JSON.stringify(v) : v}
            </li>
          ))}
        </ul>

        {/* Features */}
        <h3 className="font-semibold text-lg mt-5 mb-2">🚀 Key Features</h3>
        <ul className="text-sm ml-4 list-disc space-y-1">
          {feature_bullets.map((b, i)=> <li key={i}>{b}</li>)}
        </ul>

        {/* Detail Specs */}
        <h3 className="font-semibold text-lg mt-5 mb-2">📍 Specifications</h3>
        <ul className="text-sm space-y-1">
          {Object.entries(detail_bullets).map(([k,v],i)=>(
            <li key={i}><strong>{k}: </strong>{typeof v==="object"?JSON.stringify(v):v}</li>
          ))}
        </ul>

        {/* Description */}
        <h3 className="font-semibold text-lg mt-5 mb-2">📝 Description</h3>
        <p className="text-sm leading-6 whitespace-pre-line">{ai_description}</p>

      </div>
    </div>
  );
};

export default ProductModal;

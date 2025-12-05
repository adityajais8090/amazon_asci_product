// ProductList.jsx
import { useEffect, useState } from "react";
import { parseProduct } from "../../utils/parseProduct";

const ProductList = ({ products, onProductClick }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((p,i)=>(
        <div 
          key={i}
          className="border p-3 rounded-lg shadow hover:scale-[1.02] cursor-pointer"
          onClick={()=> onProductClick(p)}     // <-- triggers modal popup
        >
          <h4 className="font-bold text-lg">{p.title || p.asin}</h4>
          <p className="text-sm text-gray-600">{p.price}</p>
        </div>
      ))}
    </div>
  );
};


export default ProductList;


function ProductCard({ product }) {
  return (
    <div className="rounded-xl shadow-lg p-4 bg-white hover:scale-[1.02] transition-all">
      <img
        src={product.images.main || "https://via.placeholder.com/300"}
        className="h-48 w-full object-cover rounded-lg bg-gray-100"
        alt={product.asin}
      />

      <h3 className="font-semibold text-lg mt-2 line-clamp-2">
        {product.ai_title?.title || "Title Not Available"}
      </h3>

      <p className="text-sm text-gray-600">Brand: {product.brand}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-green-600 font-bold">₹{product.price?.current || "N/A"}</span>
        <span className="text-yellow-500">⭐ {product.rating?.stars || "4.0"}</span>
      </div>

      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={() => alert("Open product details modal")}
      >
        View Details
      </button>
    </div>
  );
}

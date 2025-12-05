import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import { getData, getAllData } from '../service/api'; 
import ProductList from "./ProductList";  
import ProductModal from "../components/ProductModal";

const Home = () => {

  const [code, setCode] = useState("");
  const [product, setProduct] = useState(null);
  const [enhanced, setEnhanced] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("asin"); 

  // 🔥 modal state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch all product list
  const fetchAllProducts = async () => {
    try {
      const res = await getAllData(); 
      if (res?.product) setAllProducts(res.product);
    } catch (err) {
      console.log("Error fetching products", err);
    }
  };

  useEffect(() => { fetchAllProducts(); }, []);

  // ASIN fetch
  const handleFetch = async () => {
    if (!code.trim()) return alert("Enter ASIN / Product Code");

    try {
      setLoading(true);
      const response = await getData({ code: code.trim() });  

      if (response.success) {
        setProduct(response.product);            
        setEnhanced(response.enhancedata);       
        fetchAllProducts();          // refresh list after insert
      } else {
        alert(response.error || "Something went wrong");
      }
    } catch (err) {
      alert("API call failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="home-container">

      <h2>🛒 Amazon Product Extractor</h2>

      {/* Tabs */}
      <div className="tab-buttons">
        <button className={activeTab==="asin"?"active":""} onClick={()=>setActiveTab("asin")}>ASIN Extractor</button>
        <button className={activeTab==="list"?"active":""} onClick={()=>setActiveTab("list")}>Product List</button>
      </div>

      {/* TAB 1 — ASIN INPUT */}
      {activeTab === "asin" && (
        <>
          <div className="input-block">
            <input type="text" placeholder="Enter ASIN..." value={code} onChange={(e)=>setCode(e.target.value)} />
            <button onClick={handleFetch} disabled={loading}>{loading ? "Fetching..." : "Get Details"}</button>
          </div>

          <div className="result-section">
            <div className="box">
              <h3>📦 Product Details</h3>
              {product ? <pre>{JSON.stringify(product,null,2)}</pre> : <p>No data fetched</p>}
            </div>

            <div className="box">
              <h3>🚀 Enhanced Content</h3>
              {enhanced ? <pre>{JSON.stringify(enhanced,null,2)}</pre> : <p>No enhanced content yet</p>}
            </div>
          </div>
        </>
      )}

      {/* TAB 2 — PRODUCT GRID LIST WITH MODAL */}
      {activeTab === "list" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">📂 Stored Products</h3>

          {allProducts.length > 0 ? (
            <ProductList 
              products={allProducts} 
              onProductClick={(p)=> setSelectedProduct(p)}   // <<< handle click here
            />
          ) : (
            <p>No products stored</p>
          )}
        </div>
        )}

        {/* 🔥 Place Modal OUTSIDE tab section so it overlays properly */}
        {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={()=> setSelectedProduct(null)} 
        />
        )}


    </div>
  );
};

export default Home;

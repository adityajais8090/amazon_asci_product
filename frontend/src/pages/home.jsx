import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import { getData, getAllData } from '../service/api'; 
import ProductList from "./ProductList";  
import ProductModal from "../components/ProductModal";
import ProductDetailsDisplay from "../components/ProductDetailsDisplay";
import EnhancedContentDisplay from "../components/EnhancedContentDisplay";
import Loader from "../components/Loader";

const Home = () => {

  const [code, setCode] = useState("");
  const [product, setProduct] = useState(null);
  const [enhanced, setEnhanced] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("asin"); 

  
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

      <h2> Amazon Product Extractor</h2>

      
      <div className="tab-buttons">
        <button className={activeTab==="asin"?"active":""} onClick={()=>setActiveTab("asin")}>ASIN Extractor</button>
        <button className={activeTab==="list"?"active":""} onClick={()=>setActiveTab("list")}>Product List</button>
      </div>

     
      {activeTab === "asin" && (
        <>
          <div className="input-block">
            <input 
              type="text" 
              placeholder="Enter ASIN..." 
              value={code} 
              onChange={(e)=>setCode(e.target.value)}
              disabled={loading}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleFetch();
                }
              }}
            />
            <button onClick={handleFetch} disabled={loading} className={loading ? 'loading' : ''}>
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Fetching...
                </>
              ) : (
                'Get Details'
              )}
            </button>
          </div>

          <div className="result-section">
            <div className="box product-details-box">
              <h3>Product Details</h3>
              {loading ? (
                <Loader message="Fetching product details..." />
              ) : product ? (
                <ProductDetailsDisplay product={product} />
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📭</div>
                  <div className="empty-state-text">No data fetched</div>
                  <div className="empty-state-subtext">Enter an ASIN code and click "Get Details"</div>
                </div>
              )}
            </div>

            <div className="box enhanced-content-box">
              <h3>Enhanced Content</h3>
              {loading ? (
                <Loader message="Generating enhanced content..." />
              ) : enhanced ? (
                <EnhancedContentDisplay enhancedData={enhanced} />
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">✨</div>
                  <div className="empty-state-text">No enhanced content yet</div>
                  <div className="empty-state-subtext">AI-enhanced data will appear here after fetching</div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* TAB 2 — PRODUCT GRID LIST WITH MODAL */}
      {activeTab === "list" && (
        <div className="product-list-tab">
          <h3>Stored Products ({allProducts.length})</h3>
          <ProductList 
            products={allProducts} 
            onProductClick={(p)=> setSelectedProduct(p)}
          />
        </div>
      )}

       
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

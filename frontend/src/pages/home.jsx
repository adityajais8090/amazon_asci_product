import React, { useState } from 'react';
import '../styles/home.css';
import { getData } from '../service/api';   // function that fetches backend response

const Home = () => {
  const [code, setCode] = useState("");
  const [product, setProduct] = useState(null);
  const [enhanced, setEnhanced] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!code.trim()) return alert("Enter ASIN / Product Code");

    try {
        console.log("Here is the req code:", code);
      setLoading(true);
      const response = await getData({ code: code.trim() });  

      if (response.success) {
        setProduct(response.product);            
        setEnhanced(response.enhancedata);       
      } else {
        alert(response.error || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      alert("API call failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">

      <h2>ASIN Product Generator</h2>

      <div className="input-block">
        <input 
          type="text" 
          placeholder="Enter ASIN / Code..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleFetch} disabled={loading}>
          { loading ? "Fetching..." : "Get Product Details" }
        </button>
      </div>

      {/* RESULT BOXES */}
      <div className="result-section">
        
        {/* PRODUCT DETAILS BOX */}
        <div className="box">
          <h3>📦 Product Details</h3>
          {product ? 
            <pre>{JSON.stringify(product, null, 2)}</pre> 
            : <p>No data fetched yet</p>
          }
        </div>

        {/* ENHANCED DATA BOX */}
        <div className="box">
          <h3>🚀 Enhanced Product Content</h3>
          {enhanced ? 
            <pre>{JSON.stringify(enhanced, null, 2)}</pre> 
            : <p>No enhanced content yet</p>
          }
        </div>

      </div>

    </div>
  );
};

export default Home;

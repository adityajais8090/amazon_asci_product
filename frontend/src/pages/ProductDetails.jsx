// pages/ProductDetails.jsx
import { useParams } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);

  const ai_title = product.ai_title ? JSON.parse(product.ai_title).title : "No title";
  const ai_product_info = product.ai_product_information ? JSON.parse(product.ai_product_information) : {};
  const ai_description = product.ai_description ? JSON.parse(product.ai_description).description : "";
  const feature_bullets = product.ai_feature_bullets ? JSON.parse(product.ai_feature_bullets) : [];
  const detail_bullets = product.ai_detail_bullets ? JSON.parse(product.ai_detail_bullets) : [];

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold">{ai_title}</h1>
      <p className="text-gray-600 mt-1">{product.brand}</p>

      
      <div className="mt-5 space-y-6">
        
       
        <section className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Product Information</h2>
          {Object.keys(ai_product_info).length ? (
            <ul className="text-sm">
              {Object.entries(ai_product_info).map(([key, value], i) => (
                <li key={i} className="mb-1"><strong>{key}: </strong>{value}</li>
              ))}
            </ul>
          ) : "No Data"}
        </section>

        
        <section className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Features</h2>
          <ul className="list-disc ml-6 space-y-1">
            {feature_bullets?.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </section>

        
        <section className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Detail Bullets</h2>
          {Object.entries(detail_bullets).map(([k,v],i)=>(
            <p key={i}><strong>{k}: </strong>{v}</p>
          ))}
        </section>

        
        <section className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <div dangerouslySetInnerHTML={{ __html: ai_description }} className="text-sm leading-6" />
        </section>

      </div>
    </div>
  );
};

export default ProductDetails;

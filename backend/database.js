import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  return await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
}

export async function saveProduct(product) {

  try{

    const db = await connectDB();

   console.log("here is the save products", product);
   
  const sql = `
    INSERT INTO products
    (asin, url, title, brand, category, price, images,
    rating, product_information, technical_details,
    detail_bullets, feature_bullets, description, 
    ai_title, ai_product_information, ai_detail_bullets,
    ai_feature_bullets, ai_description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      asin = VALUES(asin),
      url = VALUES(url),
      title = VALUES(title),
      brand = VALUES(brand),
      category = VALUES(category),
      price = VALUES(price),
      images = VALUES(images),
      rating = VALUES(rating),
      product_information = VALUES(product_information),
      technical_details = VALUES(technical_details),
      detail_bullets = VALUES(detail_bullets),
      feature_bullets = VALUES(feature_bullets),
      description = VALUES(description),
      ai_title = VALUES(ai_title),
      ai_product_information = VALUES(ai_product_information),
      ai_detail_bullets = VALUES(ai_detail_bullets),
      ai_feature_bullets = VALUES(ai_feature_bullets),
      ai_description = VALUES(ai_description);
  `;

    
        const values = [
        product.asin,
        product.url,
        product.title,
        product.brand,
        product.category,

        JSON.stringify(product.price || {}),
        JSON.stringify(product.images || {}),
        JSON.stringify(product.rating || {}),

        JSON.stringify(product.product_information || {}),
        JSON.stringify(product.technical_details || {}),
        JSON.stringify(product.detail_bullets || {}),
        JSON.stringify(product.feature_bullets || []),

        product.description || null,

        product.ai_title || null,
        JSON.stringify(product.ai_product_information || {}),
        JSON.stringify(product.ai_detail_bullets || {}),
        JSON.stringify(product.ai_feature_bullets || {}),
        product.ai_description || null
      ];


  await db.execute(sql, values);
  await db.end();
  

  }catch(err){
    console.error("Error inserting products:", error);
        return { error: true, message: err.message };
  }
  
}


export async function getproduct(){
     try {
        const db = await connectDB();

        const sql = `SELECT * FROM products`;

        const [rows] = await db.execute(sql); // fetch results

        await db.end();
        return rows; // return all products list
    } catch (err) {
        console.error("Error fetching all products:", err);
        return { error: true, message: err.message };
    }
}

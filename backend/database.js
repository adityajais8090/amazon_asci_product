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
  const db = await connectDB();

  const sql = `
    INSERT INTO products
    (asin, url, title, ai_title, price, rating, reviews_count, description, ai_description,
     main_image, all_images, bullets, ai_bullets, technical_details, ai_technical_details,
     detail_bullets, ai_detail_bullets)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      ai_title = VALUES(ai_title),
      price = VALUES(price),
      rating = VALUES(rating),
      reviews_count = VALUES(reviews_count),
      description = VALUES(description),
      ai_description = VALUES(ai_description),
      main_image = VALUES(main_image),
      all_images = VALUES(all_images),
      bullets = VALUES(bullets),
      ai_bullets = VALUES(ai_bullets),
      technical_details = VALUES(technical_details),
      ai_technical_details = VALUES(ai_technical_details),
      detail_bullets = VALUES(detail_bullets),
      ai_detail_bullets = VALUES(ai_detail_bullets)
  `;

  const values = [
    product.asin,
    product.url,
    product.title,
    product.ai_title,
    product.price,
    product.rating,
    product.reviewsCount,
    product.description,
    product.ai_description,
    product.mainImage,
    JSON.stringify(product.allImages),
    JSON.stringify(product.bullets),
    JSON.stringify(product.ai_bullets),
    JSON.stringify(product.technicalDetails),
    JSON.stringify(product.ai_technicalDetails),
    JSON.stringify(product.detailBullets),
    JSON.stringify(product.ai_detailBullets)
  ];

  await db.execute(sql, values);
  await db.end();
}

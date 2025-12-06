# Product Scraper & AI Enhancement System

## 📌 Overview

This project scrapes product data from Amazon, enhances the information using AI, and stores both raw and AI-generated fields into a MySQL database with JSON support.

It is built for:

* Amazon product data extraction
* AI-enriched product information
* Clean structured storage (JSON + LONGTEXT)
* Scalable backend consumption

---

# 🏗️ Full Project Architecture

```
┌─────────────────────────┐        ┌─────────────────────────┐
│ 1. Frontend (Optional)   │        │ 6. Admin Dashboard       │
│    React                 │<------>│ (View AI-enhanced data) │
└───────────┬─────────────┘        └─────────────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 2. API Gateway (Node.js)      │
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 3. Scraper Module             │
│    - Calls ScraperAPI         │
│    - Fetches raw Amazon data  │
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 4. AI Enhancement Engine      │
│    - Rewrites title           │
│    - Enhances description     │
│    - Summarizes bullets       │
│    - Cleans product details   │
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 5. Database Layer (MySQL)     │
│    - JSON columns              │
│    - LONGTEXT for AI content   │
│    - utf8mb4_unicode_ci        │
└───────────────────────────────┘
```

---

# 📘 API Documentation

## 📌 Base URL

```
POST /api/scrape
```

This endpoint fetches raw Amazon product data → generates AI-enhanced versions → saves to database.

---

## 📩 Request Body

```json
{
  "asin": "B0C3R5WB1V",
  "country": "in"
}
```

---

## 📤 Successful Response

```json
{
  "success": true,
  "message": "Product saved successfully",
  "data": {
    "asin": "B0C3R5WB1V",
    "title": "Blue Dahlia 100% Cotton Bedsheet...",
    "ai_title": "Premium 254TC Soft Camellias..."
  }
}
```

---

## ❌ Error Response

```json
{
  "success": false,
  "error": "Invalid ASIN"
}
```

---

# 🧠 AI Enhancement Logic

The AI model transforms raw text fields into clean, SEO-optimized content.

### AI Enhances:

* `ai_title`
* `ai_description`
* `ai_feature_bullets`
* `ai_detail_bullets`
* `ai_product_information`

### AI Tasks:

* Rewrite titles for readability
* Convert long paragraphs into structured rich descriptions
* Summarize bullets with emojis & formatting
* Expand technical details for clarity
* Normalize key-value product specs

---

# 🗄️ Database Schema

```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asin VARCHAR(20) NOT NULL UNIQUE,
  url TEXT,
  title TEXT,
  brand VARCHAR(255),
  category VARCHAR(255),

  price JSON,
  images JSON,
  rating JSON,
  product_information JSON,
  technical_details JSON,
  detail_bullets JSON,
  feature_bullets JSON,

  description LONGTEXT,

  ai_title LONGTEXT,
  ai_product_information JSON,
  ai_detail_bullets JSON,
  ai_feature_bullets JSON,
  ai_description LONGTEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
```

---

# 🔌 Insert Query Example

```js
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
```

---

# ⚙️ Environment Variables

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=products_db
SCRAPER_API_KEY=xxxx
OPENAI_API_KEY=xxxx
```

---

# 🚀 Setup & Run

### Install Dependencies

```
npm install
```

### Run Server

```
npm run dev
```

---

# 📦 Additional Improvements (Optional)

* Background queue for scraping (BullMQ)
* Redis caching
* Cron jobs for auto-updates
* Dashboard analytics
* Optimized AI prompts
* Multi-country scraping



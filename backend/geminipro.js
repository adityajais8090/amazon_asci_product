import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// 🔹 Enhance Description Function
async function geminipro(productData) {
  if (!productData) {
    return { enhancedData: "" };
  }

const prompt = `
You are a top-tier e-commerce product listing optimization expert and copywriter. 
Your task is to enhance the product data provided below and produce a persuasive, 
professional, SEO-optimized, and fully structured JSON output for use on Amazon 
and other e-commerce platforms.

-----------------------
REQUIREMENTS
-----------------------
1. Preserve the original meaning of all product data.
2. Improve the title, bullets, descriptions, and details with a marketing-focused tone.
3. Make the content readable, compelling, and keyword-rich (without keyword stuffing).
4. Maintain the same number of bullets as in the source data.
5. If the product data has missing/null sections, you MUST still generate properly 
   structured JSON with placeholder values.
6. Output ONLY valid JSON. No explanations. No markdown.

-----------------------
STRICT JSON RULES
-----------------------
- The final output MUST be **100% valid JSON**.
- Arrays/lists are NOT allowed anywhere in the JSON.
- Every section MUST be a JSON object.
- Bullet sections (ai_feature_bullets and ai_detail_bullets) MUST be formatted as:
  {
    "bullet_1": "text...",
    "bullet_2": "text...",
    "bullet_3": "text..."
  }
- If the input contains fewer bullets, generate only as many bullets as exist.
- If the input contains zero bullets, still output:
  {
    "bullet_1": "",
    "bullet_2": "",
    "bullet_3": ""
  }
- ai_title MUST be an object: { "title": "..." }
- ai_product_information MUST be an object. If no data exists, return an empty object.
- ai_detail_bullets MUST be an object (no arrays).
- ai_feature_bullets MUST be an object (no arrays).
- ai_description MUST be an object: { "description": "..." }
- Never return arrays, lists, or any brackets: [].
- Never return markdown formatting or explanations.

-----------------------
MANDATORY OUTPUT FORMAT
-----------------------
{
  "ai_title": { ... },
  "ai_product_information": { ... },
  "ai_detail_bullets": { ... },
  "ai_feature_bullets": { ... },
  "ai_description": { ... }
}

-----------------------
INPUT PRODUCT DATA
-----------------------
${JSON.stringify(productData, null, 2)}
`;


  try {
    const res = await model.generateContent(prompt);
    const text = res.response.text().replace(/```json|```/g, "").trim();
    //console.log("Here is the generated data :", text);
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini Enhancement Failed:", err);
    return { enhancedDescription: productData.description }; // fallback
  }
}

// ✅ Export the function
export { geminipro };

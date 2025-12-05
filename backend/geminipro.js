import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro",
});

// 🔹 Enhance Description Function
async function geminipro(productData) {
  if (!productData) {
    return { enhancedData: "" };
  }

const prompt = `
You are a top e-commerce product listing optimization expert and copywriter.
Your task is to enhance the product data provided below to make it more persuasive, professional, structured, and SEO-optimized for Amazon or any e-commerce platform. 

Requirements:
- Maintain the original meaning of all data points.
- Improve title, description, bullet points, and technical details for readability and marketing appeal.
- Ensure the listing is engaging, e-commerce friendly, and highlights product benefits to the customer.
- Incorporate relevant keywords naturally without stuffing.
- Maintain the same number of bullets and technical details, just enhanced.
- Return output ONLY in JSON format with the same structure as the input.

Output JSON format:
{
  "ai_title": { ... },
  "ai_product_information": { ... },
  "ai_detail_bullets": { ... },
  "ai_feature_bullets": { ... },
  "ai_description": { ... }
}

Product Data:
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

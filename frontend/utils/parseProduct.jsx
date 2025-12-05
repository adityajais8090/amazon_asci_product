// utils/parseProduct.js
export function parseProduct(item) {
  return {
    ...item,
    price: JSON.parse(item.price || "{}"),
    images: JSON.parse(item.images || "{}"),
    rating: JSON.parse(item.rating || "{}"),
    product_information: JSON.parse(item.product_information || "{}"),
    ai_title: JSON.parse(item.ai_title || "{}"),
    ai_product_information: JSON.parse(item.ai_product_information || "{}"),
    ai_feature_bullets: JSON.parse(item.ai_feature_bullets || "[]"),
    ai_description: JSON.parse(item.ai_description || "{}"),
  };
}

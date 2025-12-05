// Default placeholder image for products - Amazon logo from CDN
export const DEFAULT_PRODUCT_IMAGE = 'https://unicorn-images.b-cdn.net/b57c0722-8eae-43de-8af8-c3a24796d5aa?optimizer=gif&width=400&height=400';

// Helper function to get image URL with fallback
export const getImageUrl = (image, fallback = DEFAULT_PRODUCT_IMAGE) => {
  if (!image) return fallback;
  if (typeof image === 'string' && image.trim() !== '') return image;
  return fallback;
};

// Helper function for image error handler
export const handleImageError = (e, fallback = DEFAULT_PRODUCT_IMAGE) => {
  e.target.src = fallback;
  e.target.onerror = null; // Prevent infinite loop
};


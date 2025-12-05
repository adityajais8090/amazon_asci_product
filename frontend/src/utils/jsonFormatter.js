// Utility function to format JSON with syntax highlighting
export const formatJsonWithHighlighting = (jsonString) => {
  if (!jsonString) return '';
  
  // Replace null values with highlighted version
  return jsonString
    .replace(/(".*?")\s*:\s*null/g, '<span class="json-null-value">$1: <span class="json-null">null</span></span>')
    .replace(/(".*?")\s*:/g, '<span class="json-key">$1</span>:')
    .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>');
};


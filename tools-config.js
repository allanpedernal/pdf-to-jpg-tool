// Tools configuration for the PDF Tools suite
const TOOLS_CONFIG = {
  pdf: {
    category: "PDF Tools",
    tools: [
      { id: "pdf-to-jpg", name: "PDF to JPG", icon: "📄", description: "Convert PDF pages to JPG images" },
      { id: "pdf-to-png", name: "PDF to PNG", icon: "🖼️", description: "Convert PDF pages to PNG images" },
      { id: "jpg-to-pdf", name: "JPG to PDF", icon: "📑", description: "Convert images to PDF document" },
      { id: "pdf-compress", name: "PDF Compressor", icon: "🗜️", description: "Reduce PDF file size" },
      { id: "pdf-split", name: "PDF Splitter", icon: "✂️", description: "Split PDF into separate pages" },
      { id: "pdf-merge", name: "PDF Merger", icon: "🔗", description: "Merge multiple PDFs into one" },
      { id: "pdf-rotate", name: "PDF Rotate", icon: "🔄", description: "Rotate PDF pages" },
      { id: "pdf-ocr", name: "PDF OCR", icon: "👁️", description: "Extract text from PDF images" },
      { id: "pdf-pagenum", name: "Add Page Numbers", icon: "🔢", description: "Add page numbers to a PDF" }
    ]
  },
  image: {
    category: "Image Tools",
    tools: [
      { id: "png-to-jpg", name: "PNG to JPG", icon: "🎨", description: "Convert PNG to JPG format" },
      { id: "image-resize", name: "Image Resizer", icon: "📏", description: "Resize images to any size" },
      { id: "image-compress", name: "Image Compressor", icon: "💾", description: "Compress image file size" },
      { id: "heic-to-jpg", name: "HEIC to JPG", icon: "📷", description: "Convert HEIC to JPG" },
      { id: "jpg-to-png", name: "JPG to PNG", icon: "🪄", description: "Convert JPG to PNG format" },
      { id: "image-to-webp", name: "Image to WebP", icon: "🌐", description: "Convert images to WebP" },
      { id: "webp-to-jpg", name: "WebP to JPG", icon: "🖼️", description: "Convert WebP to JPG" },
      { id: "webp-to-png", name: "WebP to PNG", icon: "🎨", description: "Convert WebP to PNG" }
    ]
  },
  utility: {
    category: "Utilities",
    tools: [
      { id: "qr-code", name: "QR Code Generator", icon: "🔳", description: "Create QR codes for any link" },
      { id: "password-generator", name: "Password Generator", icon: "🔑", description: "Generate strong passwords" },
      { id: "word-counter", name: "Word Counter", icon: "🔢", description: "Count words & characters" }
    ]
  }
};

// Get all tools as a flat array (across every category)
function getAllTools() {
  return Object.values(TOOLS_CONFIG).flatMap(category => category.tools);
}

// Get tool by ID
function getToolById(id) {
  const allTools = getAllTools();
  return allTools.find(tool => tool.id === id);
}

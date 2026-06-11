// Tools configuration for the PDF Tools suite
// `path` is the dedicated page for each tool. Tool ids do NOT match filenames,
// so this is the single source of truth for linking to a tool's own page.
const TOOLS_CONFIG = {
  pdf: {
    category: "PDF Tools",
    tools: [
      { id: "pdf-to-jpg", name: "PDF to JPG", icon: "📄", description: "Convert PDF pages to JPG images", path: "/pdf-to-jpg.html" },
      { id: "pdf-to-png", name: "PDF to PNG", icon: "🖼️", description: "Convert PDF pages to PNG images", path: "/pdf-to-png.html" },
      { id: "jpg-to-pdf", name: "JPG to PDF", icon: "📑", description: "Convert images to PDF document", path: "/jpg-to-pdf.html" },
      { id: "pdf-compress", name: "PDF Compressor", icon: "🗜️", description: "Reduce PDF file size", path: "/compress-pdf.html" },
      { id: "pdf-split", name: "PDF Splitter", icon: "✂️", description: "Split PDF into separate pages", path: "/split-pdf.html" },
      { id: "pdf-merge", name: "PDF Merger", icon: "🔗", description: "Merge multiple PDFs into one", path: "/merge-pdf.html" },
      { id: "pdf-rotate", name: "PDF Rotate", icon: "🔄", description: "Rotate PDF pages", path: "/rotate-pdf.html" },
      { id: "pdf-ocr", name: "PDF OCR", icon: "👁️", description: "Extract text from PDF images", path: "/pdf-ocr.html" },
      { id: "pdf-pagenum", name: "Add Page Numbers", icon: "🔢", description: "Add page numbers to a PDF", path: "/add-page-numbers-to-pdf.html" }
    ]
  },
  image: {
    category: "Image Tools",
    tools: [
      { id: "png-to-jpg", name: "PNG to JPG", icon: "🎨", description: "Convert PNG to JPG format", path: "/png-to-jpg.html" },
      { id: "image-resize", name: "Image Resizer", icon: "📏", description: "Resize images to any size", path: "/resize-image.html" },
      { id: "image-compress", name: "Image Compressor", icon: "💾", description: "Compress image file size", path: "/compress-image.html" },
      { id: "heic-to-jpg", name: "HEIC to JPG", icon: "📷", description: "Convert HEIC to JPG", path: "/heic-to-jpg.html" },
      { id: "jpg-to-png", name: "JPG to PNG", icon: "🪄", description: "Convert JPG to PNG format", path: "/jpg-to-png.html" },
      { id: "image-to-webp", name: "Image to WebP", icon: "🌐", description: "Convert images to WebP", path: "/image-to-webp.html" },
      { id: "webp-to-jpg", name: "WebP to JPG", icon: "🖼️", description: "Convert WebP to JPG", path: "/webp-to-jpg.html" },
      { id: "webp-to-png", name: "WebP to PNG", icon: "🎨", description: "Convert WebP to PNG", path: "/webp-to-png.html" }
    ]
  },
  utility: {
    category: "Utilities",
    tools: [
      { id: "qr-code", name: "QR Code Generator", icon: "🔳", description: "Create QR codes for any link", path: "/qr-code-generator.html" },
      { id: "password-generator", name: "Password Generator", icon: "🔑", description: "Generate strong passwords", path: "/password-generator.html" },
      { id: "word-counter", name: "Word Counter", icon: "🔢", description: "Count words & characters", path: "/word-counter.html" }
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

// Get the dedicated-page path for a tool id (falls back to home)
function getToolPath(id) {
  const t = getToolById(id);
  return (t && t.path) || '/';
}

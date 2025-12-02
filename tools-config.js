// Tools configuration for the PDF Tools suite
const TOOLS_CONFIG = {
  pdf: {
    category: "PDF Tools",
    tools: [
      { id: "pdf-to-jpg", name: "PDF to JPG", icon: "📄", description: "Convert PDF pages to JPG images" },
      { id: "jpg-to-pdf", name: "JPG to PDF", icon: "🖼️", description: "Convert images to PDF document" },
      { id: "pdf-compress", name: "PDF Compressor", icon: "🗜️", description: "Reduce PDF file size" },
      { id: "pdf-split", name: "PDF Splitter", icon: "✂️", description: "Split PDF into separate pages" },
      { id: "pdf-merge", name: "PDF Merger", icon: "🔗", description: "Merge multiple PDFs into one" },
      { id: "pdf-rotate", name: "PDF Rotate", icon: "🔄", description: "Rotate PDF pages" },
      { id: "pdf-ocr", name: "PDF OCR", icon: "👁️", description: "Extract text from PDF images" }
    ]
  },
  image: {
    category: "Image Tools",
    tools: [
      { id: "png-to-jpg", name: "PNG to JPG", icon: "🖼️", description: "Convert PNG to JPG format" },
      { id: "image-resize", name: "Image Resizer", icon: "📏", description: "Resize images to any size" },
      { id: "image-compress", name: "Image Compressor", icon: "🗜️", description: "Compress image file size" },
      { id: "heic-to-jpg", name: "HEIC to JPG", icon: "📷", description: "Convert HEIC to JPG" }
    ]
  }
};

// Get all tools as a flat array
function getAllTools() {
  return [
    ...TOOLS_CONFIG.pdf.tools,
    ...TOOLS_CONFIG.image.tools
  ];
}

// Get tool by ID
function getToolById(id) {
  const allTools = getAllTools();
  return allTools.find(tool => tool.id === id);
}

// Shared template function for creating tool pages
function createToolPage(config) {
  const { title, description, icon, keywords, metaDescription } = config;
  
  return `<!DOCTYPE html>
<html lang="en" dir="ltr" itemscope itemtype="https://schema.org/WebApplication">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
  
  <!-- Primary SEO Meta Tags -->
  <title>${title} - Free Online Tool</title>
  <meta name="title" content="${title} - Free Online Tool">
  <meta name="description" content="${metaDescription || description}">
  <meta name="keywords" content="${keywords}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#0f172a">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Shared Styles -->
  <link rel="stylesheet" href="/shared/styles.css">
  
  <!-- Critical CSS -->
  <style>
    body{margin:0;padding:0;font-family:system-ui,-apple-system,sans-serif;background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%);color:#f8fafc;min-height:100vh}
    .bg-gradient-to-br{background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)}
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
      50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.7); }
    }
    @keyframes slide-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .animate-slide-in { animation: slide-in 0.5s ease-out; }
  </style>
</head>
<body class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 min-h-screen">
  
  <!-- Navigation will be inserted here by navigation.js -->
  
  <!-- Main Container -->
  <div class="flex flex-col lg:flex-row w-full min-h-screen overflow-x-hidden">
    
    <!-- Main Content -->
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:ml-64 flex flex-col items-center animate-slide-in">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">${icon}</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ${title}
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">${description}</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Tool-specific content will be inserted here -->
      <div id="tool-content" class="w-full">
        ${config.content || ''}
      </div>
      
    </main>
    
  </div>
  
  <!-- Load shared scripts -->
  <script src="/tools-config.js"></script>
  <script src="/shared/navigation.js"></script>
  
  <!-- Tool-specific scripts -->
  ${config.scripts || ''}
  
</body>
</html>`;
}



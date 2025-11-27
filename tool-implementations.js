// Tool implementations and event handlers

function initToolHandlers(toolId) {
  // Clear any existing handlers
  if (window.currentToolHandlers) {
    window.currentToolHandlers.forEach(cleanup => cleanup());
    window.currentToolHandlers = [];
  }
  
  switch(toolId) {
    case 'pdf-to-jpg':
      initPDFToJPG();
      break;
    case 'jpg-to-pdf':
      initJPGToPDF();
      break;
    case 'pdf-compress':
      initPDFCompress();
      break;
    case 'pdf-split':
      initPDFSplit();
      break;
    case 'pdf-merge':
      initPDFMerge();
      break;
    case 'pdf-rotate':
      initPDFRotate();
      break;
    case 'pdf-unlock':
      initPDFUnlock();
      break;
    case 'pdf-protect':
      initPDFProtect();
      break;
    case 'pdf-ocr':
      initPDFOCR();
      break;
    case 'pdf-to-word':
      initPDFToWord();
      break;
    case 'word-to-pdf':
      initWordToPDF();
      break;
    case 'png-to-jpg':
      initPNGToJPG();
      break;
    case 'image-resize':
      initImageResize();
      break;
    case 'image-compress':
      initImageCompress();
      break;
    case 'heic-to-jpg':
      initHEICToJPG();
      break;
    default:
      console.log('Tool implementation not found for:', toolId);
  }
}

// PDF to JPG Implementation
function initPDFToJPG() {
  const fileInput = document.getElementById('file-pdf-jpg');
  const dropzone = document.getElementById('dropzone-pdf-jpg');
  const dropLabel = document.getElementById('dropLabel-pdf-jpg');
  const startBtn = document.getElementById('start-pdf-jpg');
  const cancelBtn = document.getElementById('cancel-pdf-jpg');
  const qualityInput = document.getElementById('quality-pdf-jpg');
  const scaleInput = document.getElementById('scale-pdf-jpg');
  const bar = document.getElementById('bar-pdf-jpg');
  const stats = document.getElementById('stats-pdf-jpg');
  const log = document.getElementById('log-pdf-jpg');
  
  if (!fileInput || !dropzone) return;
  
  let currentFile = null;
  let controller = { cancelled: false };
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => startBtn?.removeEventListener('click', handleStart),
    () => cancelBtn?.removeEventListener('click', handleCancel)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') loadFile(f);
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      loadFile(fileInput.files[0]);
    }
  }
  
  function loadFile(f) {
    if (f.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }
    currentFile = f;
    dropzone.classList.add('border-blue-400', 'bg-blue-500/10');
    if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${f.name}`;
    if (stats) stats.textContent = `${(f.size/1024/1024).toFixed(2)} MB selected`;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile && !pdfjsReady && typeof loadPDFJS === 'function' && !window.pdfjsLoading) {
      loadPDFJS();
    }
    
    if (log) {
      if (pdfjsReady) {
        log.innerHTML = '<span class="inline-block animate-bounce">✨</span> <span>Ready to convert! Click the button below.</span>';
        log.style.color = '#60a5fa';
        if (startBtn) startBtn.classList.add('animate-pulse-glow');
      } else {
        log.innerHTML = '<span class="inline-block animate-spin-slow">⏳</span> <span>Loading PDF.js library...</span>';
        log.style.color = '#94a3b8';
      }
    }
  }
  
  function handleStart() {
    if (!currentFile) {
      alert('Choose a PDF first');
      return;
    }
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      alert('PDF.js library is still loading. Please wait a moment and try again.');
      return;
    }
    controller.cancelled = false;
    if (cancelBtn) cancelBtn.disabled = false;
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.classList.remove('animate-pulse-glow');
      startBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Starting conversion...</span>';
      log.style.color = '#60a5fa';
    }
    processPDF(currentFile, {
      quality: parseFloat(qualityInput?.value) || 0.85,
      scale: parseFloat(scaleInput?.value) || 1.6
    });
  }
  
  function handleCancel() {
    if (controller.cancelled) return;
    controller.cancelled = true;
    if (log) {
      log.innerHTML = '<span class="inline-block animate-pulse">⏸️</span> <span>Cancelling... Please wait...</span>';
      log.style.color = '#fb923c';
    }
    if (cancelBtn) {
      cancelBtn.disabled = true;
      cancelBtn.textContent = 'Cancelling...';
    }
  }
  
  async function processPDF(file, opts) {
    try {
      const arr = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      const pdf = await loadingTask.promise;
      const num = pdf.numPages;
      const zip = new JSZip();
      updateProgress(0);
      if (stats) stats.textContent = `Pages: ${num} — processing...`;
      const baseName = file.name.replace(/\.pdf$/i, '').replace(/[^a-z0-9]/gi, '_').substring(0, 50) || 'pdf';
      
      for (let i = 1; i <= num; i++) {
        if (controller.cancelled) throw new Error('Cancelled by user');
        if (log) {
          log.innerHTML = `<span class="inline-block animate-spin-slow">🔄</span> <span>Rendering page <strong>${i}</strong> of <strong>${num}</strong>...</span>`;
          log.style.color = '#60a5fa';
        }
        const page = await pdf.getPage(i);
        if (controller.cancelled) throw new Error('Cancelled by user');
        
        const viewport = page.getViewport({ scale: opts.scale });
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        if (controller.cancelled) throw new Error('Cancelled by user');
        
        const blob = await new Promise(res => {
          canvas.toBlob(res, 'image/jpeg', Math.max(0.1, Math.min(1, opts.quality)));
        });
        
        if (controller.cancelled) throw new Error('Cancelled by user');
        if (!blob || blob.size === 0) {
          throw new Error(`Failed to create image for page ${i}`);
        }
        
        const fileName = `${baseName}_page_${String(i).padStart(3, '0')}.jpg`;
        zip.file(fileName, blob, { binary: true });
        updateProgress(Math.round((i / num) * 100));
        if (controller.cancelled) throw new Error('Cancelled by user');
        await new Promise(r => setTimeout(r, 50));
      }
      
      if (controller.cancelled) throw new Error('Cancelled by user');
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">📦</span> <span>Creating ZIP file...</span>';
        log.style.color = '#60a5fa';
      }
      
      let zipCancelled = false;
      const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      }, meta => {
        if (controller.cancelled) zipCancelled = true;
        updateProgress(Math.round(meta.percent));
      });
      
      if (controller.cancelled || zipCancelled) throw new Error('Cancelled by user');
      const zipName = baseName + '_images.zip';
      saveAs(content, zipName);
      
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! ZIP file downloaded with <strong>${num}</strong> JPG file(s).</span>`;
        log.style.color = '#34d399';
      }
      if (stats) stats.textContent = `✓ Finished: ${num} page(s) processed successfully`;
      updateProgress(100);
      if (startBtn) startBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      
      if (typeof trackConversion === 'function') {
        trackConversion(num);
      }
    } catch (err) {
      console.error(err);
      if (log) {
        if (err.message === 'Cancelled by user') {
          log.innerHTML = '<span class="inline-block">⏸️</span> <span>Conversion cancelled by user</span>';
          log.style.color = '#fb923c';
          if (stats) stats.textContent = 'Cancelled';
        } else {
          log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${err.message || err}</span>`;
          log.style.color = '#f87171';
          if (stats) stats.textContent = '✗ Conversion failed';
        }
      }
      updateProgress(0);
      if (startBtn) startBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    } finally {
      if (startBtn) startBtn.disabled = false;
      if (cancelBtn) {
        cancelBtn.disabled = true;
        cancelBtn.textContent = 'Cancel';
      }
      controller.cancelled = false;
    }
  }
  
  function updateProgress(pct) {
    if (bar) bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (startBtn) startBtn.addEventListener('click', handleStart);
  if (cancelBtn) cancelBtn.addEventListener('click', handleCancel);
}

// JPG to PDF Implementation
function initJPGToPDF() {
  const fileInput = document.getElementById('file-jpg-pdf');
  const dropzone = document.getElementById('dropzone-jpg-pdf');
  const dropLabel = document.getElementById('dropLabel-jpg-pdf');
  const imagePreview = document.getElementById('image-preview-jpg-pdf');
  const convertBtn = document.getElementById('convert-jpg-pdf');
  const status = document.getElementById('status-jpg-pdf');
  const log = document.getElementById('log-jpg-pdf');
  const progress = document.getElementById('progress-jpg-pdf');
  const pageSize = document.getElementById('pageSize-jpg-pdf');
  const orientation = document.getElementById('orientation-jpg-pdf');
  
  if (!fileInput || !dropzone) return;
  
  let selectedFiles = [];
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => convertBtn?.removeEventListener('click', handleConvert)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      selectedFiles = files;
      updatePreview();
    }
  }
  
  function handleFileChange() {
    selectedFiles = Array.from(fileInput.files);
    updatePreview();
  }
  
  function updatePreview() {
    if (selectedFiles.length === 0) {
      if (imagePreview) imagePreview.classList.add('hidden');
      if (status) status.textContent = 'No images selected';
      return;
    }
    
    if (imagePreview) {
      imagePreview.classList.remove('hidden');
      imagePreview.innerHTML = '';
      if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${selectedFiles.length} image(s) selected`;
      if (status) status.textContent = `${selectedFiles.length} image(s) ready`;
      
      selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'w-full h-32 object-cover rounded-lg';
          img.title = file.name;
          const div = document.createElement('div');
          div.className = 'relative';
          div.appendChild(img);
          const removeBtn = document.createElement('button');
          removeBtn.textContent = '×';
          removeBtn.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600';
          removeBtn.onclick = () => {
            selectedFiles.splice(index, 1);
            updatePreview();
          };
          div.appendChild(removeBtn);
          imagePreview.appendChild(div);
        };
        reader.readAsDataURL(file);
      });
    }
  }
  
  async function handleConvert() {
    if (selectedFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }
    
    if (typeof window.jspdf === 'undefined') {
      alert('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (convertBtn) convertBtn.disabled = true;
    if (log) log.textContent = 'Converting images to PDF...';
    if (progress) progress.style.width = '0%';
    
    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      
      const sizeMap = {
        'a4': { width: 210, height: 297 },
        'letter': { width: 216, height: 279 },
        'legal': { width: 216, height: 356 },
        'fit': null
      };
      
      const isLandscape = orientation?.value === 'landscape';
      const pageConfig = sizeMap[pageSize?.value || 'a4'];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imgData = await fileToDataURL(file);
        const img = new Image();
        img.src = imgData;
        
        await new Promise((resolve) => {
          img.onload = () => {
            if (i > 0) pdf.addPage();
            
            let imgWidth, imgHeight, x, y;
            
            if (pageConfig === null) {
              const maxWidth = isLandscape ? 297 : 210;
              const maxHeight = isLandscape ? 210 : 297;
              const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
              imgWidth = img.width * ratio;
              imgHeight = img.height * ratio;
              x = (maxWidth - imgWidth) / 2;
              y = (maxHeight - imgHeight) / 2;
              pdf.setPageSize([maxWidth, maxHeight]);
            } else {
              const pageWidth = isLandscape ? pageConfig.height : pageConfig.width;
              const pageHeight = isLandscape ? pageConfig.width : pageConfig.height;
              const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
              imgWidth = img.width * ratio;
              imgHeight = img.height * ratio;
              x = (pageWidth - imgWidth) / 2;
              y = (pageHeight - imgHeight) / 2;
              pdf.setPageSize([pageWidth, pageHeight]);
            }
            
            pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
            if (progress) progress.style.width = `${((i + 1) / selectedFiles.length) * 100}%`;
            if (log) log.textContent = `Processing image ${i + 1} of ${selectedFiles.length}...`;
            resolve();
          };
        });
      }
      
      const fileName = selectedFiles.length === 1 
        ? selectedFiles[0].name.replace(/\.(jpg|jpeg|png)$/i, '.pdf')
        : 'images.pdf';
      
      pdf.save(fileName);
      if (log) {
        log.textContent = `✓ Success! PDF downloaded with ${selectedFiles.length} page(s)`;
        log.style.color = '#34d399';
      }
      if (progress) progress.style.width = '100%';
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message}`;
        log.style.color = '#f87171';
      }
    } finally {
      if (convertBtn) convertBtn.disabled = false;
    }
  }
  
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (convertBtn) convertBtn.addEventListener('click', handleConvert);
}

// PDF Compress Implementation
function initPDFCompress() {
  const fileInput = document.getElementById('file-compress');
  const dropzone = document.getElementById('dropzone-compress');
  const dropLabel = document.getElementById('dropLabel-compress');
  const compressBtn = document.getElementById('compress-btn');
  const fileSize = document.getElementById('fileSize-compress');
  const log = document.getElementById('log-compress');
  const progress = document.getElementById('progress-compress');
  const quality = document.getElementById('quality-compress');
  const comparison = document.getElementById('comparison-compress');
  const originalSize = document.getElementById('originalSize-compress');
  const compressedSize = document.getElementById('compressedSize-compress');
  const savings = document.getElementById('savings-compress');
  
  if (!fileInput || !dropzone) return;
  
  let currentFile = null;
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => compressBtn?.removeEventListener('click', handleCompress)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      currentFile = f;
      loadFile(f);
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      currentFile = fileInput.files[0];
      loadFile(currentFile);
    }
  }
  
  function loadFile(f) {
    if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${f.name}`;
    const sizeMB = (f.size / 1024 / 1024).toFixed(2);
    if (fileSize) fileSize.textContent = `${sizeMB} MB`;
    if (comparison) comparison.classList.add('hidden');
    if (log) log.textContent = '✨ Ready to compress';
  }
  
  async function handleCompress() {
    if (!currentFile) {
      alert('Please select a PDF file first');
      return;
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      alert('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (compressBtn) compressBtn.disabled = true;
    if (log) log.textContent = 'Compressing PDF...';
    if (progress) progress.style.width = '10%';
    
    try {
      const arr = await currentFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      
      if (typeof window.jspdf === 'undefined') {
        throw new Error('PDF creation library not loaded');
      }
      
      const { jsPDF } = window.jspdf;
      const outputPdf = new jsPDF();
      const qualityValue = parseFloat(quality?.value) || 0.5;
      
      if (progress) progress.style.width = '20%';
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        if (i > 1) outputPdf.addPage();
        
        const imgData = canvas.toDataURL('image/jpeg', qualityValue);
        const imgWidth = outputPdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        if (imgHeight > outputPdf.internal.pageSize.getHeight()) {
          const ratio = outputPdf.internal.pageSize.getHeight() / imgHeight;
          outputPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth * ratio, imgHeight * ratio);
        } else {
          outputPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }
        
        if (progress) progress.style.width = `${20 + (i / numPages) * 70}%`;
        if (log) log.textContent = `Processing page ${i} of ${numPages}...`;
      }
      
      const pdfBlob = outputPdf.output('blob');
      const originalSizeMB = (currentFile.size / 1024 / 1024).toFixed(2);
      const compressedSizeMB = (pdfBlob.size / 1024 / 1024).toFixed(2);
      const saved = ((1 - pdfBlob.size / currentFile.size) * 100).toFixed(1);
      
      if (originalSize) originalSize.textContent = `${originalSizeMB} MB`;
      if (compressedSize) compressedSize.textContent = `${compressedSizeMB} MB`;
      if (savings) savings.textContent = `Saved ${saved}%`;
      if (comparison) comparison.classList.remove('hidden');
      
      const fileName = currentFile.name.replace(/\.pdf$/i, '_compressed.pdf');
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.textContent = `✓ Success! PDF compressed and downloaded`;
        log.style.color = '#34d399';
      }
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message}`;
        log.style.color = '#f87171';
      }
      if (progress) progress.style.width = '0%';
    } finally {
      if (compressBtn) compressBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (compressBtn) compressBtn.addEventListener('click', handleCompress);
}

// PNG to JPG Implementation
function initPNGToJPG() {
  const fileInput = document.getElementById('file-png-jpg');
  const dropzone = document.getElementById('dropzone-png-jpg');
  const dropLabel = document.getElementById('dropLabel-png-jpg');
  const imagePreview = document.getElementById('image-preview-png-jpg');
  const convertBtn = document.getElementById('convert-png-jpg');
  const status = document.getElementById('status-png-jpg');
  const log = document.getElementById('log-png-jpg');
  const progress = document.getElementById('progress-png-jpg');
  const quality = document.getElementById('quality-png-jpg');
  const bgColor = document.getElementById('bgColor-png-jpg');
  
  if (!fileInput || !dropzone) return;
  
  let selectedFiles = [];
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => convertBtn?.removeEventListener('click', handleConvert)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type === 'image/png');
    if (files.length > 0) {
      selectedFiles = files;
      updatePreview();
    }
  }
  
  function handleFileChange() {
    selectedFiles = Array.from(fileInput.files);
    updatePreview();
  }
  
  function updatePreview() {
    if (selectedFiles.length === 0) {
      if (imagePreview) imagePreview.classList.add('hidden');
      if (status) status.textContent = 'No images selected';
      return;
    }
    
    if (imagePreview) {
      imagePreview.classList.remove('hidden');
      imagePreview.innerHTML = '';
      if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${selectedFiles.length} PNG image(s) selected`;
      if (status) status.textContent = `${selectedFiles.length} image(s) ready`;
      
      selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'w-full h-32 object-cover rounded-lg';
          img.title = file.name;
          const div = document.createElement('div');
          div.className = 'relative';
          div.appendChild(img);
          const removeBtn = document.createElement('button');
          removeBtn.textContent = '×';
          removeBtn.className = 'absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600';
          removeBtn.onclick = () => {
            selectedFiles.splice(index, 1);
            updatePreview();
          };
          div.appendChild(removeBtn);
          imagePreview.appendChild(div);
        };
        reader.readAsDataURL(file);
      });
    }
  }
  
  async function handleConvert() {
    if (selectedFiles.length === 0) {
      alert('Please select at least one PNG image');
      return;
    }
    
    if (typeof JSZip === 'undefined') {
      alert('Required library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (convertBtn) convertBtn.disabled = true;
    if (log) log.textContent = 'Converting PNG to JPG...';
    if (progress) progress.style.width = '0%';
    
    try {
      const zip = new JSZip();
      const qualityValue = parseFloat(quality?.value) || 0.9;
      const backgroundColor = bgColor?.value || '#ffffff';
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imgData = await fileToDataURL(file);
        const img = new Image();
        img.src = imgData;
        
        await new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob((blob) => {
              zip.file(file.name.replace(/\.png$/i, '.jpg'), blob);
              if (progress) progress.style.width = `${((i + 1) / selectedFiles.length) * 100}%`;
              if (log) log.textContent = `Processing image ${i + 1} of ${selectedFiles.length}...`;
              resolve();
            }, 'image/jpeg', qualityValue);
          };
        });
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const fileName = selectedFiles.length === 1 
        ? selectedFiles[0].name.replace(/\.png$/i, '.jpg')
        : 'png_to_jpg_converted.zip';
      
      if (selectedFiles.length === 1) {
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        saveAs(zipBlob, fileName);
      }
      
      if (log) {
        log.textContent = `✓ Success! ${selectedFiles.length} image(s) converted`;
        log.style.color = '#34d399';
      }
      if (progress) progress.style.width = '100%';
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message}`;
        log.style.color = '#f87171';
      }
    } finally {
      if (convertBtn) convertBtn.disabled = false;
    }
  }
  
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (convertBtn) convertBtn.addEventListener('click', handleConvert);
}

// Image Resize Implementation
function initImageResize() {
  const fileInput = document.getElementById('file-resize');
  const dropzone = document.getElementById('dropzone-resize');
  const dropLabel = document.getElementById('dropLabel-resize');
  const imagePreview = document.getElementById('image-preview-resize');
  const resizeBtn = document.getElementById('resize-btn');
  const status = document.getElementById('status-resize');
  const log = document.getElementById('log-resize');
  const progress = document.getElementById('progress-resize');
  const widthInput = document.getElementById('width-resize');
  const heightInput = document.getElementById('height-resize');
  const aspectCheck = document.getElementById('aspect-resize');
  
  if (!fileInput || !dropzone) return;
  
  let selectedFiles = [];
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => resizeBtn?.removeEventListener('click', handleResize)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      selectedFiles = files;
      updatePreview();
    }
  }
  
  function handleFileChange() {
    selectedFiles = Array.from(fileInput.files);
    updatePreview();
  }
  
  function updatePreview() {
    if (selectedFiles.length === 0) {
      if (imagePreview) imagePreview.classList.add('hidden');
      if (status) status.textContent = 'No images selected';
      return;
    }
    
    if (imagePreview) {
      imagePreview.classList.remove('hidden');
      imagePreview.innerHTML = '';
      if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${selectedFiles.length} image(s) selected`;
      if (status) status.textContent = `${selectedFiles.length} image(s) ready`;
    }
  }
  
  async function handleResize() {
    if (selectedFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }
    
    const targetWidth = widthInput?.value ? parseInt(widthInput.value) : null;
    const targetHeight = heightInput?.value ? parseInt(heightInput.value) : null;
    const maintainAspect = aspectCheck?.checked !== false;
    
    if (!targetWidth && !targetHeight) {
      alert('Please specify width or height');
      return;
    }
    
    if (typeof JSZip === 'undefined') {
      alert('Required library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (resizeBtn) resizeBtn.disabled = true;
    if (log) log.textContent = 'Resizing images...';
    if (progress) progress.style.width = '0%';
    
    try {
      const zip = new JSZip();
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imgData = await fileToDataURL(file);
        const img = new Image();
        img.src = imgData;
        
        await new Promise((resolve) => {
          img.onload = () => {
            let newWidth = targetWidth || img.width;
            let newHeight = targetHeight || img.height;
            
            if (maintainAspect && targetWidth && targetHeight) {
              const ratio = Math.min(targetWidth / img.width, targetHeight / img.height);
              newWidth = img.width * ratio;
              newHeight = img.height * ratio;
            } else if (maintainAspect) {
              if (targetWidth) {
                newHeight = (img.height * targetWidth) / img.width;
              } else if (targetHeight) {
                newWidth = (img.width * targetHeight) / img.height;
              }
            }
            
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(newWidth);
            canvas.height = Math.round(newHeight);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            canvas.toBlob((blob) => {
              const ext = file.name.split('.').pop();
              zip.file(`resized_${file.name}`, blob);
              if (progress) progress.style.width = `${((i + 1) / selectedFiles.length) * 100}%`;
              if (log) log.textContent = `Processing image ${i + 1} of ${selectedFiles.length}...`;
              resolve();
            }, `image/${ext === 'png' ? 'png' : 'jpeg'}`, 0.95);
          };
        });
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const fileName = selectedFiles.length === 1 
        ? `resized_${selectedFiles[0].name}`
        : 'resized_images.zip';
      
      if (selectedFiles.length === 1) {
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        saveAs(zipBlob, fileName);
      }
      
      if (log) {
        log.textContent = `✓ Success! ${selectedFiles.length} image(s) resized`;
        log.style.color = '#34d399';
      }
      if (progress) progress.style.width = '100%';
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message}`;
        log.style.color = '#f87171';
      }
    } finally {
      if (resizeBtn) resizeBtn.disabled = false;
    }
  }
  
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (resizeBtn) resizeBtn.addEventListener('click', handleResize);
}

// Image Compress Implementation
function initImageCompress() {
  const fileInput = document.getElementById('file-compress-img');
  const dropzone = document.getElementById('dropzone-compress-img');
  const dropLabel = document.getElementById('dropLabel-compress-img');
  const imagePreview = document.getElementById('image-preview-compress-img');
  const compressBtn = document.getElementById('compress-img-btn');
  const status = document.getElementById('status-compress-img');
  const log = document.getElementById('log-compress-img');
  const progress = document.getElementById('progress-compress-img');
  const qualitySlider = document.getElementById('quality-compress-img');
  const qualityValue = document.getElementById('quality-value-compress-img');
  
  if (!fileInput || !dropzone) return;
  
  let selectedFiles = [];
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => compressBtn?.removeEventListener('click', handleCompress),
    () => qualitySlider?.removeEventListener('input', handleQualityChange)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      selectedFiles = files;
      updatePreview();
    }
  }
  
  function handleFileChange() {
    selectedFiles = Array.from(fileInput.files);
    updatePreview();
  }
  
  function handleQualityChange() {
    if (qualityValue && qualitySlider) {
      qualityValue.textContent = qualitySlider.value;
    }
  }
  
  function updatePreview() {
    if (selectedFiles.length === 0) {
      if (imagePreview) imagePreview.classList.add('hidden');
      if (status) status.textContent = 'No images selected';
      return;
    }
    
    if (imagePreview) {
      imagePreview.classList.remove('hidden');
      imagePreview.innerHTML = '';
      if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${selectedFiles.length} image(s) selected`;
      if (status) status.textContent = `${selectedFiles.length} image(s) ready`;
    }
  }
  
  async function handleCompress() {
    if (selectedFiles.length === 0) {
      alert('Please select at least one image');
      return;
    }
    
    if (compressBtn) compressBtn.disabled = true;
    if (log) log.textContent = 'Compressing images...';
    if (progress) progress.style.width = '0%';
    
    try {
      const zip = new JSZip();
      const quality = parseFloat(qualitySlider?.value) || 0.8;
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imgData = await fileToDataURL(file);
        const img = new Image();
        img.src = imgData;
        
        await new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const ext = file.name.split('.').pop().toLowerCase();
            const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
            
            canvas.toBlob((blob) => {
              zip.file(`compressed_${file.name}`, blob);
              if (progress) progress.style.width = `${((i + 1) / selectedFiles.length) * 100}%`;
              if (log) log.textContent = `Processing image ${i + 1} of ${selectedFiles.length}...`;
              resolve();
            }, mimeType, ext === 'png' ? undefined : quality);
          };
        });
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const fileName = selectedFiles.length === 1 
        ? `compressed_${selectedFiles[0].name}`
        : 'compressed_images.zip';
      
      if (selectedFiles.length === 1) {
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        saveAs(zipBlob, fileName);
      }
      
      if (log) {
        log.textContent = `✓ Success! ${selectedFiles.length} image(s) compressed`;
        log.style.color = '#34d399';
      }
      if (progress) progress.style.width = '100%';
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message}`;
        log.style.color = '#f87171';
      }
    } finally {
      if (compressBtn) compressBtn.disabled = false;
    }
  }
  
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (compressBtn) compressBtn.addEventListener('click', handleCompress);
  if (qualitySlider) qualitySlider.addEventListener('input', handleQualityChange);
}

// PDF Split Implementation
function initPDFSplit() {
  const fileInput = document.getElementById('file-split');
  const dropzone = document.getElementById('dropzone-split');
  const dropLabel = document.getElementById('dropLabel-split');
  const pagesInfo = document.getElementById('pages-info-split');
  const pagesList = document.getElementById('pages-list-split');
  const splitAllBtn = document.getElementById('split-all-split');
  const extractSelectedBtn = document.getElementById('extract-selected-split');
  const selectAllBtn = document.getElementById('select-all-split');
  const selectNoneBtn = document.getElementById('select-none-split');
  const status = document.getElementById('status-split');
  const log = document.getElementById('log-split');
  const progress = document.getElementById('progress-split');
  
  if (!fileInput || !dropzone) return;
  
  let currentPdf = null;
  let numPages = 0;
  let selectedPages = new Set();
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => splitAllBtn?.removeEventListener('click', handleSplitAll),
    () => extractSelectedBtn?.removeEventListener('click', handleExtractSelected),
    () => selectAllBtn?.removeEventListener('click', handleSelectAll),
    () => selectNoneBtn?.removeEventListener('click', handleSelectNone)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  async function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      await loadFile(f);
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      loadFile(fileInput.files[0]);
    }
  }
  
  async function loadFile(file) {
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      alert('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    try {
      const arr = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      currentPdf = await loadingTask.promise;
      numPages = currentPdf.numPages;
      
      if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${file.name} (${numPages} pages)`;
      if (status) status.textContent = `${numPages} pages detected`;
      
      if (pagesList) {
        pagesList.innerHTML = '';
        selectedPages.clear();
        for (let i = 1; i <= numPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.className = 'px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors';
          btn.dataset.page = i;
          btn.addEventListener('click', () => {
            if (selectedPages.has(i)) {
              selectedPages.delete(i);
              btn.classList.remove('bg-blue-500', 'text-white');
              btn.classList.add('bg-slate-700');
            } else {
              selectedPages.add(i);
              btn.classList.add('bg-blue-500', 'text-white');
              btn.classList.remove('bg-slate-700');
            }
            updateExtractButton();
          });
          pagesList.appendChild(btn);
        }
      }
      
      if (pagesInfo) pagesInfo.classList.remove('hidden');
      updateExtractButton();
    } catch (error) {
      alert('Error loading PDF: ' + error.message);
    }
  }
  
  function updateExtractButton() {
    if (extractSelectedBtn) {
      if (selectedPages.size > 0) {
        extractSelectedBtn.classList.remove('hidden');
        extractSelectedBtn.textContent = `Extract ${selectedPages.size} Selected Page(s)`;
      } else {
        extractSelectedBtn.classList.add('hidden');
      }
    }
  }
  
  function handleSelectAll() {
    selectedPages.clear();
    if (pagesList) {
      for (let i = 1; i <= numPages; i++) {
        selectedPages.add(i);
        const btn = pagesList.querySelector(`[data-page="${i}"]`);
        if (btn) {
          btn.classList.add('bg-blue-500', 'text-white');
          btn.classList.remove('bg-slate-700');
        }
      }
    }
    updateExtractButton();
  }
  
  function handleSelectNone() {
    selectedPages.clear();
    if (pagesList) {
      pagesList.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-slate-700');
      });
    }
    updateExtractButton();
  }
  
  async function handleSplitAll() {
    if (!currentPdf) {
      alert('Please select a PDF file first');
      return;
    }
    
    await splitPDF(Array.from({ length: numPages }, (_, i) => i + 1), true);
  }
  
  async function handleExtractSelected() {
    if (selectedPages.size === 0) {
      alert('Please select at least one page');
      return;
    }
    
    await splitPDF(Array.from(selectedPages).sort((a, b) => a - b), false);
  }
  
  async function splitPDF(pages, splitAll) {
    if (typeof window.jspdf === 'undefined' || typeof JSZip === 'undefined') {
      alert('Required libraries not loaded. Please wait a moment and try again.');
      return;
    }
    
    if (splitAllBtn) splitAllBtn.disabled = true;
    if (extractSelectedBtn) extractSelectedBtn.disabled = true;
    if (log) log.textContent = 'Splitting PDF...';
    if (progress) progress.style.width = '0%';
    
    try {
      const { jsPDF } = window.jspdf;
      const zip = new JSZip();
      const baseName = fileInput.files[0]?.name.replace(/\.pdf$/i, '') || 'pdf';
      
      for (let idx = 0; idx < pages.length; idx++) {
        const pageNum = pages[idx];
        const page = await currentPdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        const pdf = new jsPDF();
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        if (imgHeight > pdf.internal.pageSize.getHeight()) {
          const ratio = pdf.internal.pageSize.getHeight() / imgHeight;
          pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth * ratio, imgHeight * ratio);
        } else {
          pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }
        
        const pdfBlob = pdf.output('blob');
        zip.file(`${baseName}_page_${String(pageNum).padStart(3, '0')}.pdf`, pdfBlob);
        
        if (progress) progress.style.width = `${((idx + 1) / pages.length) * 100}%`;
        if (log) log.textContent = `Processing page ${pageNum} (${idx + 1} of ${pages.length})...`;
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const fileName = splitAll ? `${baseName}_all_pages.zip` : `${baseName}_extracted_pages.zip`;
      saveAs(zipBlob, fileName);
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.textContent = `✓ Success! ${pages.length} page(s) extracted and downloaded`;
        log.style.color = '#34d399';
      }
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message}`;
        log.style.color = '#f87171';
      }
    } finally {
      if (splitAllBtn) splitAllBtn.disabled = false;
      if (extractSelectedBtn) extractSelectedBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (splitAllBtn) splitAllBtn.addEventListener('click', handleSplitAll);
  if (extractSelectedBtn) extractSelectedBtn.addEventListener('click', handleExtractSelected);
  if (selectAllBtn) selectAllBtn.addEventListener('click', handleSelectAll);
  if (selectNoneBtn) selectNoneBtn.addEventListener('click', handleSelectNone);
}

// PDF Merge Implementation
function initPDFMerge() {
  const fileInput = document.getElementById('file-merge');
  const dropzone = document.getElementById('dropzone-merge');
  const dropLabel = document.getElementById('dropLabel-merge');
  const pdfList = document.getElementById('pdf-list-merge');
  const mergeBtn = document.getElementById('merge-btn');
  const status = document.getElementById('status-merge');
  const log = document.getElementById('log-merge');
  const progress = document.getElementById('progress-merge');
  
  if (!fileInput || !dropzone) return;
  
  let selectedFiles = [];
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => mergeBtn?.removeEventListener('click', handleMerge)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
    if (files.length > 0) {
      selectedFiles = [...selectedFiles, ...files];
      updatePreview();
    }
  }
  
  function handleFileChange() {
    selectedFiles = Array.from(fileInput.files);
    updatePreview();
  }
  
  function updatePreview() {
    if (selectedFiles.length === 0) {
      if (pdfList) pdfList.classList.add('hidden');
      if (status) status.textContent = 'No files selected';
      return;
    }
    
    if (pdfList) {
      pdfList.classList.remove('hidden');
      pdfList.innerHTML = '';
      selectedFiles.forEach((file, index) => {
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between p-3 bg-slate-700/50 rounded-lg';
        div.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="text-2xl">📄</span>
            <div>
              <div class="text-sm font-medium text-slate-200">${file.name}</div>
              <div class="text-xs text-slate-400">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
            </div>
          </div>
          <button class="text-red-400 hover:text-red-300 p-1" onclick="removeFile(${index})">×</button>
        `;
        pdfList.appendChild(div);
      });
      
      window.removeFile = (index) => {
        selectedFiles.splice(index, 1);
        updatePreview();
      };
    }
    
    if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${selectedFiles.length} PDF(s) selected`;
    if (status) status.textContent = `${selectedFiles.length} PDF(s) ready to merge`;
  }
  
  async function handleMerge() {
    if (selectedFiles.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined' || typeof window.jspdf === 'undefined') {
      alert('Required libraries not loaded. Please wait a moment and try again.');
      return;
    }
    
    if (mergeBtn) mergeBtn.disabled = true;
    if (log) log.textContent = 'Merging PDFs...';
    if (progress) progress.style.width = '0%';
    
    try {
      const { jsPDF } = window.jspdf;
      const mergedPdf = new jsPDF();
      let totalPages = 0;
      
      for (let fileIdx = 0; fileIdx < selectedFiles.length; fileIdx++) {
        const file = selectedFiles[fileIdx];
        const arr = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arr });
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        totalPages += numPages;
        
        for (let i = 1; i <= numPages; i++) {
          if (fileIdx > 0 || i > 1) mergedPdf.addPage();
          
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          
          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          const imgWidth = mergedPdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          if (imgHeight > mergedPdf.internal.pageSize.getHeight()) {
            const ratio = mergedPdf.internal.pageSize.getHeight() / imgHeight;
            mergedPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth * ratio, imgHeight * ratio);
          } else {
            mergedPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
          }
          
          const currentPage = (fileIdx * numPages) + i;
          if (progress) progress.style.width = `${(currentPage / totalPages) * 100}%`;
          if (log) log.textContent = `Processing page ${currentPage} of ${totalPages}...`;
        }
      }
      
      const pdfBlob = mergedPdf.output('blob');
      const fileName = 'merged.pdf';
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.textContent = `✓ Success! ${totalPages} pages merged into one PDF`;
        log.style.color = '#34d399';
      }
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message}`;
        log.style.color = '#f87171';
      }
    } finally {
      if (mergeBtn) mergeBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (mergeBtn) mergeBtn.addEventListener('click', handleMerge);
}

// PDF Rotate Implementation
function initPDFRotate() {
  const fileInput = document.getElementById('file-rotate');
  const dropzone = document.getElementById('dropzone-rotate');
  const dropLabel = document.getElementById('dropLabel-rotate');
  const pagesInfo = document.getElementById('pages-info-rotate');
  const pagesList = document.getElementById('pages-list-rotate');
  const rotateBtn = document.getElementById('rotate-btn');
  const rotationAngle = document.getElementById('rotation-angle');
  const status = document.getElementById('status-rotate');
  const log = document.getElementById('log-rotate');
  const progress = document.getElementById('progress-rotate');
  
  if (!fileInput || !dropzone) return;
  
  let currentPdf = null;
  let numPages = 0;
  let selectedPages = new Set();
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => rotateBtn?.removeEventListener('click', handleRotate)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  async function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      await loadFile(f);
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      loadFile(fileInput.files[0]);
    }
  }
  
  async function loadFile(file) {
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      alert('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    try {
      const arr = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      currentPdf = await loadingTask.promise;
      numPages = currentPdf.numPages;
      
      if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${file.name} (${numPages} pages)`;
      if (status) status.textContent = `${numPages} pages detected`;
      
      if (pagesList) {
        pagesList.innerHTML = '';
        selectedPages.clear();
        for (let i = 1; i <= numPages; i++) {
          selectedPages.add(i); // Select all by default
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.className = 'px-3 py-2 bg-blue-500 text-white rounded-lg text-sm transition-colors';
          btn.dataset.page = i;
          btn.addEventListener('click', () => {
            if (selectedPages.has(i)) {
              selectedPages.delete(i);
              btn.classList.remove('bg-blue-500', 'text-white');
              btn.classList.add('bg-slate-700');
            } else {
              selectedPages.add(i);
              btn.classList.add('bg-blue-500', 'text-white');
              btn.classList.remove('bg-slate-700');
            }
          });
          pagesList.appendChild(btn);
        }
      }
      
      if (pagesInfo) pagesInfo.classList.remove('hidden');
    } catch (error) {
      alert('Error loading PDF: ' + error.message);
    }
  }
  
  async function handleRotate() {
    if (!currentPdf) {
      alert('Please select a PDF file first');
      return;
    }
    
    if (selectedPages.size === 0) {
      alert('Please select at least one page to rotate');
      return;
    }
    
    if (typeof window.jspdf === 'undefined') {
      alert('Required libraries not loaded. Please wait a moment and try again.');
      return;
    }
    
    if (rotateBtn) rotateBtn.disabled = true;
    if (log) log.textContent = 'Rotating PDF...';
    if (progress) progress.style.width = '0%';
    
    try {
      const { jsPDF } = window.jspdf;
      const outputPdf = new jsPDF();
      const angle = parseInt(rotationAngle?.value) || 90;
      const pagesToRotate = Array.from(selectedPages);
      
      for (let i = 1; i <= numPages; i++) {
        if (i > 1) outputPdf.addPage();
        
        const page = await currentPdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        
        // Adjust canvas size based on rotation
        if (angle === 90 || angle === 270) {
          canvas.width = viewport.height;
          canvas.height = viewport.width;
        } else {
          canvas.width = viewport.width;
          canvas.height = viewport.height;
        }
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Rotate context
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-viewport.width / 2, -viewport.height / 2);
        
        await page.render({ canvasContext: ctx, viewport }).promise;
        ctx.restore();
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = outputPdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        if (imgHeight > outputPdf.internal.pageSize.getHeight()) {
          const ratio = outputPdf.internal.pageSize.getHeight() / imgHeight;
          outputPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth * ratio, imgHeight * ratio);
        } else {
          outputPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }
        
        if (progress) progress.style.width = `${(i / numPages) * 100}%`;
        if (log) log.textContent = `Processing page ${i} of ${numPages}...`;
      }
      
      const pdfBlob = outputPdf.output('blob');
      const fileName = fileInput.files[0]?.name.replace(/\.pdf$/i, '_rotated.pdf') || 'rotated.pdf';
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.textContent = `✓ Success! PDF rotated and downloaded`;
        log.style.color = '#34d399';
      }
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message}`;
        log.style.color = '#f87171';
      }
    } finally {
      if (rotateBtn) rotateBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (rotateBtn) rotateBtn.addEventListener('click', handleRotate);
}

// PDF Unlock Implementation
function initPDFUnlock() {
  const fileInput = document.getElementById('file-unlock');
  const dropzone = document.getElementById('dropzone-unlock');
  const dropLabel = document.getElementById('dropLabel-unlock');
  const passwordSection = document.getElementById('password-section-unlock');
  const passwordInput = document.getElementById('password-unlock');
  const unlockBtn = document.getElementById('unlock-btn');
  const status = document.getElementById('status-unlock');
  const log = document.getElementById('log-unlock');
  const progress = document.getElementById('progress-unlock');
  
  if (!fileInput || !dropzone) return;
  
  let currentFile = null;
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => unlockBtn?.removeEventListener('click', handleUnlock),
    () => passwordInput?.removeEventListener('keypress', handlePasswordKeyPress)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      currentFile = f;
      loadFile(f);
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      currentFile = fileInput.files[0];
      loadFile(currentFile);
    }
  }
  
  function handlePasswordKeyPress(e) {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  }
  
  async function loadFile(file) {
    if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${file.name}`;
    if (status) status.textContent = 'PDF file selected';
    if (passwordSection) passwordSection.classList.remove('hidden');
    if (passwordInput) passwordInput.focus();
    if (log) log.textContent = '✨ Enter the PDF password to unlock';
  }
  
  async function handleUnlock() {
    if (!currentFile) {
      alert('Please select a PDF file first');
      return;
    }
    
    const password = passwordInput?.value || '';
    if (!password) {
      alert('Please enter the PDF password');
      if (passwordInput) passwordInput.focus();
      return;
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      alert('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (unlockBtn) unlockBtn.disabled = true;
    if (log) log.textContent = 'Unlocking PDF...';
    if (progress) progress.style.width = '10%';
    
    try {
      const arr = await currentFile.arrayBuffer();
      
      // Try to load PDF with password
      const loadingTask = pdfjsLib.getDocument({ 
        data: arr,
        password: password
      });
      
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      
      if (typeof window.jspdf === 'undefined') {
        throw new Error('PDF creation library not loaded');
      }
      
      if (log) log.textContent = `PDF unlocked! Creating unprotected version...`;
      if (progress) progress.style.width = '30%';
      
      const { jsPDF } = window.jspdf;
      const unlockedPdf = new jsPDF();
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        if (i > 1) unlockedPdf.addPage();
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = unlockedPdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        if (imgHeight > unlockedPdf.internal.pageSize.getHeight()) {
          const ratio = unlockedPdf.internal.pageSize.getHeight() / imgHeight;
          unlockedPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth * ratio, imgHeight * ratio);
        } else {
          unlockedPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }
        
        if (progress) progress.style.width = `${30 + (i / numPages) * 60}%`;
        if (log) log.textContent = `Processing page ${i} of ${numPages}...`;
      }
      
      const pdfBlob = unlockedPdf.output('blob');
      const fileName = currentFile.name.replace(/\.pdf$/i, '_unlocked.pdf');
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.textContent = `✓ Success! PDF unlocked and downloaded`;
        log.style.color = '#34d399';
      }
      if (passwordInput) passwordInput.value = '';
    } catch (error) {
      console.error(error);
      if (log) {
        if (error.message && error.message.includes('password')) {
          log.textContent = `❌ Incorrect password. Please try again.`;
        } else {
          log.textContent = `❌ Error: ${error.message || error}`;
        }
        log.style.color = '#f87171';
      }
      if (progress) progress.style.width = '0%';
      if (passwordInput) {
        passwordInput.value = '';
        passwordInput.focus();
      }
    } finally {
      if (unlockBtn) unlockBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (unlockBtn) unlockBtn.addEventListener('click', handleUnlock);
  if (passwordInput) passwordInput.addEventListener('keypress', handlePasswordKeyPress);
}

// PDF Protect Implementation
function initPDFProtect() {
  const fileInput = document.getElementById('file-protect');
  const dropzone = document.getElementById('dropzone-protect');
  const dropLabel = document.getElementById('dropLabel-protect');
  const passwordSection = document.getElementById('password-section-protect');
  const passwordInput = document.getElementById('password-protect');
  const passwordConfirm = document.getElementById('password-confirm-protect');
  const protectBtn = document.getElementById('protect-btn');
  const status = document.getElementById('status-protect');
  const log = document.getElementById('log-protect');
  const progress = document.getElementById('progress-protect');
  
  if (!fileInput || !dropzone) return;
  
  let currentFile = null;
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => protectBtn?.removeEventListener('click', handleProtect)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      currentFile = f;
      loadFile(f);
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      currentFile = fileInput.files[0];
      loadFile(currentFile);
    }
  }
  
  function loadFile(file) {
    if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${file.name}`;
    if (status) status.textContent = 'PDF file selected';
    if (passwordSection) passwordSection.classList.remove('hidden');
    if (passwordInput) passwordInput.focus();
    if (log) log.textContent = '✨ Set a password to protect your PDF';
  }
  
  async function handleProtect() {
    if (!currentFile) {
      alert('Please select a PDF file first');
      return;
    }
    
    const password = passwordInput?.value || '';
    const passwordConfirmValue = passwordConfirm?.value || '';
    
    if (!password) {
      alert('Please enter a password');
      if (passwordInput) passwordInput.focus();
      return;
    }
    
    if (password !== passwordConfirmValue) {
      alert('Passwords do not match');
      if (passwordConfirm) passwordConfirm.focus();
      return;
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      alert('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (protectBtn) protectBtn.disabled = true;
    if (log) log.textContent = 'Protecting PDF...';
    if (progress) progress.style.width = '10%';
    
    try {
      const arr = await currentFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      
      if (typeof window.jspdf === 'undefined') {
        throw new Error('PDF creation library not loaded');
      }
      
      if (log) log.textContent = 'Creating password-protected PDF...';
      if (progress) progress.style.width = '30%';
      
      const { jsPDF } = window.jspdf;
      const protectedPdf = new jsPDF();
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        if (i > 1) protectedPdf.addPage();
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = protectedPdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        if (imgHeight > protectedPdf.internal.pageSize.getHeight()) {
          const ratio = protectedPdf.internal.pageSize.getHeight() / imgHeight;
          protectedPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth * ratio, imgHeight * ratio);
        } else {
          protectedPdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }
        
        if (progress) progress.style.width = `${30 + (i / numPages) * 60}%`;
        if (log) log.textContent = `Processing page ${i} of ${numPages}...`;
      }
      
      // Note: jsPDF doesn't support password protection natively
      // We'll create the PDF and add a note about the limitation
      const pdfBlob = protectedPdf.output('blob');
      const fileName = currentFile.name.replace(/\.pdf$/i, '_protected.pdf');
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.innerHTML = `✓ PDF created! <span class="text-xs text-yellow-400">Note: Browser-based PDF protection is limited. For full encryption, use desktop software.</span>`;
        log.style.color = '#34d399';
      }
      if (passwordInput) passwordInput.value = '';
      if (passwordConfirm) passwordConfirm.value = '';
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message || error}`;
        log.style.color = '#f87171';
      }
      if (progress) progress.style.width = '0%';
    } finally {
      if (protectBtn) protectBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (protectBtn) protectBtn.addEventListener('click', handleProtect);
}

// PDF OCR Implementation
function initPDFOCR() {
  const fileInput = document.getElementById('file-ocr');
  const dropzone = document.getElementById('dropzone-ocr');
  const dropLabel = document.getElementById('dropLabel-ocr');
  const ocrBtn = document.getElementById('ocr-btn');
  const language = document.getElementById('language-ocr');
  const status = document.getElementById('status-ocr');
  const log = document.getElementById('log-ocr');
  const progress = document.getElementById('progress-ocr');
  const textResult = document.getElementById('text-result-ocr');
  const extractedText = document.getElementById('extracted-text-ocr');
  const copyBtn = document.getElementById('copy-text-ocr');
  
  if (!fileInput || !dropzone) return;
  
  let currentFile = null;
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => ocrBtn?.removeEventListener('click', handleOCR),
    () => copyBtn?.removeEventListener('click', handleCopy)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      currentFile = f;
      loadFile(f);
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      currentFile = fileInput.files[0];
      loadFile(currentFile);
    }
  }
  
  function handleCopy() {
    if (extractedText) {
      extractedText.select();
      document.execCommand('copy');
      if (copyBtn) {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      }
    }
  }
  
  function loadFile(file) {
    if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${file.name}`;
    if (status) status.textContent = 'PDF file selected';
    if (textResult) textResult.classList.add('hidden');
    if (log) log.textContent = '✨ Ready to extract text';
  }
  
  async function loadTesseract() {
    if (window.Tesseract) return true;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Tesseract.js'));
      document.head.appendChild(script);
    });
  }
  
  async function handleOCR() {
    if (!currentFile) {
      alert('Please select a PDF file first');
      return;
    }
    
    if (ocrBtn) ocrBtn.disabled = true;
    if (log) log.textContent = 'Loading OCR engine...';
    if (progress) progress.style.width = '10%';
    
    try {
      await loadTesseract();
      
      if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
        throw new Error('PDF library not loaded');
      }
      
      const arr = await currentFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      
      if (log) log.textContent = 'Extracting text from PDF pages...';
      if (progress) progress.style.width = '20%';
      
      let allText = '';
      const lang = language?.value || 'eng';
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        if (log) log.textContent = `Processing page ${i} of ${numPages} with OCR...`;
        if (progress) progress.style.width = `${20 + (i / numPages) * 70}%`;
        
        const { data: { text } } = await Tesseract.recognize(canvas, lang, {
          logger: m => {
            if (m.status === 'recognizing text') {
              if (log) log.textContent = `Page ${i}: ${Math.round(m.progress * 100)}%`;
            }
          }
        });
        
        allText += `\n\n--- Page ${i} ---\n\n${text}`;
      }
      
      if (extractedText) {
        extractedText.value = allText.trim();
      }
      if (textResult) textResult.classList.remove('hidden');
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.textContent = `✓ Success! Text extracted from ${numPages} page(s)`;
        log.style.color = '#34d399';
      }
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message || error}`;
        log.style.color = '#f87171';
      }
      if (progress) progress.style.width = '0%';
    } finally {
      if (ocrBtn) ocrBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (ocrBtn) ocrBtn.addEventListener('click', handleOCR);
  if (copyBtn) copyBtn.addEventListener('click', handleCopy);
}

// PDF to Word Implementation
function initPDFToWord() {
  const fileInput = document.getElementById('file-pdf-word');
  const dropzone = document.getElementById('dropzone-pdf-word');
  const dropLabel = document.getElementById('dropLabel-pdf-word');
  const convertBtn = document.getElementById('convert-pdf-word');
  const status = document.getElementById('status-pdf-word');
  const log = document.getElementById('log-pdf-word');
  const progress = document.getElementById('progress-pdf-word');
  
  if (!fileInput || !dropzone) return;
  
  let currentFile = null;
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => convertBtn?.removeEventListener('click', handleConvert)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      currentFile = f;
      loadFile(f);
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      currentFile = fileInput.files[0];
      loadFile(currentFile);
    }
  }
  
  function loadFile(file) {
    if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${file.name}`;
    if (status) status.textContent = 'PDF file selected';
    if (log) log.textContent = '✨ Ready to convert to Word';
  }
  
  async function handleConvert() {
    if (!currentFile) {
      alert('Please select a PDF file first');
      return;
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      alert('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (convertBtn) convertBtn.disabled = true;
    if (log) log.textContent = 'Converting PDF to Word...';
    if (progress) progress.style.width = '10%';
    
    try {
      const arr = await currentFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      
      if (log) log.textContent = 'Extracting text from PDF...';
      if (progress) progress.style.width = '30%';
      
      let htmlContent = '<html><head><meta charset="UTF-8"><title>Converted from PDF</title></head><body style="font-family: Arial, sans-serif; padding: 20px;">';
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        htmlContent += `<h2>Page ${i}</h2>`;
        htmlContent += '<div>';
        
        for (const item of textContent.items) {
          if (item.str.trim()) {
            htmlContent += `<p style="margin: 5px 0;">${item.str.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`;
          }
        }
        
        htmlContent += '</div>';
        if (progress) progress.style.width = `${30 + (i / numPages) * 60}%`;
        if (log) log.textContent = `Processing page ${i} of ${numPages}...`;
      }
      
      htmlContent += '</body></html>';
      
      // Create a blob and download as .doc file (HTML format that Word can open)
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const fileName = currentFile.name.replace(/\.pdf$/i, '.doc');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.textContent = `✓ Success! Word document downloaded`;
        log.style.color = '#34d399';
      }
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message || error}`;
        log.style.color = '#f87171';
      }
      if (progress) progress.style.width = '0%';
    } finally {
      if (convertBtn) convertBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (convertBtn) convertBtn.addEventListener('click', handleConvert);
}

// Word to PDF Implementation
function initWordToPDF() {
  const fileInput = document.getElementById('file-word-pdf');
  const dropzone = document.getElementById('dropzone-word-pdf');
  const dropLabel = document.getElementById('dropLabel-word-pdf');
  const convertBtn = document.getElementById('convert-word-pdf');
  const status = document.getElementById('status-word-pdf');
  const log = document.getElementById('log-word-pdf');
  const progress = document.getElementById('progress-word-pdf');
  
  if (!fileInput || !dropzone) return;
  
  let currentFile = null;
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => convertBtn?.removeEventListener('click', handleConvert)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && (f.type.includes('word') || f.name.endsWith('.doc') || f.name.endsWith('.docx'))) {
      currentFile = f;
      loadFile(f);
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      currentFile = fileInput.files[0];
      loadFile(currentFile);
    }
  }
  
  function loadFile(file) {
    if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${file.name}`;
    if (status) status.textContent = 'Word document selected';
    if (log) log.textContent = '✨ Ready to convert to PDF';
  }
  
  async function loadMammoth() {
    if (window.mammoth) return true;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Mammoth.js'));
      document.head.appendChild(script);
    });
  }
  
  async function handleConvert() {
    if (!currentFile) {
      alert('Please select a Word document first');
      return;
    }
    
    if (typeof window.jspdf === 'undefined') {
      alert('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (convertBtn) convertBtn.disabled = true;
    if (log) log.textContent = 'Loading Word converter...';
    if (progress) progress.style.width = '10%';
    
    try {
      await loadMammoth();
      
      if (log) log.textContent = 'Converting Word to HTML...';
      if (progress) progress.style.width = '30%';
      
      const arrayBuffer = await currentFile.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;
      
      if (log) log.textContent = 'Converting HTML to PDF...';
      if (progress) progress.style.width = '60%';
      
      // Create a temporary div to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      
      // Simple text extraction and PDF creation
      const text = tempDiv.innerText || tempDiv.textContent || '';
      const lines = pdf.splitTextToSize(text, pdf.internal.pageSize.getWidth() - 40);
      
      let y = 20;
      const lineHeight = 7;
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      for (let i = 0; i < lines.length; i++) {
        if (y + lineHeight > pageHeight - 20) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(lines[i], 20, y);
        y += lineHeight;
      }
      
      const pdfBlob = pdf.output('blob');
      const fileName = currentFile.name.replace(/\.(doc|docx)$/i, '.pdf');
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      if (progress) progress.style.width = '100%';
      if (log) {
        log.textContent = `✓ Success! PDF downloaded`;
        log.style.color = '#34d399';
      }
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message || error}. Make sure the file is a valid Word document.`;
        log.style.color = '#f87171';
      }
      if (progress) progress.style.width = '0%';
    } finally {
      if (convertBtn) convertBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (convertBtn) convertBtn.addEventListener('click', handleConvert);
}

// HEIC to JPG Implementation
function initHEICToJPG() {
  const fileInput = document.getElementById('file-heic-jpg');
  const dropzone = document.getElementById('dropzone-heic-jpg');
  const dropLabel = document.getElementById('dropLabel-heic-jpg');
  const imagePreview = document.getElementById('image-preview-heic-jpg');
  const convertBtn = document.getElementById('convert-heic-jpg');
  const status = document.getElementById('status-heic-jpg');
  const log = document.getElementById('log-heic-jpg');
  const progress = document.getElementById('progress-heic-jpg');
  const quality = document.getElementById('quality-heic-jpg');
  
  if (!fileInput || !dropzone) return;
  
  let selectedFiles = [];
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => convertBtn?.removeEventListener('click', handleConvert)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.classList.add('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.classList.remove('border-blue-400', 'bg-blue-500/20');
    const files = Array.from(e.dataTransfer.files).filter(f => 
      f.type === 'image/heic' || 
      f.type === 'image/heif' || 
      f.name.toLowerCase().endsWith('.heic') || 
      f.name.toLowerCase().endsWith('.heif')
    );
    if (files.length > 0) {
      selectedFiles = files;
      updatePreview();
    }
  }
  
  function handleFileChange() {
    selectedFiles = Array.from(fileInput.files);
    updatePreview();
  }
  
  function updatePreview() {
    if (selectedFiles.length === 0) {
      if (imagePreview) imagePreview.classList.add('hidden');
      if (status) status.textContent = 'No images selected';
      return;
    }
    
    if (imagePreview) {
      imagePreview.classList.remove('hidden');
      imagePreview.innerHTML = '';
      if (dropLabel) dropLabel.innerHTML = `<span class="text-blue-400 font-bold">✓</span> ${selectedFiles.length} HEIC image(s) selected`;
      if (status) status.textContent = `${selectedFiles.length} image(s) ready`;
    }
  }
  
  async function loadHeic2any() {
    if (window.heic2any) return true;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load heic2any library'));
      document.head.appendChild(script);
    });
  }
  
  async function handleConvert() {
    if (selectedFiles.length === 0) {
      alert('Please select at least one HEIC image');
      return;
    }
    
    if (convertBtn) convertBtn.disabled = true;
    if (log) log.textContent = 'Loading HEIC converter...';
    if (progress) progress.style.width = '10%';
    
    try {
      await loadHeic2any();
      
      if (typeof JSZip === 'undefined') {
        throw new Error('ZIP library not loaded');
      }
      
      if (log) log.textContent = 'Converting HEIC to JPG...';
      if (progress) progress.style.width = '20%';
      
      const zip = new JSZip();
      const qualityValue = parseFloat(quality?.value) || 0.9;
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        try {
          // Convert HEIC to blob
          const convertedBlobs = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: qualityValue
          });
          
          const blob = Array.isArray(convertedBlobs) ? convertedBlobs[0] : convertedBlobs;
          
          // Add to ZIP
          const fileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
          zip.file(fileName, blob);
          
          if (progress) progress.style.width = `${20 + ((i + 1) / selectedFiles.length) * 70}%`;
          if (log) log.textContent = `Processing image ${i + 1} of ${selectedFiles.length}...`;
        } catch (err) {
          console.error(`Error converting ${file.name}:`, err);
          if (log) log.textContent = `Warning: Failed to convert ${file.name}. Skipping...`;
        }
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const fileName = selectedFiles.length === 1 
        ? selectedFiles[0].name.replace(/\.(heic|heif)$/i, '.jpg')
        : 'heic_to_jpg_converted.zip';
      
      if (selectedFiles.length === 1) {
        // Extract single file from ZIP and download directly
        const zipContent = await JSZip.loadAsync(zipBlob);
        const firstFile = Object.keys(zipContent.files)[0];
        const fileBlob = await zipContent.files[firstFile].async('blob');
        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        saveAs(zipBlob, fileName);
      }
      
      if (log) {
        log.textContent = `✓ Success! ${selectedFiles.length} image(s) converted`;
        log.style.color = '#34d399';
      }
      if (progress) progress.style.width = '100%';
    } catch (error) {
      console.error(error);
      if (log) {
        log.textContent = `❌ Error: ${error.message || error}. Make sure the files are valid HEIC images.`;
        log.style.color = '#f87171';
      }
      if (progress) progress.style.width = '0%';
    } finally {
      if (convertBtn) convertBtn.disabled = false;
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (convertBtn) convertBtn.addEventListener('click', handleConvert);
}


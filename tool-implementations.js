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
    case 'pdf-ocr':
      initPDFOCR();
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
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
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
      toastr.error('Please select a PDF file');
      return;
    }
    currentFile = f;
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${f.name}`;
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
      toastr.warning('Choose a PDF first');
      return;
    }
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      toastr.info('PDF.js library is still loading. Please wait a moment and try again.');
      return;
    }
    controller.cancelled = false;
    
    // Enable cancel button
    if (cancelBtn) {
      cancelBtn.disabled = false;
      cancelBtn.removeAttribute('disabled');
    }
    
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
  
  function handleCancel(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Cancel button clicked, controller.cancelled:', controller.cancelled);
    if (controller.cancelled) return;
    controller.cancelled = true;
    if (log) {
      log.innerHTML = '<span class="inline-block animate-pulse">⏸️</span> <span>Cancelling... Please wait...</span>';
      log.style.color = '#fb923c';
    }
    const cancelButton = document.getElementById('cancel-pdf-jpg');
    if (cancelButton) {
      cancelButton.disabled = true;
      cancelButton.textContent = 'Cancelling...';
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
      
      // Show success toastr notification
      toastr.success(`Successfully converted ${num} page(s) to JPG!`, 'Conversion Complete', {
        timeOut: 5000
      });
      
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
      
      // Clear and reset the form after a short delay
      setTimeout(() => {
        // Clear file input
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Reset dropzone
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        
        // Reset dropzone label
        if (dropLabel) {
          dropLabel.innerHTML = 'Drag & drop your PDF here';
        }
        
        // Reset stats
        if (stats) {
          stats.textContent = 'No file selected';
        }
        
        // Reset progress bar
        updateProgress(0);
        
        // Reset log message
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your PDF files';
          log.style.color = '';
        }
        
        // Clear current file
        currentFile = null;
      }, 2000);
    } catch (err) {
      // Don't log cancellation as an error
      if (err.message !== 'Cancelled by user') {
        console.error(err);
      }
      if (log) {
        if (err.message === 'Cancelled by user') {
          log.innerHTML = '<span class="inline-block">⏸️</span> <span>Conversion cancelled by user</span>';
          log.style.color = '#fb923c';
          if (stats) stats.textContent = 'Cancelled';
          toastr.info('Conversion cancelled successfully');
        } else {
          log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${err.message || err}</span>`;
          log.style.color = '#f87171';
          if (stats) stats.textContent = '✗ Conversion failed';
          toastr.error(`Conversion failed: ${err.message || err}`);
        }
      }
      updateProgress(0);
      if (startBtn) startBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    } finally {
      if (startBtn) {
        startBtn.disabled = false;
      }
      if (cancelBtn) {
        cancelBtn.disabled = true;
        cancelBtn.setAttribute('disabled', 'disabled');
        cancelBtn.textContent = 'Cancel';
      }
      controller.cancelled = false;
    }
  }
  
  function updateProgress(pct) {
    if (bar) {
      const percent = Math.min(100, Math.max(0, pct));
      bar.style.width = percent + '%';
      bar.setAttribute('aria-valuenow', percent);
      // Ensure progress bar has color class (should already have bg-gradient-primary from HTML, but ensure it's there)
      if (!bar.classList.contains('bg-gradient-primary') && !bar.classList.contains('bg-primary')) {
        bar.classList.add('bg-gradient-primary');
      }
      // Make sure progress bar is visible
      bar.style.display = 'block';
      bar.style.opacity = '1';
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  // Label automatically handles click - no need for explicit handler (prevents double trigger)
  fileInput.addEventListener('change', handleFileChange);
  if (startBtn) {
    startBtn.addEventListener('click', handleStart);
  }
  
  // Setup cancel button
  if (cancelBtn) {
    cancelBtn.disabled = true;
    cancelBtn.addEventListener('click', handleCancel);
  }
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
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      selectedFiles = files;
      updatePreview();
    }
  }
  
  function handleFileChange() {
    selectedFiles = Array.from(fileInput.files).filter(f => f.type.startsWith('image/'));
    updatePreview();
  }
  
  function updatePreview() {
    if (selectedFiles.length === 0) {
      if (imagePreview) imagePreview.classList.add('d-none');
      if (dropLabel) dropLabel.textContent = 'Drag & drop your images here';
      if (status) status.textContent = 'No images selected';
      return;
    }
    
    if (imagePreview) {
      imagePreview.classList.remove('d-none');
      imagePreview.innerHTML = '';
      if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${selectedFiles.length} image(s) selected - Will be combined into 1 PDF`;
      if (status) status.textContent = `${selectedFiles.length} image(s) ready - Will create 1 PDF with ${selectedFiles.length} page(s)`;
      
      selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const col = document.createElement('div');
          col.className = 'col-6 col-md-4 col-lg-3';
          
          const card = document.createElement('div');
          card.className = 'card border-0 shadow-sm position-relative';
          card.style.backgroundColor = 'rgba(30, 41, 59, 0.6)';
          
          const img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'card-img-top';
          img.style.height = '150px';
          img.style.objectFit = 'cover';
          img.title = file.name;
          
          const cardBody = document.createElement('div');
          cardBody.className = 'card-body p-2';
          
          const fileName = document.createElement('small');
          fileName.className = 'text-secondary text-truncate d-block';
          fileName.textContent = file.name;
          fileName.style.fontSize = '0.75rem';
          
          const removeBtn = document.createElement('button');
          removeBtn.innerHTML = '×';
          removeBtn.className = 'btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle';
          removeBtn.style.width = '30px';
          removeBtn.style.height = '30px';
          removeBtn.style.padding = '0';
          removeBtn.style.fontSize = '1.2rem';
          removeBtn.style.lineHeight = '1';
          removeBtn.onclick = () => {
            selectedFiles.splice(index, 1);
            updatePreview();
            // Update file input
            const dt = new DataTransfer();
            selectedFiles.forEach(f => dt.items.add(f));
            fileInput.files = dt.files;
          };
          
          cardBody.appendChild(fileName);
          card.appendChild(img);
          card.appendChild(cardBody);
          card.appendChild(removeBtn);
          col.appendChild(card);
          imagePreview.appendChild(col);
        };
        reader.readAsDataURL(file);
      });
    }
  }
  
  async function handleConvert() {
    if (selectedFiles.length === 0) {
      toastr.error('Please select at least one image');
      return;
    }
    
    // Check for jsPDF library - it's loaded as jspdf.umd.min.js which exposes window.jspdf
    if (typeof window.jspdf === 'undefined') {
      toastr.info('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (convertBtn) {
      convertBtn.disabled = true;
      convertBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Converting images to PDF...</span>';
      log.style.color = '#60a5fa';
    }
    if (progress) {
      progress.style.width = '0%';
      progress.setAttribute('aria-valuenow', '0');
    }
    
    try {
      const { jsPDF } = window.jspdf;
      
      const sizeMap = {
        'a4': { width: 210, height: 297, format: 'a4' },
        'letter': { width: 216, height: 279, format: 'letter' },
        'legal': { width: 216, height: 356, format: 'legal' },
        'fit': null
      };
      
      const isLandscape = orientation?.value === 'landscape';
      const pageConfig = sizeMap[pageSize?.value || 'a4'];
      
      // Determine page size and create PDF
      let pdf;
      let pageWidth, pageHeight;
      
      if (pageConfig === null) {
        // Fit to image - need to load first image to determine size
        const firstFile = selectedFiles[0];
        const firstImgData = await fileToDataURL(firstFile);
        const firstImg = new Image();
        await new Promise((resolve, reject) => {
          firstImg.onload = resolve;
          firstImg.onerror = () => reject(new Error(`Failed to load image: ${firstFile.name}`));
          firstImg.src = firstImgData;
        });
        
        // Convert pixels to mm (assuming 96 DPI: 1 pixel ≈ 0.2646 mm)
        // Or use 300 DPI for print quality: 1 pixel ≈ 0.0847 mm
        // We'll use 96 DPI for screen/standard use
        const pixelsToMm = 25.4 / 96; // 25.4 mm per inch / 96 pixels per inch
        
        // Calculate page size in mm based on image dimensions
        let imgWidthMm = firstImg.width * pixelsToMm;
        let imgHeightMm = firstImg.height * pixelsToMm;
        
        // Limit to reasonable PDF page sizes (max A4 landscape: 297x210mm)
        const maxWidth = 297;
        const maxHeight = 297;
        if (imgWidthMm > maxWidth || imgHeightMm > maxHeight) {
          const scale = Math.min(maxWidth / imgWidthMm, maxHeight / imgHeightMm);
          imgWidthMm *= scale;
          imgHeightMm *= scale;
        }
        
        pageWidth = isLandscape ? Math.max(imgWidthMm, imgHeightMm) : imgWidthMm;
        pageHeight = isLandscape ? Math.min(imgWidthMm, imgHeightMm) : imgHeightMm;
        
        // Ensure minimum size
        pageWidth = Math.max(pageWidth, 50);
        pageHeight = Math.max(pageHeight, 50);
        
        // Create PDF with custom size
        pdf = new jsPDF({
          unit: 'mm',
          format: [pageWidth, pageHeight],
          orientation: isLandscape ? 'landscape' : 'portrait'
        });
      } else {
        // Use specified page size
        pageWidth = isLandscape ? pageConfig.height : pageConfig.width;
        pageHeight = isLandscape ? pageConfig.width : pageConfig.height;
        
        // Create PDF with specified format
        pdf = new jsPDF({
          unit: 'mm',
          format: pageConfig.format,
          orientation: isLandscape ? 'landscape' : 'portrait'
        });
      }
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const imgData = await fileToDataURL(file);
        const img = new Image();
        img.src = imgData;
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            try {
              if (i > 0) {
                pdf.addPage();
              }
              
              // Convert image pixels to mm for consistent units
              // Using 96 DPI conversion: 1 pixel ≈ 0.2646 mm
              const pixelsToMm = 25.4 / 96;
              const imgWidthMm = img.width * pixelsToMm;
              const imgHeightMm = img.height * pixelsToMm;
              
              // Calculate scaling ratio to fit image on page while maintaining aspect ratio
              const ratio = Math.min(pageWidth / imgWidthMm, pageHeight / imgHeightMm);
              const imgWidth = imgWidthMm * ratio;
              const imgHeight = imgHeightMm * ratio;
              const x = (pageWidth - imgWidth) / 2;
              const y = (pageHeight - imgHeight) / 2;
              
              // Determine image format
              let imgFormat = 'JPEG';
              if (file.type === 'image/png') {
                imgFormat = 'PNG';
              } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                imgFormat = 'JPEG';
              }
              
              pdf.addImage(imgData, imgFormat, x, y, imgWidth, imgHeight);
              
              const percent = Math.round(((i + 1) / selectedFiles.length) * 100);
              if (progress) {
                progress.style.width = `${percent}%`;
                progress.setAttribute('aria-valuenow', percent);
              }
              if (log) {
                log.innerHTML = `<span class="inline-block animate-spin-slow">🔄</span> <span>Processing image <strong>${i + 1}</strong> of <strong>${selectedFiles.length}</strong>...</span>`;
                log.style.color = '#60a5fa';
              }
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          img.onerror = () => reject(new Error(`Failed to load image: ${file.name}`));
        });
      }
      
      const fileName = selectedFiles.length === 1 
        ? selectedFiles[0].name.replace(/\.(jpg|jpeg|png)$/i, '.pdf')
        : 'images.pdf';
      
      pdf.save(fileName);
      
      // Show success toastr notification
      const fileCountText = selectedFiles.length === 1 
        ? '1 image converted to PDF' 
        : `${selectedFiles.length} images combined into 1 PDF`;
      toastr.success(`Successfully ${fileCountText}!`, 'Conversion Complete', {
        timeOut: 5000
      });
      
      if (log) {
        const logText = selectedFiles.length === 1
          ? `Success! PDF downloaded with 1 page.`
          : `Success! ${selectedFiles.length} images combined into 1 PDF with ${selectedFiles.length} page(s).`;
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>${logText}</span>`;
        log.style.color = '#34d399';
      }
      if (status) {
        const statusText = selectedFiles.length === 1
          ? `✓ Finished: 1 image converted successfully`
          : `✓ Finished: ${selectedFiles.length} images combined into 1 PDF`;
        status.textContent = statusText;
      }
      if (progress) {
        progress.style.width = '100%';
        progress.setAttribute('aria-valuenow', '100');
      }
      
      // Clear and reset after a short delay
      setTimeout(() => {
        selectedFiles = [];
        if (fileInput) fileInput.value = '';
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        if (dropLabel) dropLabel.textContent = 'Drag & drop your images here';
        if (status) status.textContent = 'No images selected';
        if (imagePreview) {
          imagePreview.classList.add('d-none');
          imagePreview.innerHTML = '';
        }
        if (progress) {
          progress.style.width = '0%';
          progress.setAttribute('aria-valuenow', '0');
        }
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your images';
          log.style.color = '';
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${error.message || error}</span>`;
        log.style.color = '#f87171';
      }
      if (status) status.textContent = '✗ Conversion failed';
      toastr.error(`Conversion failed: ${error.message || error}`);
    } finally {
      if (convertBtn) {
        convertBtn.disabled = false;
        convertBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
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
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      currentFile = f;
      loadFile(f);
    } else {
      toastr.error('Please select a PDF file');
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      const f = fileInput.files[0];
      if (f.type !== 'application/pdf') {
        toastr.error('Please select a PDF file');
        fileInput.value = '';
        return;
      }
      currentFile = f;
      loadFile(currentFile);
    }
  }
  
  function loadFile(f) {
    if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${f.name}`;
    const sizeMB = (f.size / 1024 / 1024).toFixed(2);
    if (fileSize) fileSize.textContent = `${sizeMB} MB`;
    if (comparison) comparison.classList.add('d-none');
    if (log) {
      log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to compress';
      log.style.color = '';
    }
  }
  
  async function handleCompress() {
    if (!currentFile) {
      toastr.warning('Please select a PDF file first');
      return;
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      toastr.info('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (compressBtn) {
      compressBtn.disabled = true;
      compressBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Compressing PDF...</span>';
      log.style.color = '#60a5fa';
    }
    if (progress) {
      progress.style.width = '10%';
      progress.setAttribute('aria-valuenow', '10');
    }
    
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
        
        const percent = Math.round(20 + (i / numPages) * 70);
        if (progress) {
          progress.style.width = `${percent}%`;
          progress.setAttribute('aria-valuenow', percent);
        }
        if (log) {
          log.innerHTML = `<span class="inline-block animate-spin-slow">🔄</span> <span>Processing page <strong>${i}</strong> of <strong>${numPages}</strong>...</span>`;
          log.style.color = '#60a5fa';
        }
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
      
      if (progress) {
        progress.style.width = '100%';
        progress.setAttribute('aria-valuenow', '100');
      }
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! PDF compressed and downloaded - Saved <strong>${saved}%</strong></span>`;
        log.style.color = '#34d399';
      }
      
      // Show success toastr notification
      toastr.success(`Successfully compressed PDF! Saved ${saved}%`, 'Compression Complete', {
        timeOut: 5000
      });
      
      // Clear and reset after a short delay
      setTimeout(() => {
        currentFile = null;
        if (fileInput) fileInput.value = '';
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        if (dropLabel) dropLabel.textContent = 'Drag & drop your PDF here';
        if (fileSize) fileSize.textContent = 'No file selected';
        if (comparison) comparison.classList.add('d-none');
        if (originalSize) originalSize.textContent = '';
        if (compressedSize) compressedSize.textContent = '';
        if (savings) savings.textContent = '';
        if (progress) {
          progress.style.width = '0%';
          progress.setAttribute('aria-valuenow', '0');
        }
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to compress your PDF';
          log.style.color = '';
        }
      }, 3000);
    } catch (error) {
      console.error(error);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${error.message || error}</span>`;
        log.style.color = '#f87171';
      }
      if (progress) {
        progress.style.width = '0%';
        progress.setAttribute('aria-valuenow', '0');
      }
      toastr.error(`Compression failed: ${error.message || error}`);
    } finally {
      if (compressBtn) {
        compressBtn.disabled = false;
        compressBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
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
  const convertBtn = document.getElementById('convert-png-jpg');
  const bar = document.getElementById('bar-png-jpg');
  const stats = document.getElementById('stats-png-jpg');
  const log = document.getElementById('log-png-jpg');
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
  
  function updateProgress(percent) {
    if (bar) {
      bar.style.width = `${percent}%`;
      bar.setAttribute('aria-valuenow', percent);
    }
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const files = Array.from(e.dataTransfer.files).filter(f => f.type === 'image/png');
    if (files.length > 0) {
      selectedFiles = files;
      loadFiles(files);
    } else {
      toastr.error('Please select PNG image files');
    }
  }
  
  function handleFileChange() {
    const files = Array.from(fileInput.files).filter(f => f.type === 'image/png');
    if (files.length > 0) {
      selectedFiles = files;
      loadFiles(files);
    } else if (fileInput.files.length > 0) {
      toastr.error('Please select PNG image files');
    }
  }
  
  function loadFiles(files) {
    selectedFiles = files;
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${files.length} PNG image(s) selected`;
    if (stats) {
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);
      stats.textContent = `${files.length} image(s) • ${(totalSize/1024/1024).toFixed(2)} MB`;
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-bounce">✨</span> <span>Ready to convert! Click the button below.</span>';
      log.style.color = '#60a5fa';
      if (convertBtn) convertBtn.classList.add('animate-pulse-glow');
    }
    updateProgress(0);
  }
  
  async function handleConvert() {
    if (selectedFiles.length === 0) {
      toastr.warning('Please select at least one PNG image');
      return;
    }
    
    if (typeof JSZip === 'undefined') {
      toastr.info('Required library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (convertBtn) {
      convertBtn.disabled = true;
      convertBtn.classList.remove('animate-pulse-glow');
      convertBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Starting conversion...</span>';
      log.style.color = '#60a5fa';
    }
    updateProgress(10);
    
    try {
      const zip = new JSZip();
      const qualityValue = parseFloat(quality?.value) || 0.9;
      // Note: Background color is read fresh for each image to allow changes during conversion
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">🖼️</span> <span>Converting PNG images...</span>';
        log.style.color = '#60a5fa';
      }
      if (stats) stats.textContent = `Images: ${selectedFiles.length} — processing...`;
      
      // Log the background color being used for debugging
      if (bgColor) {
        console.log('Background color element found:', bgColor.value, 'Type:', typeof bgColor.value);
      } else {
        console.warn('Background color element not found, using default white');
        // Try to find it again
        const bgColorRetry = document.getElementById('bgColor-png-jpg');
        if (bgColorRetry) {
          console.log('Found background color element on retry:', bgColorRetry.value);
        }
      }
      
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
            
            // Always get the background color element fresh to ensure we have the latest value
            const bgColorElement = document.getElementById('bgColor-png-jpg');
            let currentBgColor = '#ffffff';
            
            if (bgColorElement && bgColorElement.value) {
              currentBgColor = bgColorElement.value;
            } else if (bgColor && bgColor.value) {
              // Fallback to stored reference
              currentBgColor = bgColor.value;
            }
            
            // Ensure the color is in the correct format (should be #RRGGBB)
            if (!currentBgColor.startsWith('#')) {
              currentBgColor = '#' + currentBgColor;
            }
            
            // Validate color format (should be 7 characters: #RRGGBB)
            if (currentBgColor.length !== 7) {
              console.warn('Invalid color format:', currentBgColor, 'using default white');
              currentBgColor = '#ffffff';
            }
            
            console.log('Using background color:', currentBgColor, 'for image:', file.name, 'Element found:', !!bgColorElement);
            
            // Method 1: Fill canvas with background, then draw image
            // This should work for transparent PNGs
            ctx.fillStyle = currentBgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Ensure we're using the correct composite operation
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(img, 0, 0);
            
            // Convert to blob with JPEG format
            canvas.toBlob((blob) => {
              if (!blob) {
                console.error('Failed to create blob for:', file.name);
                resolve();
                return;
              }
              
              zip.file(file.name.replace(/\.png$/i, '.jpg'), blob);
              const progressPercent = 10 + ((i + 1) / selectedFiles.length) * 85;
              updateProgress(progressPercent);
              if (log) {
                log.innerHTML = `<span class="inline-block animate-bounce">🔄</span> <span>Processing image <strong>${i + 1}</strong> of <strong>${selectedFiles.length}</strong>...</span>`;
                log.style.color = '#60a5fa';
              }
              resolve();
            }, 'image/jpeg', qualityValue);
          };
          
          img.onerror = () => {
            console.error('Error loading image:', file.name);
            resolve(); // Continue with next image
          };
        });
      }
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">📦</span> <span>Creating ZIP file...</span>';
        log.style.color = '#60a5fa';
      }
      updateProgress(95);
      
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
      const fileName = selectedFiles.length === 1 
        ? selectedFiles[0].name.replace(/\.png$/i, '.jpg')
        : 'png_to_jpg_converted.zip';
      
      if (selectedFiles.length === 1) {
        // Extract single file from ZIP and download directly
        const zipContent = await JSZip.loadAsync(zipBlob);
        const firstFile = Object.keys(zipContent.files)[0];
        const fileBlob = await zipContent.files[firstFile].async('blob');
        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        saveAs(zipBlob, fileName);
      }
      
      updateProgress(100);
      
      // Show success toastr notification
      toastr.success(`Successfully converted ${selectedFiles.length} image(s) to JPG!`, 'Conversion Complete', {
        timeOut: 5000
      });
      
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! ${selectedFiles.length === 1 ? 'JPG file' : 'ZIP file'} downloaded with <strong>${selectedFiles.length}</strong> JPG file(s).</span>`;
        log.style.color = '#34d399';
      }
      if (stats) stats.textContent = `✓ Finished: ${selectedFiles.length} image(s) converted successfully`;
      
      if (typeof trackConversion === 'function') {
        trackConversion(selectedFiles.length);
      }
      
      // Clear and reset the form after a short delay
      setTimeout(() => {
        // Clear file input
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Reset dropzone
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        
        // Reset dropzone label
        if (dropLabel) {
          dropLabel.innerHTML = 'Drag & drop your PNG images here';
        }
        
        // Reset stats
        if (stats) {
          stats.textContent = 'No images selected';
        }
        
        // Reset progress bar
        updateProgress(0);
        
        // Reset log message
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your PNG images';
          log.style.color = '';
        }
        
        // Clear selected files
        selectedFiles = [];
      }, 3000);
    } catch (err) {
      console.error(err);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${err.message || err}</span>`;
        log.style.color = '#f87171';
      }
      if (stats) stats.textContent = '✗ Conversion failed';
      updateProgress(0);
      toastr.error(`Conversion failed: ${err.message || err}`);
    } finally {
      if (convertBtn) {
        convertBtn.disabled = false;
        convertBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
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
  const resizeBtn = document.getElementById('resize-btn');
  const bar = document.getElementById('bar-resize');
  const stats = document.getElementById('stats-resize');
  const log = document.getElementById('log-resize');
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
  
  function updateProgress(percent) {
    if (bar) {
      bar.style.width = `${percent}%`;
      bar.setAttribute('aria-valuenow', percent);
    }
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      selectedFiles = files;
      loadFiles(files);
    } else {
      toastr.error('Please select image files');
    }
  }
  
  function handleFileChange() {
    const files = Array.from(fileInput.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      selectedFiles = files;
      loadFiles(files);
    } else if (fileInput.files.length > 0) {
      toastr.error('Please select image files');
    }
  }
  
  function loadFiles(files) {
    selectedFiles = files;
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${files.length} image(s) selected`;
    if (stats) {
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);
      stats.textContent = `${files.length} image(s) • ${(totalSize/1024/1024).toFixed(2)} MB`;
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-bounce">✨</span> <span>Ready to resize! Set dimensions and click the button below.</span>';
      log.style.color = '#60a5fa';
      if (resizeBtn) resizeBtn.classList.add('animate-pulse-glow');
    }
    updateProgress(0);
  }
  
  async function handleResize() {
    if (selectedFiles.length === 0) {
      toastr.warning('Please select at least one image');
      return;
    }
    
    const targetWidth = widthInput?.value ? parseInt(widthInput.value) : null;
    const targetHeight = heightInput?.value ? parseInt(heightInput.value) : null;
    const maintainAspect = aspectCheck?.checked !== false;
    
    if (!targetWidth && !targetHeight) {
      toastr.warning('Please specify width or height');
      return;
    }
    
    if (typeof JSZip === 'undefined') {
      toastr.info('Required library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (resizeBtn) {
      resizeBtn.disabled = true;
      resizeBtn.classList.remove('animate-pulse-glow');
      resizeBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Starting resize...</span>';
      log.style.color = '#60a5fa';
    }
    updateProgress(10);
    
    try {
      const zip = new JSZip();
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">📏</span> <span>Resizing images...</span>';
        log.style.color = '#60a5fa';
      }
      if (stats) stats.textContent = `Images: ${selectedFiles.length} — processing...`;
      
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
            
            const ext = file.name.split('.').pop().toLowerCase();
            const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
            
            canvas.toBlob((blob) => {
              zip.file(`resized_${file.name}`, blob);
              const progressPercent = 10 + ((i + 1) / selectedFiles.length) * 85;
              updateProgress(progressPercent);
              if (log) {
                log.innerHTML = `<span class="inline-block animate-bounce">🔄</span> <span>Resizing image <strong>${i + 1}</strong> of <strong>${selectedFiles.length}</strong>...</span>`;
                log.style.color = '#60a5fa';
              }
              resolve();
            }, mimeType, ext === 'png' ? undefined : 0.95);
          };
        });
      }
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">📦</span> <span>Creating ZIP file...</span>';
        log.style.color = '#60a5fa';
      }
      updateProgress(95);
      
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
      const fileName = selectedFiles.length === 1 
        ? `resized_${selectedFiles[0].name}`
        : 'resized_images.zip';
      
      if (selectedFiles.length === 1) {
        // Extract single file from ZIP and download directly
        const zipContent = await JSZip.loadAsync(zipBlob);
        const firstFile = Object.keys(zipContent.files)[0];
        const fileBlob = await zipContent.files[firstFile].async('blob');
        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        saveAs(zipBlob, fileName);
      }
      
      updateProgress(100);
      
      // Show success toastr notification
      toastr.success(`Successfully resized ${selectedFiles.length} image(s)!`, 'Resize Complete', {
        timeOut: 5000
      });
      
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! ${selectedFiles.length === 1 ? 'Resized image' : 'ZIP file'} downloaded with <strong>${selectedFiles.length}</strong> image(s).</span>`;
        log.style.color = '#34d399';
      }
      if (stats) stats.textContent = `✓ Finished: ${selectedFiles.length} image(s) resized successfully`;
      
      if (typeof trackConversion === 'function') {
        trackConversion(selectedFiles.length);
      }
      
      // Clear and reset the form after a short delay
      setTimeout(() => {
        // Clear file input
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Reset width and height inputs
        if (widthInput) {
          widthInput.value = '';
        }
        if (heightInput) {
          heightInput.value = '';
        }
        
        // Reset aspect ratio checkbox (keep it checked by default)
        if (aspectCheck) {
          aspectCheck.checked = true;
        }
        
        // Reset dropzone
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        
        // Reset dropzone label
        if (dropLabel) {
          dropLabel.innerHTML = 'Drag & drop your images here';
        }
        
        // Reset stats
        if (stats) {
          stats.textContent = 'No images selected';
        }
        
        // Reset progress bar
        updateProgress(0);
        
        // Reset log message
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to resize your images';
          log.style.color = '';
        }
        
        // Clear selected files
        selectedFiles = [];
      }, 3000);
    } catch (err) {
      console.error(err);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${err.message || err}</span>`;
        log.style.color = '#f87171';
      }
      if (stats) stats.textContent = '✗ Resize failed';
      updateProgress(0);
      toastr.error(`Resize failed: ${err.message || err}`);
    } finally {
      if (resizeBtn) {
        resizeBtn.disabled = false;
        resizeBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
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
  const compressBtn = document.getElementById('compress-img-btn');
  const bar = document.getElementById('bar-compress-img');
  const stats = document.getElementById('stats-compress-img');
  const log = document.getElementById('log-compress-img');
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
  
  function updateProgress(percent) {
    if (bar) {
      bar.style.width = `${percent}%`;
      bar.setAttribute('aria-valuenow', percent);
    }
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      selectedFiles = files;
      loadFiles(files);
    } else {
      toastr.error('Please select image files');
    }
  }
  
  function handleFileChange() {
    const files = Array.from(fileInput.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      selectedFiles = files;
      loadFiles(files);
    } else if (fileInput.files.length > 0) {
      toastr.error('Please select image files');
    }
  }
  
  function handleQualityChange() {
    if (qualityValue && qualitySlider) {
      qualityValue.textContent = parseFloat(qualitySlider.value).toFixed(2);
    }
  }
  
  function loadFiles(files) {
    selectedFiles = files;
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${files.length} image(s) selected`;
    if (stats) {
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);
      stats.textContent = `${files.length} image(s) • ${(totalSize/1024/1024).toFixed(2)} MB`;
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-bounce">✨</span> <span>Ready to compress! Adjust quality and click the button below.</span>';
      log.style.color = '#60a5fa';
      if (compressBtn) compressBtn.classList.add('animate-pulse-glow');
    }
    updateProgress(0);
  }
  
  async function handleCompress() {
    if (selectedFiles.length === 0) {
      toastr.warning('Please select at least one image');
      return;
    }
    
    if (typeof JSZip === 'undefined') {
      toastr.info('Required library is loading. Please wait a moment and try again.');
      return;
    }
    
    if (compressBtn) {
      compressBtn.disabled = true;
      compressBtn.classList.remove('animate-pulse-glow');
      compressBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Starting compression...</span>';
      log.style.color = '#60a5fa';
    }
    updateProgress(10);
    
    try {
      const zip = new JSZip();
      const quality = parseFloat(qualitySlider?.value) || 0.8;
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">🗜️</span> <span>Compressing images...</span>';
        log.style.color = '#60a5fa';
      }
      if (stats) stats.textContent = `Images: ${selectedFiles.length} — processing...`;
      
      let originalTotalSize = 0;
      let compressedTotalSize = 0;
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        originalTotalSize += file.size;
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
            const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
            
            canvas.toBlob((blob) => {
              compressedTotalSize += blob.size;
              zip.file(`compressed_${file.name}`, blob);
              const progressPercent = 10 + ((i + 1) / selectedFiles.length) * 85;
              updateProgress(progressPercent);
              if (log) {
                log.innerHTML = `<span class="inline-block animate-bounce">🔄</span> <span>Compressing image <strong>${i + 1}</strong> of <strong>${selectedFiles.length}</strong>...</span>`;
                log.style.color = '#60a5fa';
              }
              resolve();
            }, mimeType, ext === 'png' ? undefined : quality);
          };
        });
      }
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">📦</span> <span>Creating ZIP file...</span>';
        log.style.color = '#60a5fa';
      }
      updateProgress(95);
      
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
      const fileName = selectedFiles.length === 1 
        ? `compressed_${selectedFiles[0].name}`
        : 'compressed_images.zip';
      
      if (selectedFiles.length === 1) {
        // Extract single file from ZIP and download directly
        const zipContent = await JSZip.loadAsync(zipBlob);
        const firstFile = Object.keys(zipContent.files)[0];
        const fileBlob = await zipContent.files[firstFile].async('blob');
        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        saveAs(zipBlob, fileName);
      }
      
      updateProgress(100);
      
      const compressionRatio = ((1 - compressedTotalSize / originalTotalSize) * 100).toFixed(1);
      
      // Show success toastr notification
      toastr.success(`Successfully compressed ${selectedFiles.length} image(s)! ${compressionRatio > 0 ? `(${compressionRatio}% reduction)` : ''}`, 'Compression Complete', {
        timeOut: 5000
      });
      
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! ${selectedFiles.length === 1 ? 'Compressed image' : 'ZIP file'} downloaded with <strong>${selectedFiles.length}</strong> image(s). ${compressionRatio > 0 ? `<strong>${compressionRatio}%</strong> size reduction!` : ''}</span>`;
        log.style.color = '#34d399';
      }
      if (stats) {
        const originalMB = (originalTotalSize/1024/1024).toFixed(2);
        const compressedMB = (compressedTotalSize/1024/1024).toFixed(2);
        stats.textContent = `✓ Finished: ${selectedFiles.length} image(s) • ${originalMB} MB → ${compressedMB} MB (${compressionRatio}% reduction)`;
      }
      
      if (typeof trackConversion === 'function') {
        trackConversion(selectedFiles.length);
      }
      
      // Clear and reset the form after a short delay
      setTimeout(() => {
        // Clear file input
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Reset quality slider to default value (0.8)
        if (qualitySlider) {
          qualitySlider.value = '0.8';
        }
        if (qualityValue) {
          qualityValue.textContent = '0.8';
        }
        
        // Reset dropzone
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        
        // Reset dropzone label
        if (dropLabel) {
          dropLabel.innerHTML = 'Drag & drop your images here';
        }
        
        // Reset stats
        if (stats) {
          stats.textContent = 'No images selected';
        }
        
        // Reset progress bar
        updateProgress(0);
        
        // Reset log message
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to compress your images';
          log.style.color = '';
        }
        
        // Clear selected files
        selectedFiles = [];
      }, 3000);
    } catch (err) {
      console.error(err);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${err.message || err}</span>`;
        log.style.color = '#f87171';
      }
      if (stats) stats.textContent = '✗ Compression failed';
      updateProgress(0);
      toastr.error(`Compression failed: ${err.message || err}`);
    } finally {
      if (compressBtn) {
        compressBtn.disabled = false;
        compressBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
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
  if (qualitySlider) {
    qualitySlider.addEventListener('input', handleQualityChange);
    // Initialize quality value display
    handleQualityChange();
  }
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
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  async function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      await loadFile(f);
    } else {
      toastr.error('Please select a PDF file');
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      const f = fileInput.files[0];
      if (f.type !== 'application/pdf') {
        toastr.error('Please select a PDF file');
        fileInput.value = '';
        return;
      }
      loadFile(f);
    }
  }
  
  async function loadFile(file) {
    // Check and load PDF.js on mobile if needed
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile && !pdfjsReady && typeof loadPDFJS === 'function' && !window.pdfjsLoading) {
      loadPDFJS();
      // Wait for PDF.js to load (with retries)
      let retries = 0;
      while (!pdfjsReady && retries < 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        retries++;
      }
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      toastr.info('PDF library is loading. Please wait a moment and try again.');
      // Retry after a delay
      setTimeout(async () => {
        if (pdfjsReady && typeof pdfjsLib !== 'undefined') {
          await loadFile(file);
        } else {
          toastr.error('PDF library failed to load. Please refresh the page.');
        }
      }, 2000);
      return;
    }
    
    try {
      const arr = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      currentPdf = await loadingTask.promise;
      numPages = currentPdf.numPages;
      
      if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${file.name} (${numPages} pages)`;
      if (status) status.textContent = `${numPages} pages detected`;
      
      if (pagesList) {
        pagesList.innerHTML = '';
        selectedPages.clear();
        for (let i = 1; i <= numPages; i++) {
          const col = document.createElement('div');
          col.className = 'col-auto col-6 col-sm-4 col-md-3 col-lg-2';
          
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.className = 'btn btn-outline-secondary btn-sm w-100';
          btn.style.minWidth = '50px';
          btn.dataset.page = i;
          btn.addEventListener('click', () => {
            if (selectedPages.has(i)) {
              selectedPages.delete(i);
              btn.classList.remove('btn-primary');
              btn.classList.add('btn-outline-secondary');
            } else {
              selectedPages.add(i);
              btn.classList.remove('btn-outline-secondary');
              btn.classList.add('btn-primary');
            }
            updateExtractButton();
          });
          col.appendChild(btn);
          pagesList.appendChild(col);
        }
      }
      
      if (pagesInfo) pagesInfo.classList.remove('d-none');
      updateExtractButton();
    } catch (error) {
      toastr.error('Error loading PDF: ' + error.message);
    }
  }
  
  function updateExtractButton() {
    if (extractSelectedBtn) {
      if (selectedPages.size > 0) {
        extractSelectedBtn.classList.remove('d-none');
        extractSelectedBtn.textContent = `Extract ${selectedPages.size} Selected Page(s)`;
      } else {
        extractSelectedBtn.classList.add('d-none');
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
          btn.classList.remove('btn-outline-secondary');
          btn.classList.add('btn-primary');
        }
      }
    }
    updateExtractButton();
  }
  
  function handleSelectNone() {
    selectedPages.clear();
    if (pagesList) {
      pagesList.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-secondary');
      });
    }
    updateExtractButton();
  }
  
  async function handleSplitAll() {
    if (!currentPdf) {
      toastr.warning('Please select a PDF file first');
      return;
    }
    
    await splitPDF(Array.from({ length: numPages }, (_, i) => i + 1), true);
  }
  
  async function handleExtractSelected() {
    if (selectedPages.size === 0) {
      toastr.warning('Please select at least one page');
      return;
    }
    
    await splitPDF(Array.from(selectedPages).sort((a, b) => a - b), false);
  }
  
  async function splitPDF(pages, splitAll) {
    // Check and wait for required libraries
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Ensure PDF.js is loaded
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      if (isMobile && typeof loadPDFJS === 'function' && !window.pdfjsLoading) {
        loadPDFJS();
        let retries = 0;
        while (!pdfjsReady && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 300));
          retries++;
        }
      }
      if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
        toastr.error('PDF library not loaded. Please refresh the page.');
        return;
      }
    }
    
    if (typeof window.jspdf === 'undefined' || typeof JSZip === 'undefined') {
      toastr.info('Required libraries not loaded. Please wait a moment and try again.');
      // Wait a bit and retry
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (typeof window.jspdf === 'undefined' || typeof JSZip === 'undefined') {
        toastr.error('Required libraries failed to load. Please refresh the page.');
        return;
      }
    }
    
    if (splitAllBtn) {
      splitAllBtn.disabled = true;
      splitAllBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    if (extractSelectedBtn) {
      extractSelectedBtn.disabled = true;
      extractSelectedBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Splitting PDF...</span>';
      log.style.color = '#60a5fa';
    }
    if (progress) {
      progress.style.width = '0%';
      progress.setAttribute('aria-valuenow', '0');
    }
    
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
        
        const percent = Math.round(((idx + 1) / pages.length) * 100);
        if (progress) {
          progress.style.width = `${percent}%`;
          progress.setAttribute('aria-valuenow', percent);
        }
        if (log) {
          log.innerHTML = `<span class="inline-block animate-spin-slow">🔄</span> <span>Processing page <strong>${pageNum}</strong> (${idx + 1} of ${pages.length})...</span>`;
          log.style.color = '#60a5fa';
        }
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const fileName = splitAll ? `${baseName}_all_pages.zip` : `${baseName}_extracted_pages.zip`;
      saveAs(zipBlob, fileName);
      
      if (progress) {
        progress.style.width = '100%';
        progress.setAttribute('aria-valuenow', '100');
      }
      
      // Show success toastr notification
      const pageText = pages.length === 1 ? 'page' : 'pages';
      toastr.success(`Successfully split ${pages.length} ${pageText}!`, 'Split Complete', {
        timeOut: 5000
      });
      
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! ${pages.length} page(s) extracted and downloaded</span>`;
        log.style.color = '#34d399';
      }
      if (status) {
        const statusText = splitAll 
          ? `✓ Finished: All ${pages.length} pages split successfully`
          : `✓ Finished: ${pages.length} selected page(s) extracted successfully`;
        status.textContent = statusText;
      }
      
      // Clear and reset after a short delay
      setTimeout(() => {
        currentPdf = null;
        numPages = 0;
        selectedPages.clear();
        if (fileInput) fileInput.value = '';
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        if (dropLabel) dropLabel.textContent = 'Drag & drop your PDF here';
        if (status) status.textContent = 'No file selected';
        if (pagesInfo) pagesInfo.classList.add('d-none');
        if (pagesList) pagesList.innerHTML = '';
        if (extractSelectedBtn) extractSelectedBtn.classList.add('d-none');
        if (progress) {
          progress.style.width = '0%';
          progress.setAttribute('aria-valuenow', '0');
        }
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to split your PDF';
          log.style.color = '';
        }
      }, 3000);
    } catch (error) {
      console.error(error);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${error.message || error}</span>`;
        log.style.color = '#f87171';
      }
      if (status) status.textContent = '✗ Split failed';
      if (progress) {
        progress.style.width = '0%';
        progress.setAttribute('aria-valuenow', '0');
      }
      toastr.error(`Split failed: ${error.message || error}`);
    } finally {
      if (splitAllBtn) {
        splitAllBtn.disabled = false;
        splitAllBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
      if (extractSelectedBtn) {
        extractSelectedBtn.disabled = false;
        extractSelectedBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
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
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const files = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
    if (files.length > 0) {
      selectedFiles = [...selectedFiles, ...files];
      updatePreview();
    } else {
      toastr.error('Please select PDF files');
    }
  }
  
  function handleFileChange() {
    const files = Array.from(fileInput.files).filter(f => f.type === 'application/pdf');
    if (files.length > 0) {
      selectedFiles = [...selectedFiles, ...files];
      updatePreview();
    } else if (fileInput.files.length > 0) {
      toastr.error('Please select PDF files');
      fileInput.value = '';
    }
  }
  
  function updatePreview() {
    if (selectedFiles.length === 0) {
      if (pdfList) pdfList.classList.add('d-none');
      if (status) status.textContent = 'No files selected';
      return;
    }
    
    if (pdfList) {
      pdfList.classList.remove('d-none');
      const pdfListContent = document.getElementById('pdf-list-content-merge');
      if (pdfListContent) {
        pdfListContent.innerHTML = '';
        selectedFiles.forEach((file, index) => {
          const row = document.createElement('div');
          row.className = 'd-flex align-items-center justify-content-between p-3 mb-2 rounded';
          row.style.backgroundColor = 'rgba(30, 41, 59, 0.6)';
          
          const leftDiv = document.createElement('div');
          leftDiv.className = 'd-flex align-items-center gap-3';
          
          const icon = document.createElement('span');
          icon.style.fontSize = '1.5rem';
          icon.textContent = '📄';
          
          const fileInfo = document.createElement('div');
          const fileName = document.createElement('div');
          fileName.className = 'text-light small fw-medium';
          fileName.textContent = file.name;
          const fileSize = document.createElement('div');
          fileSize.className = 'text-secondary';
          fileSize.style.fontSize = '0.75rem';
          fileSize.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
          
          fileInfo.appendChild(fileName);
          fileInfo.appendChild(fileSize);
          leftDiv.appendChild(icon);
          leftDiv.appendChild(fileInfo);
          
          const removeBtn = document.createElement('button');
          removeBtn.className = 'btn btn-sm btn-danger rounded-circle';
          removeBtn.style.width = '30px';
          removeBtn.style.height = '30px';
          removeBtn.style.padding = '0';
          removeBtn.style.fontSize = '1.2rem';
          removeBtn.style.lineHeight = '1';
          removeBtn.innerHTML = '×';
          removeBtn.onclick = () => {
            selectedFiles.splice(index, 1);
            updatePreview();
            // Update file input
            const dt = new DataTransfer();
            selectedFiles.forEach(f => dt.items.add(f));
            fileInput.files = dt.files;
          };
          
          row.appendChild(leftDiv);
          row.appendChild(removeBtn);
          pdfListContent.appendChild(row);
        });
      }
    }
    
    if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${selectedFiles.length} PDF(s) selected - Will be merged into 1 PDF`;
    if (status) {
      const statusText = selectedFiles.length === 1
        ? '1 PDF selected (need at least 2 to merge)'
        : `${selectedFiles.length} PDF(s) ready to merge`;
      status.textContent = statusText;
    }
  }
  
  async function handleMerge() {
    if (selectedFiles.length < 2) {
      toastr.warning('Please select at least 2 PDF files to merge');
      return;
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined' || typeof window.jspdf === 'undefined') {
      toastr.info('Required libraries not loaded. Please wait a moment and try again.');
      return;
    }
    
    if (mergeBtn) {
      mergeBtn.disabled = true;
      mergeBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Merging PDFs...</span>';
      log.style.color = '#60a5fa';
    }
    if (progress) {
      progress.style.width = '0%';
      progress.setAttribute('aria-valuenow', '0');
    }
    
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
          const percent = Math.round((currentPage / totalPages) * 100);
          if (progress) {
            progress.style.width = `${percent}%`;
            progress.setAttribute('aria-valuenow', percent);
          }
          if (log) {
            log.innerHTML = `<span class="inline-block animate-spin-slow">🔄</span> <span>Processing page <strong>${currentPage}</strong> of <strong>${totalPages}</strong>...</span>`;
            log.style.color = '#60a5fa';
          }
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
      
      if (progress) {
        progress.style.width = '100%';
        progress.setAttribute('aria-valuenow', '100');
      }
      
      // Show success toastr notification
      toastr.success(`Successfully merged ${selectedFiles.length} PDF(s) into 1 file with ${totalPages} page(s)!`, 'Merge Complete', {
        timeOut: 5000
      });
      
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! ${totalPages} pages merged into one PDF</span>`;
        log.style.color = '#34d399';
      }
      if (status) {
        status.textContent = `✓ Finished: ${selectedFiles.length} PDF(s) merged successfully`;
      }
      
      // Clear and reset after a short delay
      setTimeout(() => {
        selectedFiles = [];
        if (fileInput) fileInput.value = '';
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        if (dropLabel) dropLabel.textContent = 'Drag & drop your PDFs here';
        if (status) status.textContent = 'No files selected';
        if (pdfList) pdfList.classList.add('d-none');
        const pdfListContent = document.getElementById('pdf-list-content-merge');
        if (pdfListContent) pdfListContent.innerHTML = '';
        if (progress) {
          progress.style.width = '0%';
          progress.setAttribute('aria-valuenow', '0');
        }
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to merge your PDFs';
          log.style.color = '';
        }
      }, 3000);
    } catch (error) {
      console.error(error);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${error.message || error}</span>`;
        log.style.color = '#f87171';
      }
      if (status) status.textContent = '✗ Merge failed';
      if (progress) {
        progress.style.width = '0%';
        progress.setAttribute('aria-valuenow', '0');
      }
      toastr.error(`Merge failed: ${error.message || error}`);
    } finally {
      if (mergeBtn) {
        mergeBtn.disabled = false;
        mergeBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
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
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  async function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      await loadFile(f);
    } else {
      toastr.error('Please select a PDF file');
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      const f = fileInput.files[0];
      if (f.type !== 'application/pdf') {
        toastr.error('Please select a PDF file');
        fileInput.value = '';
        return;
      }
      loadFile(f);
    }
  }
  
  async function loadFile(file) {
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      toastr.info('PDF library is loading. Please wait a moment and try again.');
      return;
    }
    
    try {
      const arr = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      currentPdf = await loadingTask.promise;
      numPages = currentPdf.numPages;
      
      if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${file.name} (${numPages} pages)`;
      if (status) status.textContent = `${numPages} pages detected`;
      
      if (pagesList) {
        pagesList.innerHTML = '';
        selectedPages.clear();
        for (let i = 1; i <= numPages; i++) {
          selectedPages.add(i); // Select all by default
          const col = document.createElement('div');
          col.className = 'col-auto';
          
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.className = 'btn btn-primary btn-sm';
          btn.style.minWidth = '50px';
          btn.dataset.page = i;
          btn.addEventListener('click', () => {
            if (selectedPages.has(i)) {
              selectedPages.delete(i);
              btn.classList.remove('btn-primary');
              btn.classList.add('btn-outline-secondary');
            } else {
              selectedPages.add(i);
              btn.classList.remove('btn-outline-secondary');
              btn.classList.add('btn-primary');
            }
          });
          col.appendChild(btn);
          pagesList.appendChild(col);
        }
      }
      
      if (pagesInfo) pagesInfo.classList.remove('d-none');
    } catch (error) {
      toastr.error('Error loading PDF: ' + error.message);
    }
  }
  
  async function handleRotate() {
    if (!currentPdf) {
      toastr.warning('Please select a PDF file first');
      return;
    }
    
    if (selectedPages.size === 0) {
      toastr.warning('Please select at least one page to rotate');
      return;
    }
    
    if (typeof window.jspdf === 'undefined') {
      toastr.info('Required libraries not loaded. Please wait a moment and try again.');
      return;
    }
    
    if (rotateBtn) {
      rotateBtn.disabled = true;
      rotateBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Rotating PDF...</span>';
      log.style.color = '#60a5fa';
    }
    if (progress) {
      progress.style.width = '0%';
      progress.setAttribute('aria-valuenow', '0');
    }
    
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
        
        const percent = Math.round((i / numPages) * 100);
        if (progress) {
          progress.style.width = `${percent}%`;
          progress.setAttribute('aria-valuenow', percent);
        }
        if (log) {
          log.innerHTML = `<span class="inline-block animate-spin-slow">🔄</span> <span>Processing page <strong>${i}</strong> of <strong>${numPages}</strong>...</span>`;
          log.style.color = '#60a5fa';
        }
      }
      
      const pdfBlob = outputPdf.output('blob');
      const fileName = fileInput.files[0]?.name.replace(/\.pdf$/i, '_rotated.pdf') || 'rotated.pdf';
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      if (progress) {
        progress.style.width = '100%';
        progress.setAttribute('aria-valuenow', '100');
      }
      
      // Show success toastr notification
      toastr.success(`Successfully rotated PDF!`, 'Rotation Complete', {
        timeOut: 5000
      });
      
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! PDF rotated and downloaded</span>`;
        log.style.color = '#34d399';
      }
      if (status) {
        status.textContent = `✓ Finished: PDF rotated successfully`;
      }
      
      // Clear and reset after a short delay
      setTimeout(() => {
        currentPdf = null;
        numPages = 0;
        selectedPages.clear();
        if (fileInput) fileInput.value = '';
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        if (dropLabel) dropLabel.textContent = 'Drag & drop your PDF here';
        if (status) status.textContent = 'No file selected';
        if (pagesInfo) pagesInfo.classList.add('d-none');
        if (pagesList) pagesList.innerHTML = '';
        if (progress) {
          progress.style.width = '0%';
          progress.setAttribute('aria-valuenow', '0');
        }
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to rotate your PDF';
          log.style.color = '';
        }
      }, 3000);
    } catch (error) {
      console.error(error);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${error.message || error}</span>`;
        log.style.color = '#f87171';
      }
      if (status) status.textContent = '✗ Rotation failed';
      if (progress) {
        progress.style.width = '0%';
        progress.setAttribute('aria-valuenow', '0');
      }
      toastr.error(`Rotation failed: ${error.message || error}`);
    } finally {
      if (rotateBtn) {
        rotateBtn.disabled = false;
        rotateBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (rotateBtn) rotateBtn.addEventListener('click', handleRotate);
}

// PDF Unlock Implementation - REMOVED (not reliable in browser)
// This feature has been removed due to browser limitations with PDF encryption

// PDF Protect Implementation - REMOVED (not reliable in browser)
// This feature has been removed due to browser limitations with PDF encryption

// PDF OCR Implementation
function initPDFOCR() {
  const fileInput = document.getElementById('file-ocr');
  const dropzone = document.getElementById('dropzone-ocr');
  const dropLabel = document.getElementById('dropLabel-ocr');
  const ocrBtn = document.getElementById('ocr-btn');
  const language = document.getElementById('language-ocr');
  const stats = document.getElementById('stats-ocr');
  const bar = document.getElementById('bar-ocr');
  const log = document.getElementById('log-ocr');
  const textResult = document.getElementById('text-result-ocr');
  const extractedText = document.getElementById('extracted-text-ocr');
  const copyBtn = document.getElementById('copy-text-ocr');
  const downloadBtn = document.getElementById('download-text-ocr');
  
  if (!fileInput || !dropzone) return;
  
  let currentFile = null;
  let extractedTextValue = '';
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => ocrBtn?.removeEventListener('click', handleOCR),
    () => copyBtn?.removeEventListener('click', handleCopy),
    () => downloadBtn?.removeEventListener('click', handleDownload)
  ];
  
  window.currentToolHandlers = handlers;
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') {
      loadFile(f);
    } else {
      toastr.error('Please select a PDF file');
    }
  }
  
  function handleFileChange() {
    if (fileInput.files && fileInput.files[0]) {
      const f = fileInput.files[0];
      if (f.type !== 'application/pdf') {
        toastr.error('Please select a PDF file');
        fileInput.value = '';
        return;
      }
      loadFile(f);
    }
  }
  
  function handleCopy() {
    if (extractedText && extractedTextValue) {
      extractedText.select();
      document.execCommand('copy');
      if (copyBtn) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="bi bi-check"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
        }, 2000);
      }
      toastr.success('Text copied to clipboard!');
    } else {
      toastr.warning('No text to copy. Please extract text first.');
    }
  }
  
  function handleDownload() {
    if (!extractedTextValue || extractedTextValue.length === 0) {
      toastr.warning('No text to download. Please extract text first.');
      return;
    }
    
    const fileName = currentFile ? currentFile.name.replace(/\.pdf$/i, '_extracted_text.txt') : 'extracted_text.txt';
    const blob = new Blob([extractedTextValue], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    toastr.success('Text file downloaded successfully!');
  }
  
  function loadFile(f) {
    if (f.type !== 'application/pdf') {
      toastr.error('Please select a PDF file');
      return;
    }
    currentFile = f;
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${f.name}`;
    if (stats) stats.textContent = `${(f.size/1024/1024).toFixed(2)} MB selected`;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile && !pdfjsReady && typeof loadPDFJS === 'function' && !window.pdfjsLoading) {
      loadPDFJS();
    }
    
    // Hide text result when loading a new file (user wants to extract from new file)
    if (textResult) textResult.classList.add('d-none');
    if (extractedText) {
      extractedText.value = '';
    }
    extractedTextValue = '';
    
    // Disable download button when no text is available
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.classList.add('disabled');
    }
    
    if (log) {
      if (pdfjsReady) {
        log.innerHTML = '<span class="inline-block animate-bounce">✨</span> <span>Ready to extract text! Click the button below.</span>';
        log.style.color = '#60a5fa';
        if (ocrBtn) ocrBtn.classList.add('animate-pulse-glow');
      } else {
        log.innerHTML = '<span class="inline-block animate-spin-slow">⏳</span> <span>Loading PDF.js library...</span>';
        log.style.color = '#94a3b8';
      }
    }
    updateProgress(0);
  }
  
  async function loadTesseract() {
    if (window.Tesseract) return true;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js';
      script.onload = () => {
        setTimeout(() => resolve(true), 500); // Give it time to initialize
      };
      script.onerror = () => reject(new Error('Failed to load Tesseract.js'));
      document.head.appendChild(script);
    });
  }
  
  async function handleOCR() {
    if (!currentFile) {
      toastr.warning('Please select a PDF file first');
      return;
    }
    
    if (!pdfjsReady || typeof pdfjsLib === 'undefined') {
      toastr.info('PDF.js library is still loading. Please wait a moment and try again.');
      return;
    }
    
    if (ocrBtn) {
      ocrBtn.disabled = true;
      ocrBtn.classList.remove('animate-pulse-glow');
      ocrBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Starting OCR extraction...</span>';
      log.style.color = '#60a5fa';
    }
    updateProgress(5);
    
    try {
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">🔄</span> <span>Loading OCR engine...</span>';
        log.style.color = '#60a5fa';
      }
      updateProgress(10);
      
      await loadTesseract();
      
      if (!window.Tesseract) {
        throw new Error('OCR engine failed to load');
      }
      
      const arr = await currentFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arr });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">📄</span> <span>Extracting text from PDF pages...</span>';
        log.style.color = '#60a5fa';
      }
      if (stats) stats.textContent = `Pages: ${numPages} — processing...`;
      updateProgress(15);
      
      let allText = '';
      const lang = language?.value || 'eng';
      
      for (let i = 1; i <= numPages; i++) {
        if (log) {
          log.innerHTML = `<span class="inline-block animate-spin-slow">🔄</span> <span>Processing page <strong>${i}</strong> of <strong>${numPages}</strong>...</span>`;
          log.style.color = '#60a5fa';
        }
        
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        
        const baseProgress = 15;
        const pageProgress = (i / numPages) * 75;
        updateProgress(Math.round(baseProgress + pageProgress));
        
        if (log) {
          log.innerHTML = `<span class="inline-block animate-spin-slow">👁️</span> <span>Running OCR on page <strong>${i}</strong> of <strong>${numPages}</strong>...</span>`;
          log.style.color = '#60a5fa';
        }
        
        const { data: { text } } = await Tesseract.recognize(canvas, lang, {
          logger: m => {
            if (m.status === 'recognizing text') {
              const pageBaseProgress = 15 + ((i - 1) / numPages) * 75;
              const ocrProgress = (m.progress / numPages) * 75;
              updateProgress(Math.round(pageBaseProgress + ocrProgress));
              if (log) {
                log.innerHTML = `<span class="inline-block animate-spin-slow">👁️</span> <span>Page <strong>${i}</strong>: ${Math.round(m.progress * 100)}% recognized...</span>`;
                log.style.color = '#60a5fa';
              }
            }
          }
        });
        
        allText += `\n\n--- Page ${i} ---\n\n${text}`;
      }
      
      extractedTextValue = allText.trim();
      
      // Log extracted text length for debugging
      console.log('Extracted text length:', extractedTextValue.length);
      console.log('First 200 chars:', extractedTextValue.substring(0, 200));
      
      if (extractedText) {
        extractedText.value = extractedTextValue;
        // Force textarea to be visible
        extractedText.style.display = 'block';
        extractedText.style.visibility = 'visible';
      }
      
      // Show text result section
      if (textResult) {
        textResult.classList.remove('d-none');
        textResult.style.display = 'block';
        textResult.style.visibility = 'visible';
        // Scroll to text result section smoothly
        setTimeout(() => {
          textResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
      
      // Enable download button if text was extracted
      if (downloadBtn && extractedTextValue.length > 0) {
        downloadBtn.disabled = false;
        downloadBtn.classList.remove('disabled');
      }
      
      updateProgress(100);
      
      // Show success toastr notification
      toastr.success(`Successfully extracted text from ${numPages} page(s)!`, 'OCR Complete', {
        timeOut: 5000
      });
      
      if (log) {
        if (extractedTextValue.length > 0) {
          log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! Text extracted from <strong>${numPages}</strong> page(s). Scroll down to view extracted text.</span>`;
        } else {
          log.innerHTML = `<span class="inline-block">⚠️</span> <span>Processing complete, but no text was extracted. The PDF might contain only images or unreadable content.</span>`;
          log.style.color = '#fb923c';
        }
        log.style.color = extractedTextValue.length > 0 ? '#34d399' : '#fb923c';
      }
      if (stats) stats.textContent = `✓ Finished: ${numPages} page(s) processed successfully`;
      
      // Log extracted text length for debugging
      console.log('Extracted text length:', extractedTextValue.length);
      if (extractedTextValue.length === 0) {
        console.warn('No text was extracted. The PDF might not contain readable text or OCR failed.');
        toastr.warning('No text was extracted. The PDF might be empty or contain only images without readable text.', 'No Text Found', {
          timeOut: 8000
        });
      } else {
        console.log('Text preview (first 500 chars):', extractedTextValue.substring(0, 500));
      }
      
      if (typeof trackConversion === 'function') {
        trackConversion(numPages);
      }
      
      // Clear and reset the form after a longer delay (10 seconds instead of 3)
      setTimeout(() => {
        // Clear file input
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Reset dropzone
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        
        // Reset dropzone label
        if (dropLabel) {
          dropLabel.innerHTML = 'Drag & drop your PDF here';
        }
        
        // Reset stats
        if (stats) {
          stats.textContent = 'No file selected';
        }
        
        // Reset progress bar
        updateProgress(0);
        
        // Reset log message
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to extract text from your PDF files';
          log.style.color = '';
        }
        
        // DO NOT hide text result or clear extracted text - keep it visible for user
        // User can manually clear by selecting a new file
        
        // Clear current file reference (but keep extracted text visible)
        currentFile = null;
      }, 10000); // Delay before resetting form, but keep extracted text visible
    } catch (error) {
      console.error(error);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${error.message || error}</span>`;
        log.style.color = '#f87171';
      }
      if (stats) stats.textContent = '✗ Extraction failed';
      updateProgress(0);
      toastr.error(`OCR extraction failed: ${error.message || error}`);
    } finally {
      if (ocrBtn) {
        ocrBtn.disabled = false;
        ocrBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
    }
  }
  
  function updateProgress(pct) {
    if (bar) {
      const percent = Math.min(100, Math.max(0, pct));
      bar.style.width = percent + '%';
      bar.setAttribute('aria-valuenow', percent);
      if (!bar.classList.contains('bg-gradient-primary') && !bar.classList.contains('bg-primary')) {
        bar.classList.add('bg-gradient-primary');
      }
      bar.style.display = 'block';
      bar.style.opacity = '1';
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (ocrBtn) ocrBtn.addEventListener('click', handleOCR);
  if (copyBtn) copyBtn.addEventListener('click', handleCopy);
  if (downloadBtn) {
    downloadBtn.addEventListener('click', handleDownload);
    downloadBtn.disabled = true; // Initially disabled until text is extracted
    downloadBtn.classList.add('disabled');
  }
}

// PDF to Word and Word to PDF implementations removed (not functional)

// HEIC to JPG Implementation
function initHEICToJPG() {
  const fileInput = document.getElementById('file-heic-jpg');
  const dropzone = document.getElementById('dropzone-heic-jpg');
  const dropLabel = document.getElementById('dropLabel-heic-jpg');
  const convertBtn = document.getElementById('convert-heic-jpg');
  const bar = document.getElementById('bar-heic-jpg');
  const stats = document.getElementById('stats-heic-jpg');
  const log = document.getElementById('log-heic-jpg');
  const qualitySlider = document.getElementById('quality-heic-jpg');
  const qualityValue = document.getElementById('quality-value-heic-jpg');
  
  if (!fileInput || !dropzone) return;
  
  let selectedFiles = [];
  
  const handlers = [
    () => dropzone.removeEventListener('dragover', handleDragOver),
    () => dropzone.removeEventListener('dragleave', handleDragLeave),
    () => dropzone.removeEventListener('drop', handleDrop),
    () => fileInput.removeEventListener('change', handleFileChange),
    () => convertBtn?.removeEventListener('click', handleConvert),
    () => qualitySlider?.removeEventListener('input', handleQualityChange)
  ];
  
  window.currentToolHandlers = handlers;
  
  function updateProgress(percent) {
    if (bar) {
      bar.style.width = `${percent}%`;
      bar.setAttribute('aria-valuenow', percent);
    }
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  }
  
  function handleDrop(e) {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
    const files = Array.from(e.dataTransfer.files).filter(f => 
      f.type === 'image/heic' || 
      f.type === 'image/heif' || 
      f.name.toLowerCase().endsWith('.heic') || 
      f.name.toLowerCase().endsWith('.heif')
    );
    if (files.length > 0) {
      selectedFiles = files;
      loadFiles(files);
    } else {
      toastr.error('Please select HEIC or HEIF image files');
    }
  }
  
  function handleFileChange() {
    const files = Array.from(fileInput.files).filter(f => 
      f.type === 'image/heic' || 
      f.type === 'image/heif' || 
      f.name.toLowerCase().endsWith('.heic') || 
      f.name.toLowerCase().endsWith('.heif')
    );
    if (files.length > 0) {
      selectedFiles = files;
      loadFiles(files);
    } else if (fileInput.files.length > 0) {
      toastr.error('Please select HEIC or HEIF image files');
    }
  }
  
  function handleQualityChange() {
    if (qualityValue && qualitySlider) {
      qualityValue.textContent = parseFloat(qualitySlider.value).toFixed(2);
    }
  }
  
  function loadFiles(files) {
    selectedFiles = files;
    dropzone.style.borderColor = 'var(--bs-primary)';
    dropzone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    if (dropLabel) dropLabel.innerHTML = `<span class="text-primary fw-bold">✓</span> ${files.length} HEIC image(s) selected`;
    if (stats) {
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);
      stats.textContent = `${files.length} image(s) • ${(totalSize/1024/1024).toFixed(2)} MB`;
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-bounce">✨</span> <span>Ready to convert! Adjust quality and click the button below.</span>';
      log.style.color = '#60a5fa';
      if (convertBtn) convertBtn.classList.add('animate-pulse-glow');
    }
    updateProgress(0);
  }
  
  async function loadHeic2any() {
    if (window.heic2any) return true;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js';
      script.onload = () => {
        // Give the library a moment to initialize
        setTimeout(() => resolve(true), 100);
      };
      script.onerror = () => reject(new Error('Failed to load heic2any library'));
      document.head.appendChild(script);
    });
  }
  
  async function handleConvert() {
    if (selectedFiles.length === 0) {
      toastr.warning('Please select at least one HEIC image');
      return;
    }
    
    if (convertBtn) {
      convertBtn.disabled = true;
      convertBtn.classList.remove('animate-pulse-glow');
      convertBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    
    if (log) {
      log.innerHTML = '<span class="inline-block animate-spin-slow">⚙️</span> <span>Loading converter library...</span>';
      log.style.color = '#60a5fa';
    }
    updateProgress(5);
    
    try {
      await loadHeic2any();
      
      if (typeof JSZip === 'undefined') {
        throw new Error('ZIP library not loaded');
      }
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">📷</span> <span>Converting HEIC to JPG...</span>';
        log.style.color = '#60a5fa';
      }
      if (stats) stats.textContent = `Images: ${selectedFiles.length} — processing...`;
      updateProgress(10);
      
      const zip = new JSZip();
      const qualityValue = parseFloat(qualitySlider?.value) || 0.9;
      let successCount = 0;
      
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
          successCount++;
          
          const progressPercent = 10 + ((i + 1) / selectedFiles.length) * 85;
          updateProgress(progressPercent);
          if (log) {
            log.innerHTML = `<span class="inline-block animate-bounce">🔄</span> <span>Converting image <strong>${i + 1}</strong> of <strong>${selectedFiles.length}</strong>...</span>`;
            log.style.color = '#60a5fa';
          }
        } catch (err) {
          console.error(`Error converting ${file.name}:`, err);
          if (log) {
            log.innerHTML = `<span class="inline-block">⚠️</span> <span>Warning: Failed to convert <strong>${file.name}</strong>. Skipping...</span>`;
            log.style.color = '#fbbf24';
          }
        }
      }
      
      if (successCount === 0) {
        throw new Error('Failed to convert any images. Please ensure the files are valid HEIC/HEIF images.');
      }
      
      if (log) {
        log.innerHTML = '<span class="inline-block animate-spin-slow">📦</span> <span>Creating ZIP file...</span>';
        log.style.color = '#60a5fa';
      }
      updateProgress(95);
      
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
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
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        saveAs(zipBlob, fileName);
      }
      
      updateProgress(100);
      
      // Show success toastr notification
      toastr.success(`Successfully converted ${successCount} image(s) to JPG!`, 'Conversion Complete', {
        timeOut: 5000
      });
      
      if (log) {
        log.innerHTML = `<span class="inline-block animate-bounce-in">🎉</span> <span>Success! ${selectedFiles.length === 1 ? 'Converted image' : 'ZIP file'} downloaded with <strong>${successCount}</strong> JPG image(s).</span>`;
        log.style.color = '#34d399';
      }
      if (stats) stats.textContent = `✓ Finished: ${successCount} image(s) converted successfully`;
      
      if (typeof trackConversion === 'function') {
        trackConversion(selectedFiles.length);
      }
      
      // Clear and reset the form after a short delay
      setTimeout(() => {
        // Clear file input
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Reset quality slider to default value (0.9)
        // Get fresh references to ensure elements exist
        const qualitySliderElement = document.getElementById('quality-heic-jpg');
        const qualityValueElement = document.getElementById('quality-value-heic-jpg');
        
        if (qualitySliderElement) {
          qualitySliderElement.value = '0.9';
          // Trigger the input event to update the display badge
          const inputEvent = new Event('input', { bubbles: true });
          qualitySliderElement.dispatchEvent(inputEvent);
        }
        // Also update the display directly as a fallback
        if (qualityValueElement) {
          qualityValueElement.textContent = '0.9';
        }
        
        // Reset dropzone
        if (dropzone) {
          dropzone.style.borderColor = '';
          dropzone.style.backgroundColor = '';
        }
        
        // Reset dropzone label
        if (dropLabel) {
          dropLabel.innerHTML = 'Drag & drop your HEIC images here';
        }
        
        // Reset stats
        if (stats) {
          stats.textContent = 'No images selected';
        }
        
        // Reset progress bar
        updateProgress(0);
        
        // Reset log message
        if (log) {
          log.innerHTML = '<span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your HEIC images';
          log.style.color = '';
        }
        
        // Clear selected files
        selectedFiles = [];
      }, 3000);
    } catch (err) {
      console.error(err);
      if (log) {
        log.innerHTML = `<span class="inline-block">❌</span> <span>Error: ${err.message || err}. Make sure the files are valid HEIC/HEIF images.</span>`;
        log.style.color = '#f87171';
      }
      if (stats) stats.textContent = '✗ Conversion failed';
      updateProgress(0);
      toastr.error(`Conversion failed: ${err.message || err}`);
    } finally {
      if (convertBtn) {
        convertBtn.disabled = false;
        convertBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      }
    }
  }
  
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileChange);
  if (convertBtn) convertBtn.addEventListener('click', handleConvert);
  if (qualitySlider) {
    qualitySlider.addEventListener('input', handleQualityChange);
    // Initialize quality value display
    handleQualityChange();
  }
}





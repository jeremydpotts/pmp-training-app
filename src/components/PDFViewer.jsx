import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';

function PDFViewer({ pdfUrl, title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const iframeRef = useRef(null);
  const pageInputRef = useRef(null);
  const prevPdfUrlRef = useRef(pdfUrl);

  // Reset state when PDF changes
  useEffect(() => {
    if (prevPdfUrlRef.current !== pdfUrl) {
      prevPdfUrlRef.current = pdfUrl;
      // Reset viewer state when PDF changes - this is intentional
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(1);
      setZoom(100);
      setRotation(0);
    }
  }, [pdfUrl]);

  const goToPage = useCallback((page) => {
    const pageNum = parseInt(page);
    if (!isNaN(pageNum) && pageNum >= 1) {
      setCurrentPage(pageNum);
    }
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 25, 200));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 25, 50));
  }, []);

  useEffect(() => {
    // Update iframe URL with page number
    if (iframeRef.current && pdfUrl) {
      const url = `${pdfUrl}#page=${currentPage}&zoom=${zoom}`;
      iframeRef.current.src = url;
    }
  }, [currentPage, pdfUrl, zoom]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if not typing in input
      if (document.activeElement.tagName === 'INPUT') return;
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext, handleZoomIn, handleZoomOut]);

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'document.pdf';
    link.click();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation Controls */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage <= 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage <= 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
            <input
              ref={pageInputRef}
              type="number"
              min="1"
              max={999}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (!isNaN(page)) goToPage(page);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur();
                }
              }}
              className="w-16 text-center bg-transparent border-none focus:outline-none font-semibold"
              aria-label="Current page number"
            />
            <span className="text-gray-600">page</span>
          </div>
          
          <button
            onClick={handleNext}
            className="p-2 rounded-lg transition-colors bg-primary-100 text-primary-700 hover:bg-primary-200"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className={`p-2 rounded-lg transition-colors ${
              zoom <= 50
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          
          <span className="text-sm font-semibold text-gray-700 min-w-[60px] text-center">
            {zoom}%
          </span>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className={`p-2 rounded-lg transition-colors ${
              zoom >= 200
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleRotate}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label="Rotate"
          >
            <RotateCw className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            aria-label="Download PDF"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 relative bg-gray-100 overflow-hidden">
        <motion.div
          key={`${currentPage}-${zoom}-${rotation}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="h-full w-full"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <iframe
            ref={iframeRef}
            src={`${pdfUrl}#page=${currentPage}&zoom=${zoom}`}
            title={title}
            className="w-full h-full border-0"
            allow="fullscreen"
            onLoad={() => {
              // Try to get total pages from iframe (may not work due to CORS)
              // This is a fallback - the actual page count detection would need PDF.js
            }}
          />
        </motion.div>
        {/* Keyboard hint */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
          Use arrow keys to navigate pages
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;


'use client';

import { useState, useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  images: string[];
}

export default function ImageModal({ isOpen, onClose, clientName, images }: ImageModalProps) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  const goToNext = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((fullscreenIndex + 1) % images.length);
    }
  };

  const goToPrevious = () => {
    if (fullscreenIndex !== null) {
      setFullscreenIndex((fullscreenIndex - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenIndex !== null) {
        if (e.key === 'Escape') {
          setFullscreenIndex(null);
        } else if (e.key === 'ArrowLeft') {
          setFullscreenIndex((prev) => {
            if (prev !== null) {
              return (prev - 1 + images.length) % images.length;
            }
            return prev;
          });
        } else if (e.key === 'ArrowRight') {
          setFullscreenIndex((prev) => {
            if (prev !== null) {
              return (prev + 1) % images.length;
            }
            return prev;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenIndex, images.length]);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{clientName}</h3>
            <button className="close-button" onClick={onClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="modal-body">
            {images.length > 0 ? (
              <div className="image-gallery">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="gallery-item"
                    onClick={() => openFullscreen(index)}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={image} alt={`${clientName} ${index + 1}`} />
                    <div className="gallery-item-overlay">
                      <i className="bi bi-arrows-fullscreen"></i>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No images available for this client.</p>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {fullscreenIndex !== null && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <button className="fullscreen-close" onClick={closeFullscreen}>
            <i className="bi bi-x-lg"></i>
          </button>

          {images.length > 1 && (
            <>
              <button
                className="fullscreen-nav fullscreen-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="fullscreen-nav fullscreen-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </>
          )}

          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[fullscreenIndex]}
              alt={`${clientName} ${fullscreenIndex + 1}`}
            />
          </div>

          <div className="fullscreen-counter">
            {fullscreenIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          max-width: 90vw;
          max-height: 90vh;
          overflow: hidden;
          width: 900px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
          margin: 0;
          color: #333;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }

        .close-button:hover {
          color: #333;
        }

        .modal-body {
          padding: 1rem;
          max-height: 70vh;
          overflow-y: auto;
        }

        .image-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .gallery-item:hover {
          transform: scale(1.05);
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-item-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item-overlay i {
          color: white;
          font-size: 2rem;
        }

        .gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        /* Fullscreen Viewer Styles */
        .fullscreen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .fullscreen-content {
          max-width: 95vw;
          max-height: 95vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fullscreen-content img {
          max-width: 100%;
          max-height: 95vh;
          object-fit: contain;
          user-select: none;
        }

        .fullscreen-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid white;
          color: white;
          font-size: 1.5rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2001;
        }

        .fullscreen-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .fullscreen-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid white;
          color: white;
          font-size: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2001;
        }

        .fullscreen-nav:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .fullscreen-prev {
          left: 20px;
        }

        .fullscreen-next {
          right: 20px;
        }

        .fullscreen-counter {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 1rem;
          font-weight: 500;
          z-index: 2001;
        }

        @media (max-width: 768px) {
          .fullscreen-nav {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .fullscreen-prev {
            left: 10px;
          }

          .fullscreen-next {
            right: 10px;
          }

          .fullscreen-close {
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}
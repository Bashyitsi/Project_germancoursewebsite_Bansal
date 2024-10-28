'use client'
import { useState, useEffect, useCallback } from 'react'
import { Heart, Download, Share2, X } from 'lucide-react'
import { galleryImages, type GalleryImage } from './imageData'

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const closeLightbox = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setSelectedImage(null)
      setIsAnimating(false)
    }, 300)
  }

  const navigateImages = useCallback((direction: 'next' | 'prev') => {
    if (!selectedImage) return

    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id)
    let newIndex

    if (direction === 'next') {
      newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    }

    setIsAnimating(true)
    setTimeout(() => {
      setSelectedImage(galleryImages[newIndex])
      setIsAnimating(false)
    }, 150)
  }, [selectedImage])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowRight':
          navigateImages('next')
          break
        case 'ArrowLeft':
          navigateImages('prev')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, navigateImages])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">STUDENTS</h1>
        <div className="flex space-x-4">
          <button className="hover:scale-110 transition-transform" aria-label="Like gallery">
            <Heart className="w-6 h-6" />
          </button>
          <button className="hover:scale-110 transition-transform" aria-label="Download gallery">
            <Download className="w-6 h-6" />
          </button>
          <button className="hover:scale-110 transition-transform" aria-label="Share gallery">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={`${
              index < 4 ? 'col-span-1 md:col-span-2 lg:col-span-1' : ''
            } cursor-pointer transform transition-transform hover:scale-105`}
            onClick={() => openLightbox(image)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openLightbox(image)
              }
            }}
            aria-label={`View ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
          onClick={closeLightbox}
        >
          <div
            className="max-w-4xl w-full p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => navigateImages('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                aria-label="Previous image"
              >
                ←
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className={`w-full h-auto object-contain rounded-lg ${
                  isAnimating ? 'scale-95' : 'scale-100'
                } transition-transform duration-300`}
              />

              <button
                onClick={() => navigateImages('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                aria-label="Next image"
              >
                →
              </button>

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-4 text-center text-white">
              <p className="mb-2">{`Image ${galleryImages.findIndex(img => img.id === selectedImage.id) + 1} of ${galleryImages.length}`}</p>
              <button
                onClick={closeLightbox}
                className="bg-white text-black py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

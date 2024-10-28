'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Heart, Download, Share2, X } from 'lucide-react'

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; id: number } | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // This would typically come from an API or database
  const images = [
    { id: 1, src: '/placeholder.svg?height=400&width=600', alt: 'Group photo 1' },
    { id: 2, src: '/placeholder.svg?height=400&width=600', alt: 'Group photo 2' },
    { id: 3, src: '/placeholder.svg?height=400&width=600', alt: 'Group photo 3' },
    { id: 4, src: '/placeholder.svg?height=400&width=600', alt: 'Group photo 4' },
    { id: 5, src: '/placeholder.svg?height=300&width=400', alt: 'Classroom scene 1' },
    { id: 6, src: '/placeholder.svg?height=300&width=400', alt: 'Classroom scene 2' },
    { id: 7, src: '/placeholder.svg?height=300&width=400', alt: 'Classroom scene 3' },
    { id: 8, src: '/placeholder.svg?height=300&width=400', alt: 'Classroom scene 4' },
  ]

  const openLightbox = (image: typeof images[0]) => {
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

    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
    let newIndex

    if (direction === 'next') {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    }

    setIsAnimating(true)
    setTimeout(() => {
      setSelectedImage(images[newIndex])
      setIsAnimating(false)
    }, 150)
  }, [selectedImage, images])

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
        {images.map((image, index) => (
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
            <Image
              src={image.src}
              alt={image.alt}
              width={index < 4 ? 600 : 400}
              height={index < 4 ? 400 : 300}
              className="w-full h-auto object-cover rounded-lg"
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

              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
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
              <p className="mb-2">{`Image ${images.findIndex(img => img.id === selectedImage.id) + 1} of ${images.length}`}</p>
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

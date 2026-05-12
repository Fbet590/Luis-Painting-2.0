"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  {
    category: "Dark Cabinet Refinishing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fredibetancourth_Realistic_modern_kitchen_interior_in_a_middle-_6381401c-9a3c-4e12-b21e-8b8f4982f016-2DtUNTjGoeBDuTKKkjFRpOwhKiwn6n.png",
  },
  {
    category: "Light Gray Cabinets",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fredibetancourth_Realistic_modern_kitchen_interior_in_a_small_c_44862917-2ed6-4f94-a134-ecd6e684a957-OMHycb2oyuhV6RtkHDRQqwcTaaMab8.png",
  },
  {
    category: "Cream Cabinet Finish",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Dec%2030%2C%202025%20at%2004_26_59%20PM-DTcgp24OAKWl654YFxhKQ8zGPZMy4l.png",
  },
  {
    category: "White Pantry Cabinets",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_oc8o2boc8o2boc8o.png-U7XjWhOPgwgAg0Nhg9vE8XjtH20Jda.jpeg",
  },
  {
    category: "Cream Kitchen Cabinets",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_7cjcur7cjcur7cjc.png-t9jSH4dyLjQ6njm0ondFQuFee0hHth.jpeg",
  }
]

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToForm = () => {
    document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            See Our Stunning Results
          </span>
          <h2 className="font-serif font-bold text-[calc(1.875rem+4px)] sm:text-[calc(2.25rem+4px)] lg:text-[calc(3rem+4px)] text-foreground mt-3 mb-4 text-balance">
            Explore Our Recent Transformations
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Imagine the possibilities for your own home. From complete interior refreshes 
            to stunning exterior makeovers and cabinet refinishing.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {galleryImages.map((item, index) => (
            <button 
              key={item.category}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer text-left"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.category}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay with category */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                <h3 className="text-card font-semibold text-lg">{item.category}</h3>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button 
            onClick={scrollToForm}
            size="lg" 
            className="h-14 px-8 text-lg"
          >
            Start Your Transformation
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black/95 border-none">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={galleryImages[currentIndex].image}
                alt={galleryImages[currentIndex].category}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Caption and Indicators */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-semibold text-xl text-center mb-4">
                {galleryImages[currentIndex].category}
              </h3>
              <div className="flex justify-center gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-accent" : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

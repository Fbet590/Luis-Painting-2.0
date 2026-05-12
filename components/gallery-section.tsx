"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

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
  }
]

export function GallerySection() {
  const scrollToForm = () => {
    document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' })
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
          {galleryImages.map((item) => (
            <div 
              key={item.category}
              className="group relative overflow-hidden rounded-2xl"
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
            </div>
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
    </section>
  )
}

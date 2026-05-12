"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const transformations = [
  {
    category: "Cabinet Refinishing",
    before: "/images/gallery/cabinet-before.jpg",
    after: "/images/gallery/cabinet-after.jpg",
  },
  {
    category: "Interior Painting",
    before: "/images/gallery/interior-before.jpg",
    after: "/images/gallery/interior-after.jpg",
  },
  {
    category: "Exterior Painting",
    before: "/images/gallery/exterior-before.jpg",
    after: "/images/gallery/exterior-after.jpg",
  }
]

export function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
          {transformations.map((item, index) => (
            <div 
              key={item.category}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Before Image (default) */}
              <div className={`relative aspect-[4/3] transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                  src={item.before}
                  alt={`${item.category} - Before`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm font-medium">
                  Before
                </div>
              </div>
              
              {/* After Image (on hover) */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={item.after}
                  alt={`${item.category} - After`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  After
                </div>
              </div>

              {/* Overlay with category */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                <h3 className="text-card font-semibold text-lg">{item.category}</h3>
                <p className="text-card/80 text-sm">Hover to see the transformation</p>
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

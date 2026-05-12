"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Sarah M.",
    location: "Local Homeowner",
    rating: 5,
    text: "Luis Painting transformed our entire home! They were professional, on time, and the quality of work exceeded our expectations. The crew was respectful of our space and left everything spotless. We'll definitely be using them again!",
    project: "Full Interior Repaint"
  },
  {
    name: "Michael R.",
    location: "Local Homeowner",
    rating: 5,
    text: "I've had several painting companies out over the years, but these guys are the best by far. They showed up when they said they would, gave me a fair quote with no hidden fees, and the finished product looks amazing. Highly recommend!",
    project: "Exterior Painting"
  },
  {
    name: "Jennifer L.",
    location: "Local Homeowner",
    rating: 5,
    text: "From the initial estimate to the final walkthrough, the experience was seamless. The team helped us choose the perfect colors and the attention to detail was incredible. Our cabinets look brand new!",
    project: "Cabinet Refinishing"
  },
  {
    name: "David & Lisa K.",
    location: "Local Homeowner",
    rating: 5,
    text: "We had a tight deadline before our holiday party and Luis Painting made it happen. They worked efficiently without cutting corners. Everyone at our party complimented how great the house looked!",
    project: "Living Room & Kitchen"
  },
  {
    name: "Robert T.",
    location: "Local Homeowner",
    rating: 5,
    text: "Outstanding work on our property. The professionalism and quality were top-notch. Clear communication throughout and the finished result exceeded our expectations.",
    project: "Full Home Repaint"
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Customer Reviews
          </span>
          <h2 className="font-serif font-bold text-[calc(1.875rem+4px)] sm:text-[calc(2.25rem+4px)] lg:text-[calc(3rem+4px)] text-foreground mt-3 mb-4">
            See Why Your Neighbors Love Us
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-primary fill-primary" />
              ))}
            </div>
            <span className="text-foreground font-semibold">4.9/5</span>
            <span className="text-muted-foreground">based on 500+ reviews</span>
          </div>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg relative">
            {/* Google Icon */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <Quote className="w-12 h-12 text-primary/20 mb-6" />
            
            <div className="min-h-[200px]">
              <p className="text-lg md:text-xl text-card-foreground leading-relaxed mb-8">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="font-semibold text-card-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
                  {testimonials[currentIndex].project}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border hover:bg-muted-foreground"
                  }`}
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>

        {/* Review Platforms */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">As seen on</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* Google */}
            <div className="flex items-center">
              <Image
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google Reviews"
                width={92}
                height={30}
                className="h-7 w-auto"
              />
            </div>
            {/* Instagram */}
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512"
                className="h-8 w-8"
              >
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFDC80" />
                    <stop offset="25%" stopColor="#F77737" />
                    <stop offset="50%" stopColor="#E1306C" />
                    <stop offset="75%" stopColor="#C13584" />
                    <stop offset="100%" stopColor="#833AB4" />
                  </linearGradient>
                </defs>
                <path 
                  fill="url(#instagram-gradient)" 
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </div>
            {/* Angi */}
            <div className="flex items-center">
              <Image
                src="/images/logos/angi.png"
                alt="Angi Reviews"
                width={100}
                height={40}
                className="h-10 w-auto mix-blend-multiply"
              />
            </div>
            {/* Houzz */}
            <div className="flex items-center">
              <Image
                src="/images/logos/houzz.png"
                alt="Houzz"
                width={40}
                height={50}
                className="h-12 w-auto mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

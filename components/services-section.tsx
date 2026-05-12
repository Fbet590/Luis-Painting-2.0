"use client"

import Image from "next/image"
import { ArrowRight, Paintbrush, Home, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Home,
    title: "Interior Painting",
    description: "Breathe new life into your home with clean, modern colors and a flawless finish that transforms every room.",
    features: ["Walls & Ceilings", "Trim & Baseboards", "Accent Walls", "Color Consultation"],
    image: "/images/interior-painting.jpg",
    cta: "Transform Your Interior"
  },
  {
    icon: Paintbrush,
    title: "Exterior Painting",
    description: "Boost curb appeal and protect your home with weather-resistant, long-lasting paint applied by professionals who get it right the first time.",
    features: ["Full Exterior", "Trim & Shutters", "Doors & Windows", "Weather Protection"],
    image: "/images/exterior-painting.jpg",
    cta: "Boost Your Curb Appeal"
  },
  {
    icon: Wrench,
    title: "Cabinet Refinishing",
    description: "Give your kitchen or bathroom a high-end upgrade with beautifully refinished cabinets, without the cost of a full remodel.",
    features: ["Kitchen Cabinets", "Bathroom Vanities", "Custom Finishes", "Hardware Options"],
    image: "/images/hero-painting.jpg",
    cta: "Refresh Your Cabinets"
  }
]

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Expert Services
          </span>
          <h2 className="font-serif font-bold text-[calc(1.875rem+4px)] sm:text-[calc(2.25rem+4px)] lg:text-[calc(3rem+4px)] text-foreground mt-3 mb-4 text-balance">
            It&apos;s Time to Give Your Home the Finish It Deserves
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From interiors to exteriors to cabinet refinishing, we deliver flawless finishes 
            and reliable, professional service.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div 
              key={service.title}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-2xl text-card">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-card-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild 
                  className="group/btn w-full"
                  onClick={() => document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <a href="#estimate">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

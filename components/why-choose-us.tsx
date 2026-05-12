"use client"

import { Shield, Award, Clock, Smile, Leaf, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

const reasons = [
  {
    icon: Shield,
    title: "Clear, Upfront Pricing",
    description: "No hidden costs or surprise delays. You'll know exactly what to expect before we start any work."
  },
  {
    icon: Award,
    title: "Proven Expertise & Stunning Results",
    description: "With 10+ years of experience, we deliver flawless finishes that transform your home beautifully."
  },
  {
    icon: Clock,
    title: "Communication You Can Count On",
    description: "We keep you updated every step of the way. Clear timelines and responsive communication."
  },
  {
    icon: Smile,
    title: "Expert Paint Guidance",
    description: "Not sure which colors to choose? We'll help you select the perfect palette for your space."
  },
  {
    icon: Leaf,
    title: "Professional, Reliable Service",
    description: "We show up on time, treat your home with care, and leave it cleaner than we found it."
  },
  {
    icon: Wrench,
    title: "Satisfaction Guaranteed",
    description: "We proudly stand behind our craftsmanship with a satisfaction guarantee for your peace of mind."
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-serif font-bold text-[calc(1.875rem+4px)] sm:text-[calc(2.25rem+4px)] lg:text-[calc(3rem+4px)] text-foreground mt-3 mb-4 text-balance">
            Choosing a Painter Doesn&apos;t Have to Be Stressful
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            No more endless searching, hidden costs, or surprise delays. 
            Here&apos;s why homeowners trust Luis Painting LLC:
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason) => (
            <div 
              key={reason.title}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <reason.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-xl text-card-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="h-14 px-8 text-lg"
            onClick={() => document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Your Free Estimate
          </Button>
        </div>
      </div>
    </section>
  )
}

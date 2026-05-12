"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  const scrollToForm = () => {
    document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif font-bold text-[calc(1.875rem+4px)] sm:text-[calc(2.25rem+4px)] lg:text-[calc(3rem+4px)] text-primary-foreground mb-4 text-balance">
          Ready to Give Your Home a Fresh Look?
        </h2>
        <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
          Get your free quote today. No obligation, no pressure — just honest advice 
          and clear, upfront pricing from Luis Painting LLC.
        </p>

        <Button 
          onClick={scrollToForm}
          size="lg"
          className="h-14 px-8 text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Request Your Free Quote
        </Button>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-primary-foreground/80 text-sm">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Free Estimates
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            100% Satisfaction Guaranteed
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            10+ Years Experience
          </span>
        </div>
      </div>
    </section>
  )
}

import { Star, Shield, CheckCircle2 } from "lucide-react"
import { MultiStepForm } from "@/components/multi-step-form"

export function HeroSection() {
  return (
    <section id="estimate" className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-painting.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-card">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 fill-current" />
                10+ Years Experience
              </span>
              <span className="inline-flex items-center gap-1.5 bg-card/20 text-card backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Premium Quality
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-bold text-[50px] sm:text-[40px] leading-tight mb-4 text-balance">
              Kitchen Cabinets Repainted For $2,000.<br />
              <span className="text-accent">Not $20,000.</span>
            </h1>

            <p className="text-lg sm:text-xl text-card/90 mb-6 max-w-xl leading-relaxed">
              High-quality paint. Stress-free experience.
            </p>

            {/* Quick Benefits */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-8">
              {[
                "Clear, Upfront Pricing",
                "Proven Expertise",
                "Satisfaction Guaranteed"
              ].map((benefit) => (
                <span key={benefit} className="flex items-center gap-2 text-card/90 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Right Form - Multi-step */}
          <MultiStepForm />
        </div>
      </div>
    </section>
  )
}

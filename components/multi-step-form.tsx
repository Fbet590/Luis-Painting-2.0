"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle2, Home, Paintbrush, CookingPot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, unknown>) => void
  }
}

interface FormData {
  service: string
  budget: string
  flexibility: string
  name: string
  email: string
  phone: string
}

const steps = [
  { id: 1, title: "Service Type" },
  { id: 2, title: "Budget" },
  { id: 3, title: "Flexibility" },
  { id: 4, title: "Name" },
  { id: 5, title: "Email" },
  { id: 6, title: "Phone" },
]

const serviceOptions = [
  { value: "cabinet", label: "Refinishing / Repainting Kitchen Cabinets", icon: CookingPot },
  { value: "exterior", label: "Exterior Painting", icon: Home },
  { value: "interior", label: "Interior Painting", icon: Paintbrush },
]

const budgetOptions = [
  { value: "1000-2000", label: "$1,000 - $2,000" },
  { value: "2000-4000", label: "$2,000 - $4,000" },
  { value: "4000+", label: "$4,000 +" },
]

const flexibilityOptions = [
  { value: "yes", label: "Yes, I prefer premium quality even if the cost increases slightly" },
  { value: "maybe", label: "Maybe, depends on the options presented" },
  { value: "no", label: "No, I have a fixed budget" },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    service: "",
    budget: "",
    flexibility: "",
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const payload = {
      service: formData.service,
      budget: formData.budget,
      flexibility: formData.flexibility,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (result.success) {
        // Track Facebook Pixel Lead event
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_name: formData.service,
            content_category: "Painting Service",
            value: formData.budget,
            currency: "USD",
          })
        }
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.service !== ""
      case 2: return formData.budget !== ""
      case 3: return formData.flexibility !== ""
      case 4: return formData.name.trim() !== ""
      case 5: return formData.email.trim() !== "" && formData.email.includes("@")
      case 6: return formData.phone.trim() !== ""
      default: return false
    }
  }

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-2xl text-center">
        <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
        <h3 className="font-serif font-bold text-[calc(1.5rem+4px)] sm:text-[calc(1.875rem+4px)] text-card-foreground mb-3">
          Thank You, {formData.name}!
        </h3>
        <p className="text-muted-foreground text-lg mb-2">
          We&apos;ve received your request.
        </p>
        <p className="text-muted-foreground">
          A member of our team will contact you within 24 hours to discuss your {formData.service === "cabinet" ? "cabinet refinishing" : formData.service === "exterior" ? "exterior painting" : "interior painting"} project.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif font-bold text-[calc(1.5rem+4px)] sm:text-[calc(1.875rem+4px)] text-card-foreground mb-2">
          Get Your Free Quote
        </h2>
        <p className="text-muted-foreground text-sm">
          Step {currentStep} of {steps.length}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="min-h-[280px]">
        {/* Step 1: Service Type */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <p className="text-card-foreground font-medium text-lg text-center mb-6">
              What kind of painting service are you looking for?
            </p>
            <div className="space-y-3">
              {serviceOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, service: option.value })}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                      formData.service === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                      formData.service === option.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-card-foreground">{option.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <p className="text-card-foreground font-medium text-lg text-center mb-6">
              What&apos;s your approximate budget for this project?
            </p>
            <div className="space-y-3">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, budget: option.value })}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all text-center font-medium",
                    formData.budget === option.value
                      ? "border-primary bg-primary/5 text-card-foreground"
                      : "border-border hover:border-primary/50 hover:bg-muted/50 text-card-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Flexibility */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <p className="text-card-foreground font-medium text-lg text-center mb-6">
              Are you flexible with your budget?
            </p>
            <div className="space-y-3">
              {flexibilityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, flexibility: option.value })}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all text-left font-medium",
                    formData.flexibility === option.value
                      ? "border-primary bg-primary/5 text-card-foreground"
                      : "border-border hover:border-primary/50 hover:bg-muted/50 text-card-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Name */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <p className="text-card-foreground font-medium text-lg text-center mb-6">
              Enter your name:
            </p>
            <Input
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-14 text-lg text-center"
              autoFocus
            />
          </div>
        )}

        {/* Step 5: Email */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <p className="text-card-foreground font-medium text-lg text-center mb-6">
              What&apos;s your email address?
            </p>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-14 text-lg text-center"
              autoFocus
            />
          </div>
        )}

        {/* Step 6: Phone */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <p className="text-card-foreground font-medium text-lg text-center mb-6">
              What&apos;s the best mobile number to reach you on?
            </p>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-14 text-lg text-center"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={cn(
            "flex items-center gap-2",
            currentStep === 1 && "invisible"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        )}
      </div>
    </div>
  )
}

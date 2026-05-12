"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
  { id: 1, title: "Name" },
  { id: 2, title: "Email" },
  { id: 3, title: "Phone" },
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
      case 1: return formData.name.trim() !== ""
      case 2: return formData.email.trim() !== "" && formData.email.includes("@")
      case 3: return formData.phone.trim() !== ""
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
        <h2 className="font-serif font-bold text-[calc(1.25rem+4px)] sm:text-[calc(1.5rem+4px)] text-card-foreground mb-3">
          See If Your Kitchen Qualifies For The $2,000 Repaint Package
        </h2>
        <div className="w-full h-px bg-border mb-3" />
        <p className="text-muted-foreground text-sm leading-relaxed">
          Every kitchen is different. Some don&apos;t qualify — but most do! Fill out our 17-second form. No Commitment.
        </p>
        <p className="text-muted-foreground text-xs mt-2">
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
      <div className="min-h-[200px]">
        {/* Step 1: Name */}
        {currentStep === 1 && (
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

        {/* Step 2: Email */}
        {currentStep === 2 && (
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

        {/* Step 3: Phone */}
        {currentStep === 3 && (
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

"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
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
  { id: 1, title: "Name" },
  { id: 2, title: "Email" },
  { id: 3, title: "Phone" },
]

// Email validation - checks for valid format and blocks common fake/temporary email domains
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) return false
  
  // Block common fake/temporary email domains
  const blockedDomains = [
    'tempmail.com', 'throwaway.com', 'fakeinbox.com', 'mailinator.com',
    'guerrillamail.com', 'sharklasers.com', '10minutemail.com', 'trashmail.com',
    'yopmail.com', 'getnada.com', 'temp-mail.org', 'dispostable.com',
    'maildrop.cc', 'mohmal.com', 'emailondeck.com', 'tempail.com',
    'test.com', 'example.com', 'fake.com', 'asdf.com', 'qwerty.com'
  ]
  
  const domain = email.split('@')[1]?.toLowerCase()
  if (blockedDomains.includes(domain)) return false
  
  return true
}

// Phone validation - must be at least 10 digits (US format)
const isValidPhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '')
  
  // Must have at least 10 digits for US phone numbers
  if (digitsOnly.length < 10) return false
  
  // Block obvious fake patterns
  const fakePatterns = [
    '0000000000', '1111111111', '2222222222', '3333333333', '4444444444',
    '5555555555', '6666666666', '7777777777', '8888888888', '9999999999',
    '1234567890', '0987654321', '1234512345', '5555551234', '0000000001'
  ]
  
  if (fakePatterns.includes(digitsOnly) || fakePatterns.includes(digitsOnly.slice(-10))) return false
  
  // Block numbers starting with 0 or 1 (invalid US area codes)
  if (digitsOnly.length === 10 && (digitsOnly[0] === '0' || digitsOnly[0] === '1')) return false
  
  return true
}



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
      case 1: return formData.name.trim() !== "" && formData.name.trim().length >= 2
      case 2: return isValidEmail(formData.email.trim())
      case 3: return isValidPhone(formData.phone)
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
          A member of our team will contact you within a couple mins so keep an eye out!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-serif font-bold text-[calc(1.25rem+9px)] sm:text-[calc(1.5rem+4px)] text-card-foreground mb-3">
          See If Your Kitchen Qualifies For The <span className="text-accent">$2,000 Repaint Package</span>
        </h2>
        <div className="w-full h-px bg-border mb-3" />
        <p className="text-muted-foreground text-base sm:text-sm leading-relaxed">
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
      <div className="min-h-[140px]">
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
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
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

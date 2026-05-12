"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Most residential projects are completed within 2-5 days, depending on the size and scope. We'll provide a clear timeline before we start and keep you updated every step of the way."
  },
  {
    question: "Do I need to move furniture or prep the area before you arrive?",
    answer: "No worries, we take care of all the prep work. We'll move and cover furniture, protect your floors, and ensure everything is clean and ready before we begin."
  },
  {
    question: "Are your projects covered by a warranty or guarantee?",
    answer: "Absolutely! We proudly stand behind our craftsmanship with a satisfaction guarantee, ensuring your complete peace of mind."
  },
  {
    question: "What's the difference between your service tiers?",
    answer: "We offer options to fit different budgets. Our standard service uses quality materials and professional application. Our premium tier includes top-of-the-line paints for enhanced durability and finish. We'll discuss all options during your free quote."
  },
  {
    question: "How do I choose the right colors?",
    answer: "Not sure which colors to choose? We provide expert guidance to help you select the perfect palette that complements your home's style and your personal preferences."
  }
]

export function FaqSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="font-serif font-bold text-[calc(1.875rem+4px)] sm:text-[calc(2.25rem+4px)] lg:text-[calc(3rem+4px)] text-foreground mt-3 mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about our painting services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card rounded-xl border border-border px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <a 
            href="#estimate"
            className="text-primary hover:underline font-semibold text-lg"
          >
            Get a free quote and we&apos;ll answer all your questions
          </a>
        </div>
      </div>
    </section>
  )
}

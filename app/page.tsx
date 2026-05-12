import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustBadges } from "@/components/trust-badges"

import { TestimonialsSection } from "@/components/testimonials-section"
import { GallerySection } from "@/components/gallery-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Header />
      <div id="estimate">
        <HeroSection />
      </div>
      <TrustBadges />
      <div id="reviews">
        <TestimonialsSection />
      </div>
      <div id="gallery">
        <GallerySection />
      </div>
      <div id="faq">
        <FaqSection />
      </div>
      <CtaSection />
      <Footer />
    </main>
  )
}

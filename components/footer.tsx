import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image 
                src="/images/logo.png" 
                alt="Luis Painting LLC" 
                width={160} 
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-background/70 mb-4 leading-relaxed">
              Give your home a fresh look that lasts for years. High-quality paint and 
              a stress-free experience.
            </p>
            <div className="flex items-center gap-2 text-background/70 text-sm">
              <span>10+ Years Experience</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Interior Painting",
                "Exterior Painting",
                "Cabinet Refinishing",
                "Color Consultation"
              ].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-background/70 hover:text-background transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Why Choose Us</h3>
            <ul className="space-y-2">
              {[
                "10+ Years Experience",
                "Clear Upfront Pricing",
                "Satisfaction Guaranteed",
                "Expert Guidance",
                "Professional Service"
              ].map((reason) => (
                <li key={reason}>
                  <a href="#why-us" className="text-background/70 hover:text-background transition-colors">
                    {reason}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Luis Painting LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

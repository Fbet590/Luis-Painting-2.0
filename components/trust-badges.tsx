import { Award, Shield, Clock, ThumbsUp } from "lucide-react"

const badges = [
  {
    icon: Award,
    stat: "10+",
    label: "Years Experience"
  },
  {
    icon: ThumbsUp,
    stat: "100%",
    label: "Satisfaction Guaranteed"
  },
  {
    icon: Shield,
    stat: "Premium",
    label: "Quality Materials"
  },
  {
    icon: Clock,
    stat: "2-5 Days",
    label: "Project Completion"
  }
]

export function TrustBadges() {
  return (
    <section className="bg-card border-y border-border py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge) => (
            <div key={badge.label} className="text-center">
              <badge.icon className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-card-foreground mb-1">
                {badge.stat}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

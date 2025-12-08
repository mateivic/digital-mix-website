"use client"
import { MessageSquareDot, Target, Palette, BarChart3 } from "lucide-react"

const WhyUs = () => {
  const reasons = [
    {
      title: "Profesionalan pristup",
      subtitle: "i jasna komunikacija",
      icon: MessageSquareDot,
    },
    {
      title: "Prilagodba",
      subtitle: "tvojim ciljevima i budžetu",
      icon: Target,
    },
    {
      title: "Kreativnost",
      subtitle: "koja se vidi",
      icon: Palette,
    },
    {
      title: "Rezultati",
      subtitle: "koji se mjere",
      icon: BarChart3,
    },
  ]

  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div
        className="absolute top-20 left-20 w-48 h-48 rounded-full opacity-15 pointer-events-none"
        style={{ backgroundColor: "#dc7d12", animation: "float 8s ease-in-out infinite 1s" }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center leading-tight" style={{ color: "#393536" }}>
          Zašto <span style={{ color: "#dc7d12" }}>DigitalMix</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 group"
              style={{
                animation: `slideInUp 0.6s ease-out ${0.1 * index}s forwards`,
                opacity: 0,
              }}
            >
              {/* Icon container with orange background */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: "#dc7d12" }}
              >
                <IconComponent className="w-7 h-7" style={{ color: "white" }} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-2" style={{ color: "#000000" }}>
                {reason.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm" style={{ color: "#6b7280" }}>
                {reason.subtitle}
              </p>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}

export default WhyUs

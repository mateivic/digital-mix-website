"use client"

import { useState } from "react"
import { Share2, Camera, Zap, Network, Instagram, TrendingUp, Heart, Facebook, Megaphone } from "lucide-react"

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const services = [
    {
      id: 1,
      icon: Share2,
      title: "Vođenje društvenih mreža",
      intro: "Potpuno preuzimamo upravljanje tvojim profilima kako bi bili profesionalni i konzistentni.",
      bullets: [
        "Potpuno preuzimamo upravljanje tvojim profilima",
        "Planiranje, objavljivanje, komunikacija s publikom i analitika",
        "Mogućnost vođenja samo na temelju materijala koje ti šalješ",
      ],
    },
    {
      id: 2,
      icon: Camera,
      title: "Kreiranje sadržaja",
      intro: "Vizualni sadržaj je srce uspješnog marketinga. Kreiramo sadržaj koji privlači i angažira.",
      bullets: [
        "Profesionalno fotografiranje i snimanje",
        "Reels, kratki promo videi, lifestyle i produkt fotografija",
        "Sadržaj prilagođen tvojoj ciljnoj skupini i brendu",
      ],
    },
    {
      id: 3,
      icon: Megaphone,
      title: "Meta oglasi (Facebook & Instagram Ads)",
      intro: "Dosegni nove kupce kroz precizno ciljane Meta oglase koji donose rezultate.",
      bullets: [
        "Izrada strategije i ciljanje publike",
        "Kreiranje oglasa, optimizacija i izvještaji",
        "Povećanje dosega, prodaje i vidljivosti",
      ],
    },
    {
      id: 4,
      icon: Network,
      title: "Suradničke usluge",
      intro:
        "Kako bi tvoje digitalno poslovanje bilo zaokruženo i profesionalno, kroz mrežu provjerenih suradnika nudimo i:",
      bullets: [
        "Web dizajn i izradu web stranica",
        "Razvoj aplikacija",
        "Rješenja za digitalizaciju i optimizaciju poslovanja",
      ],
    },
  ]

  const floatingIcons = [
    { Icon: Instagram, top: "12%", left: "3%", delay: 0, size: 30 },
    { Icon: TrendingUp, top: "35%", right: "5%", delay: 1.5, size: 24 },
    { Icon: Heart, bottom: "20%", left: "5%", delay: 2.5, size: 23 },
    { Icon: Facebook, bottom: "10%", right: "8%", delay: 0.8, size: 32 },
  ]

  return (
    <section id="usluge" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute opacity-10 pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            animation: `float ${4 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <item.Icon size={item.size} style={{ color: "#dc7d12" }} />
        </div>
      ))}

      <div
        className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-10  pointer-events-none"
        style={{ backgroundColor: "#dc7d12", animation: "float 8s ease-in-out infinite 1s" }}
      />
      <div
        className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-15  pointer-events-none"
        style={{ backgroundColor: "#ffb873", animation: "float 8s ease-in-out infinite 1s" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: "#393536" }}>
            Što nudimo?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kompletan spektar digitalnih usluga prilagođen tvojim potrebama i budžetu.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-orange-300 cursor-pointer"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  animation: `slideInUp 0.6s ease-out ${0.1 * index}s forwards`,
                  opacity: 0,
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: hoveredService === index ? "#dc7d12" : "#ffb873",
                  }}
                >
                  <IconComponent
                    className="w-8 h-8"
                    style={{ color: hoveredService === index ? "white" : "#393536" }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3" style={{ color: "#393536" }}>
                  {service.title}
                </h3>

                {/* Intro */}
                <p className="text-gray-600 mb-6">{service.intro}</p>

                {/* Bullets */}
                <ul className="space-y-3">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                        style={{ backgroundColor: "#dc7d12" }}
                      />
                      <span className="text-gray-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services

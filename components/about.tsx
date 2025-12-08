"use client"

import { Instagram, Camera, Video } from "lucide-react"

const About = () => {
  const floatingIcons = [
    { Icon: Instagram, top: "10%", right: "8%", delay: 0.5, size: 28 },
    { Icon: Camera, bottom: "15%", left: "5%", delay: 1.2, size: 25 },
    { Icon: Video, top: "20%", left: "8%", delay: 2, size: 36 },
  ]

  return (
    <section
      id="zasto-mi"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden"
    >
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute opacity-15 pointer-events-none"
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center leading-tight" style={{ color: "#393536" }}>
          Tko smo <span className="font-bold text-primary">mi</span>?
        </h2>

        {/* Content */}
        <div
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-100"
          style={{
            animation: "slideInUp 0.8s ease-out 0.1s forwards",
            opacity: 0,
          }}
        >
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            <span className="font-bold text-primary">DigitalMix</span> je moderna digitalna agencija specijalizirana za upravljanje društvenim mrežama, kreiranje
            sadržaja, fotografiranje, snimanje te oglašavanje putem Meta Ads sustava.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Naš je cilj pretvoriti tvoju online prisutnost u <span className="font-bold">profesionalan, dosljedan i učinkovit</span> kanal koji privlači
            publiku i pretvara je u kupce.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About

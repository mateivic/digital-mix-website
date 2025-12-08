"use client"

import { Mail, Send, Instagram, Heart } from "lucide-react"

const Contact = () => {
  const floatingIcons = [
    { Icon: Instagram, top: "10%", left: "5%", delay: 0.3, size: 20 },
    { Icon: Send, top: "15%", right: "8%", delay: 1.5, size: 18 },
    { Icon: Heart, bottom: "20%", right: "5%", delay: 2.2, size: 16 },
  ]

  return (
    <section
      id="kontakt"
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
          Kontakt
        </h2>

        {/* Contact Info */}
        <div
          className="grid gap-6 sm:gap-8 max-w-full sm:max-w-2xl mx-auto"
          style={{
            animation: "slideInUp 0.8s ease-out 0.1s forwards",
            opacity: 0,
          }}
        >
          {/* Email */}
          <a
            href="mailto:digitalmixhrv@gmail.com"
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-white shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 group"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mb-3 sm:mb-0"
              style={{ backgroundColor: "#ffb873" }}
            >
              <Mail className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: "#393536" }} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Email</p>
              <p className="text-lg sm:text-xl font-bold break-all" style={{ color: "#dc7d12" }}>
                digitalmixhrv@gmail.com
              </p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/digital_mix_hrv"
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-white shadow-lg border-2 border-gray-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 group"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mb-3 sm:mb-0"
              style={{ backgroundColor: "#ffb873" }}
            >
              <Instagram className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: "#393536" }} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Instagram</p>
              <p className="text-lg sm:text-xl font-bold break-all" style={{ color: "#dc7d12" }}>
                digital_mix_hrv
              </p>
            </div>
          </a>

          {/* CTA */}
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-200">
            <p className="text-base sm:text-lg font-semibold mb-3 sm:mb-4" style={{ color: "#393536" }}>
              Spreman za digitalni rast?
            </p>
            <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
              Kontaktiraj nas i dogovorimo besplatnu konzultaciju. Odgovaramo u roku od 24 sata.
            </p>
            <a
              href="mailto:digitalmixhrv@gmail.com"
              className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-white font-bold transition-all hover:shadow-lg hover:scale-105 active:scale-95 text-sm sm:text-base"
              style={{ backgroundColor: "#dc7d12" }}
            >
              Pošalji poruku
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

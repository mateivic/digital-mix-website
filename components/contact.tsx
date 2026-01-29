"use client"

import { Mail, Send, Instagram, Heart, Video } from "lucide-react"

const Contact = () => {
  const floatingIcons = [
    { Icon: Instagram, top: "10%", left: "5%", delay: 0.3, size: 28 },
    { Icon: Send, top: "15%", right: "8%", delay: 1.5, size: 28 },
    { Icon: Heart, bottom: "20%", right: "5%", delay: 2.2, size: 23 },
    { Icon: Video, top: "11%", right: "35%", delay: 0.8, size: 32 },
    
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
      <div
        className="absolute bottom-20 left-10 w-42 h-42 rounded-full opacity-10  pointer-events-none"
        style={{ backgroundColor: "#dc7d12", animation: "float 8s ease-in-out infinite 1s" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center leading-tight" style={{ color: "#393536" }}>
          Kontakt
        </h2>

        {/* Contact Grid - Details Left, Map Right on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div
            className="grid gap-6 sm:gap-8"
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
              target="_blank"
              rel="noopener noreferrer"
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

          {/* Google Maps */}
          <div
            className="rounded-2xl p-7 overflow-hidden shadow-lg border-2 bg-white border-gray-100 h-[350px] sm:h-[400px] lg:h-full lg:min-h-[450px]"
            style={{
              animation: "slideInUp 0.8s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2864.0931161632443!2d15.24212117756885!3d44.1227014710839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4761fa7f70b7f681%3A0x27b869ec9fc73748!2sUl.%20Edvina%20Androvi%C4%87a%2021%2C%2023000%2C%20Zadar!5e0!3m2!1shr!2shr!4v1769685348232!5m2!1shr!2shr"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DigitalMix lokacija - Zadar"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

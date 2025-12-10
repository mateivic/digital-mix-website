"use client"

import { useState, useEffect } from "react"
import {
  Instagram,
  Camera,
  MessageCircle,
  Heart,
  Share2,
  Users,
  Target,
  BarChart3,
  Facebook,
  Video
} from "lucide-react"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640) // Tailwind "sm" breakpoint
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100 // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const floatingIcons = [
    { Icon: Instagram, size: 42, top: "10%", left: "5%", delay: "0s", duration: "6s" },
    { Icon: Facebook, size: 43, bottom: "15%", left: "22%", delay: "2.2s", duration: "6s" },
    { Icon: Camera, size: 34, bottom: "38%", left: "10%", delay: "2s", duration: "5s" },
    { Icon: Heart, size: 32, bottom: "12%", right: "35%", delay: "1.5s", duration: "6s" },
    { Icon: Share2, size: 36, top: "35%", left: "5%", delay: "2.5s", duration: "7s" },
    { Icon: Video, size: 45, top: "60%", right: "20%", delay: "3.5s", duration: "5s" },
    { Icon: BarChart3, size: 38, top: "20%", right: "8%", delay: "1s", duration: "7s" },
    { Icon: Target, size: 36, top: "25%", left: "18%", delay: "1.8s", duration: "7.5s" },
    { Icon: Users, size: 28, bottom: "20%", right: "10%", delay: "3s", duration: "5.5s" },
    { Icon: MessageCircle, size: 36, top: "40%", right: "5%", delay: "0.5s", duration: "8s" },
    { Icon: Heart, size:32, top: "12%", right: "32%", delay: "0.3s", duration: "8s" },
  ]

  return (
    <section id="hero" className="fixed inset-0 h-screen overflow-hidden bg-white flex items-center justify-center z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50/30"></div>
      <div
        className={`absolute ${isMobile ? "w-20 h-20" : "w-34 h-34"} rounded-full opacity-30`}
        style={{
          backgroundColor: "#dc7d12",
          top: "15%",
          right: "16%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        className={`absolute ${isMobile ? "w-12 h-12" : "w-22 h-22"} rounded-full opacity-20`}
        style={{
          backgroundColor: "#ffb873",
          bottom: "25%",
          left: "12%",
          animation: "float 8s ease-in-out infinite 1s",
        }}
      />

      {/* Show half of icons on mobile, all on desktop */}
      {floatingIcons
        .slice(0, isMobile ? Math.ceil(floatingIcons.length / 2) : floatingIcons.length)
        .map((item, index) => (
          <div
            key={index}
            className="absolute opacity-20 pointer-events-none"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              animation: `float ${item.duration} ease-in-out infinite ${item.delay}`,
              color: index % 2 === 0 ? "#dc7d12" : "#ed9d42",
            }}
          >
            <item.Icon size={item.size} />
          </div>
        ))}

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full pt-20">
        <div className="flex flex-col items-center text-center space-y-8">

          {/* Main Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 transition-all duration-700 ${
              isLoaded ? "animate-slide-up" : "opacity-0"
            }`}
            style={{
              color: "#393536",
              animation: isLoaded ? "slideInUp 1s ease-out 0.1s forwards" : "none",
              opacity: isLoaded ? 1 : 0,
            }}
          >
            Vodiš li još uvijek <span style={{ color: "#dc7d12" }}>sam/a</span> svoje društvene mreže?
          </h1>

          {/* Secondary Headline */}
          <h2
            className={`text-xl sm:text-2xl text-gray-700 max-w-2xl leading-relaxed transition-all duration-700 ${
              isLoaded ? "animate-slide-up" : "opacity-0"
            }`}
            style={{
              animation: isLoaded ? "slideInUp 1s ease-out 0.1s forwards" : "none",
              opacity: isLoaded ? 1 : 0,
            }}
          >
            Umoran si od konstantnog stvaranja sadržaja, planiranja objava i praćenja trendova?
          </h2>

          {/* Description */}
          <h3
            className="text-lg text-primary font-bold max-w-2xl leading-relaxed"
            style={{
              animation: isLoaded ? "slideInUp 1s ease-out 0.1s forwards" : "none",
              opacity: isLoaded ? 1 : 0,
            }}
          >
            Prepusti to nama – a ti se fokusiraj na svoj posao.
          </h3>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
            style={{
              animation: isLoaded ? "slideInUp 1s ease-out 0.1s forwards" : "none",
              opacity: isLoaded ? 1 : 0,
            }}
          >
            <button
              onClick={() => scrollToSection("kontakt")}
              className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#dc7d12",
              }}
            >
              Kontaktiraj Nas
            </button>
            {/* <button
              onClick={() => scrollToSection("free-audit")}
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#ffb873",
                color: "#393536",
              }}
            >
              Besplatna analiza IG profila
            </button> */}
          </div>

          {/* Scroll Indicator */}
          <div
            className="pt-12 animate-bounce"
            style={{
              animation: isLoaded ? "slideInUp 0.8s ease-out 0.5s forwards, bounce 2s infinite 1s" : "none",
              opacity: isLoaded ? 1 : 0,
            }}
          >
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Instagram, TrendingUp, BarChart3, Sparkles, Share2, Facebook } from "lucide-react"

const FreeAudit = () => {
  const [formData, setFormData] = useState({ instagram: "", email: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const floatingIcons = [
    { Icon: Share2, top: "8%", left: "5%", delay: 0, size: 32 },
    { Icon: BarChart3, top: "22%", right: "26%", delay: 1.2, size: 20 },
    { Icon: Facebook, bottom: "15%", left: "8%", delay: 2, size: 28 },
    { Icon: Instagram, bottom: "20%", right: "5%", delay: 0.6, size: 34 },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to an API
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ instagram: "", email: "" })
    }, 3000)
  }

  return (
    <section
      id="free-audit"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-100 via-white to-orange-50 relative overflow-hidden"
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
        className="absolute top-20 right-20 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ backgroundColor: "#dc7d12", animation: "float 8s ease-in-out infinite 1s" }}
      />
      <div
        className="absolute top-1/2 left-5 w-20 h-20 rounded-full opacity-25 pointer-events-none"
        style={{ backgroundColor: "#ffb873", animation: "float 8s ease-in-out infinite 1s" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: "#393536" }}>
            <span className="text-primary">Besplatna analiza</span> tvog Instagram profila
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Dobij detaljnu AI-powered analizu tvog Instagram profila direktno u svoju email prvu. Saznaj kako
            funkcionira tvoj profil, gdje možeš poboljšati sadržaj i kako dosegnuti veću publiku. Potpuno besplatno!
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border-2 border-orange-200 max-w-2xl mx-auto">
          {isSubmitted ? (
            <div
              className="text-center py-8"
              style={{
                animation: "slideInUp 0.6s ease-out forwards",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#ffb873" }}
              >
                <Mail className="w-8 h-8" style={{ color: "#393536" }} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#393536" }}>
                Zahvaljujemo!
              </h3>
              <p className="text-gray-600">
                Analiza će biti poslana na tvoj email uskoro. Provjeri spam folder ako je ne vidiš.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Instagram Input */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "#393536" }}>
                  Instagram profil
                </label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="@tvoj_instagram_profil"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: "#393536" }}>
                  Email adresa
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="tvoj@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-lg text-white font-bold text-lg transition-all hover:shadow-lg active:scale-95"
                style={{ backgroundColor: "#dc7d12" }}
              >
                Pošalji i zatraži analizu
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default FreeAudit

"use client"

import { Instagram, Linkedin, Mail, ArrowUpFromLine } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "usluge", label: "Usluge" },
    { id: "zasto-mi", label: "Zašto Mi" },
    { id: "blog", label: "Blog" },
    { id: "kontakt", label: "Kontakt" },
    { id: "free-audit", label: "Besplatna IG analiza" },
  ]

  return (
    <footer className="bg-[#393536] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-8 mb-12">
          {/* Logo & Description */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <img
                src="/hand-writed-quote.png"
                alt="Hand Writed Quote"
                className="h-18 md:h-22"
                style={{ display: "inline-block" }}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 hover:border-primary hover:text-primary transition-all group"
          >
            <ArrowUpFromLine className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-text-dark text-sm">© {new Date().getFullYear()} Digital Mix. Sva prava pridržana.</p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/digital_mix_hrv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-text-dark hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:digitalmixhrv@gmail.com"
                className="w-10 h-10 rounded-full bg-text-dark hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Made with love */}
            <p className="text-text-dark text-sm">
              Izrada: MIsense
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

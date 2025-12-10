"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "usluge", "zasto-mi", "blog", "kontakt"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileMenuOpen])

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
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "usluge", label: "Usluge" },
    { id: "zasto-mi", label: "O Nama" },
    { id: "blog", label: "Blog" },
    { id: "kontakt", label: "Kontakt" },
  ]

  return (
    <header className="fixed left-0 right-0 z-50 top-2 px-4">
      <div ref={headerRef} className="mx-auto max-w-3xl">
        <nav className="flex items-center justify-between px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/95 shadow-lg backdrop-blur-lg border border-gray-200">
          {/* Logo - Changed from Link to button with scrollToTop */}
          <button
            onClick={scrollToTop}
            className="font-bold text-xl md:text-2xl transition-colors hover:text-orange-600"
            style={{ color: "#dc7d12" }}
          >
            <span className="flex items-center gap-2">
              <img
                src="/logo-digitalmix.svg"
                alt="Digital Mix Logo"
                className="h-12 w-12 md:h-15 md:w-15"
                style={{ display: "inline-block" }}
              />
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-md font-large transition-colors ${
                  activeSection === item.id ? "text-primary" : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* <button
              onClick={() => scrollToSection("free-audit")}
              className="hidden sm:block px-4 py-2 rounded-full text-white text-sm font-semibold transition-all hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: "#dc7d12",
              }}
            >
              Besplatna IG analiza
            </button> */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full transition-colors hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-white/95 shadow-lg backdrop-blur-lg border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-400">
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id ? "bg-orange-100 text-primary" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <hr className="my-2 border-gray-200" />
              <button
                onClick={() => scrollToSection("free-audit")}
                className="px-4 py-3 rounded-xl text-white text-sm font-semibold text-center transition-all hover:opacity-90"
                style={{ backgroundColor: "#dc7d12" }}
              >
                Besplatna IG analiza
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

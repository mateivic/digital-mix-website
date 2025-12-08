"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import WhyUs from "@/components/why-us"
import Locations from "@/components/locations"
import FreeAudit from "@/components/free-audit"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import FloatingIcons from "@/components/floating-icons"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <FloatingIcons />
      <Header />

      <Hero />

      <main className="relative z-10 mt-[100vh]">
        <div
          className="bg-white rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
          style={{
            boxShadow: "0 -8px 30px rgba(0, 0, 0, 0.08), 0 -2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Services />
          <About />
          <WhyUs />
          <Locations />
          <FreeAudit />
          <Blog />
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  )
}

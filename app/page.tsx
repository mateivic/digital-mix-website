/**
 * Home Page
 * 
 * Server component that renders all sections.
 * Client components are marked with "use client" in their own files.
 */

import { Suspense } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import WhyUs from "@/components/why-us"
import Locations from "@/components/locations"
import FreeAudit from "@/components/free-audit"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

// Loading fallback for blog section
function BlogLoading() {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#393536" }}>
            Blog
          </h2>
          <p className="text-lg text-gray-600">Učitavanje...</p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
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
          <Suspense fallback={<BlogLoading />}>
            <Blog />
          </Suspense>
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  )
}

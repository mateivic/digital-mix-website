"use client"

import { useState } from "react"
import MapComponent from "./map/MapComponent"
import { Location } from "./map/Map"
import { Video, Heart, Camera } from "lucide-react"

const locations: Location[] = [
  { id: 1, number: 1, position: [45.814506, 15.972249] as [number, number], name: "Zagreb" },
  { id: 2, number: 8, position: [44.121876, 15.226096] as [number, number], name: "Zadar" },
  { id: 3, number: 1, position: [43.735910, 15.894015] as [number, number], name: "Šibenik" },
]

const floatingIcons = [
  { Icon: Video, bottom: "12%", right: "12%", delay: 1, size: 32 },
  { Icon: Heart, top: "28%", left: "9%", delay: 0.7, size: 28 },
  { Icon: Camera, top: "16%", right: "13%", delay: 2.3, size: 28 },
]
const Locations = () => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-white relative">
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
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center leading-tight" style={{ color: "#393536" }}>
          Gdje <span className="font-bold text-primary">djelujemo</span>?
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Iako radimo online sa cijelim svjetom, fizički smo prisutni u ovim lokacijama.
        </p>

        {/* Map Container */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-50 to-transparent rounded-full blur-2xl opacity-40 pointer-events-none"></div>

          <div className="relative z-10 rounded-2xl overflow-hidden p-5">
          <MapComponent locations={locations} />
          </div>

          {/* <div className="flex flex-wrap justify-center gap-4 mt-6">
            {locations.map((loc) => (
              <button
                key={loc.name}
                onClick={() => setActiveLocation(activeLocation === loc.name ? null : loc.name)}
                className={`px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeLocation === loc.name
                    ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg scale-105"
                    : "bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                }`}
              >
                <span className="font-semibold">{loc.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-sm font-bold ${
                    activeLocation === loc.name ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {loc.number} {loc.number === 1 ? "projekt" : "projekata"}
                </span>
              </button>
            ))}
          </div> */}
          <div className="my-4 text-center">
            <p className="text-gray-500 text-sm">
              Ukupno <span className="font-bold text-primary">10 aktivnih projekata</span> na 3 lokacije
            </p>
        </div>
      </div>
        </div>
    </section>
  )
}

export default Locations

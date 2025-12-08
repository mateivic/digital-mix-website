"use client"

import { useState } from "react"

interface Location {
  city: string
  count: number
  lat: number
  lng: number
  description: string
}

interface MapComponentProps {
  locations: Location[]
  activeLocation: string | null
  setActiveLocation: (city: string | null) => void
}

// Convert lat/lng to SVG coordinates (approximate for Croatia region)
const latLngToSvg = (lat: number, lng: number) => {
  // Croatia bounds approximately: lat 42.4-46.6, lng 13.5-19.5
  const minLat = 42.2
  const maxLat = 46.8
  const minLng = 13.2
  const maxLng = 19.8

  const x = ((lng - minLng) / (maxLng - minLng)) * 100
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100

  return { x, y }
}

export default function MapComponent({ locations, activeLocation, setActiveLocation }: MapComponentProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  const locationCoords = locations.map((loc) => ({
    ...loc,
    ...latLngToSvg(loc.lat, loc.lng),
  }))

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 overflow-hidden">
      {/* Water pattern background */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="water" patternUnits="userSpaceOnUse" width="40" height="40">
              <path d="M0 20 Q10 15, 20 20 T40 20" fill="none" stroke="#93c5fd" strokeWidth="0.5" opacity="0.5" />
              <path d="M0 30 Q10 25, 20 30 T40 30" fill="none" stroke="#93c5fd" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#water)" />
        </svg>
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradient for land */}
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f4" />
            <stop offset="100%" stopColor="#e7e5e4" />
          </linearGradient>
          {/* Shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0.5" dy="0.5" stdDeviation="1" floodOpacity="0.2" />
          </filter>
          {/* Glow filter for active markers */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Croatia detailed outline */}
        <path
          d="M25 18 L30 16 L38 15 L45 14 L52 13 L58 14 L65 16 L72 20 L76 25 L78 32 
             L75 38 L70 42 L65 44 L60 48 L55 52 L50 56 L46 60 L42 64 L38 68 L35 72 
             L33 76 L36 80 L42 83 L48 86 L52 88 L48 90 L42 89 L36 86 L30 82 L26 76 
             L24 70 L22 64 L20 58 L18 52 L17 46 L18 40 L20 34 L22 28 L24 22 Z"
          fill="url(#landGradient)"
          stroke="#d6d3d1"
          strokeWidth="0.5"
          filter="url(#shadow)"
        />

        {/* Islands */}
        <ellipse cx="28" cy="75" rx="3" ry="1.5" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="0.3" />
        <ellipse cx="32" cy="78" rx="4" ry="1.2" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="0.3" />
        <ellipse cx="38" cy="82" rx="3" ry="1" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="0.3" />
        <ellipse cx="25" cy="68" rx="2" ry="1" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="0.3" />

        {/* Adriatic coast highlight */}
        <path
          d="M18 52 L20 58 L22 64 L24 70 L26 76 L30 82 L36 86 L42 89 L48 90"
          fill="none"
          stroke="#ffb873"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* City markers */}
        {locationCoords.map((loc) => {
          const isActive = activeLocation === loc.city || hoveredLocation === loc.city
          const isMainLocation = loc.city === "Zadar"

          return (
            <g
              key={loc.city}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLocation(loc.city)}
              onMouseLeave={() => setHoveredLocation(null)}
              onClick={() => setActiveLocation(activeLocation === loc.city ? null : loc.city)}
              style={{ transition: "all 0.3s ease" }}
            >
              {/* Pulse rings for main location (Zadar) */}
              {isMainLocation && (
                <>
                  <circle cx={loc.x} cy={loc.y} r="3" fill="none" stroke="#dc7d12" strokeWidth="0.3">
                    <animate attributeName="r" from="3" to="10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={loc.x} cy={loc.y} r="3" fill="none" stroke="#dc7d12" strokeWidth="0.3">
                    <animate attributeName="r" from="3" to="10" dur="2s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Pin shadow */}
              <ellipse cx={loc.x} cy={loc.y + 5} rx="2.5" ry="1" fill="rgba(0,0,0,0.15)" />

              {/* Pin body - teardrop shape */}
              <g
                filter={isActive ? "url(#glow)" : undefined}
                style={{
                  transform: isActive ? `scale(1.3)` : "scale(1)",
                  transformOrigin: `${loc.x}px ${loc.y}px`,
                  transition: "transform 0.3s ease",
                }}
              >
                <path
                  d={`M${loc.x} ${loc.y + 4} 
                      C${loc.x - 4} ${loc.y} ${loc.x - 4} ${loc.y - 6} ${loc.x} ${loc.y - 8}
                      C${loc.x + 4} ${loc.y - 6} ${loc.x + 4} ${loc.y} ${loc.x} ${loc.y + 4}`}
                  fill={isActive ? "#dc7d12" : "#ffb873"}
                  stroke="#dc7d12"
                  strokeWidth="0.8"
                />

                {/* Count circle */}
                <circle cx={loc.x} cy={loc.y - 3} r={loc.count > 5 ? 3.5 : 2.8} fill="#dc7d12" />

                {/* Count text */}
                <text
                  x={loc.x}
                  y={loc.y - 1.8}
                  textAnchor="middle"
                  fill="white"
                  fontSize={loc.count > 5 ? "4" : "3.5"}
                  fontWeight="bold"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {loc.count}
                </text>
              </g>

              {/* City label */}
              <g
                style={{
                  opacity: isActive ? 1 : 0.8,
                  transition: "opacity 0.3s ease",
                }}
              >
                <rect
                  x={loc.x - 12}
                  y={loc.y + 7}
                  width="24"
                  height="6"
                  rx="3"
                  fill={isActive ? "#dc7d12" : "white"}
                  stroke={isActive ? "#dc7d12" : "#e5e5e5"}
                  strokeWidth="0.3"
                />
                <text
                  x={loc.x}
                  y={loc.y + 11.5}
                  textAnchor="middle"
                  fill={isActive ? "white" : "#393536"}
                  fontSize="3.2"
                  fontWeight="600"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {loc.city}
                </text>
              </g>
            </g>
          )
        })}

        {/* Compass rose */}
        <g transform="translate(88, 12)">
          <circle cx="0" cy="0" r="5" fill="white" stroke="#e5e5e5" strokeWidth="0.3" />
          <path d="M0 -4 L1 0 L0 4 L-1 0 Z" fill="#dc7d12" />
          <path d="M-4 0 L0 -1 L4 0 L0 1 Z" fill="#ffb873" />
          <text x="0" y="-5.5" textAnchor="middle" fill="#393536" fontSize="2" fontWeight="bold">
            N
          </text>
        </g>

        {/* Scale indicator */}
        <g transform="translate(10, 92)">
          <line x1="0" y1="0" x2="15" y2="0" stroke="#393536" strokeWidth="0.5" />
          <line x1="0" y1="-1" x2="0" y2="1" stroke="#393536" strokeWidth="0.5" />
          <line x1="15" y1="-1" x2="15" y2="1" stroke="#393536" strokeWidth="0.5" />
          <text x="7.5" y="3" textAnchor="middle" fill="#666" fontSize="2">
            ~100 km
          </text>
        </g>
      </svg>

      {/* Floating info card */}
      {activeLocation && (
        <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-64 bg-white rounded-xl shadow-lg border border-orange-100 p-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#dc7d12" }}
            >
              {locationCoords.find((l) => l.city === activeLocation)?.count}
            </div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: "#393536" }}>
                {activeLocation}
              </h3>
              <p className="text-sm text-gray-500">
                {locationCoords.find((l) => l.city === activeLocation)?.description}
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm" style={{ color: "#dc7d12" }}>
              {locationCoords.find((l) => l.city === activeLocation)?.count === 1
                ? "1 aktivan projekt"
                : `${locationCoords.find((l) => l.city === activeLocation)?.count} aktivnih projekata`}
            </p>
          </div>
        </div>
      )}

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-400">Digital Mix © 2025</div>
    </div>
  )
}

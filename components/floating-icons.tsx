"use client"

import { Instagram, MessageCircle, TrendingUp, Camera, Zap, Share2 } from "lucide-react"

const FloatingIcons = () => {
  const icons = [
    { icon: Instagram, delay: "0s", duration: "6s", top: "10%", left: "5%" },
    { icon: TrendingUp, delay: "1s", duration: "8s", top: "20%", right: "8%" },
    { icon: Camera, delay: "2s", duration: "7s", top: "50%", left: "3%" },
    { icon: MessageCircle, delay: "0.5s", duration: "9s", bottom: "15%", right: "5%" },
    { icon: Zap, delay: "1.5s", duration: "8s", top: "30%", left: "15%" },
    { icon: Share2, delay: "2.5s", duration: "10s", bottom: "25%", left: "12%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => {
        const IconComponent = item.icon
        return (
          <div
            key={index}
            className="absolute opacity-50 hover:opacity-20 transition-opacity duration-400"
            style={{
              top: item.top,
              right: item.right,
              left: item.left,
              bottom: item.bottom,
              animation: `float-slow ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay,
            }}
          >
            <IconComponent className="w-16 h-16 sm:w-24 sm:h-24" style={{ color: "#dc7d12" }} />
          </div>
        )
      })}
    </div>
  )
}

export default FloatingIcons

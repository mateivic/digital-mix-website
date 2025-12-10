import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Edu_SA_Beginner, Edu_SA_Hand, TikTok_Sans, Roboto_Flex } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// const _geistSans = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })
// const _eduSAHand = Edu_SA_Hand({ subsets: ["latin"] })
// const _tikTokSans = TikTok_Sans({ subsets: ["latin"] })
const _robotoFlex = Roboto_Flex({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Mix - Vaš Partner za Digitalni Rast",
  description:
    "DigitalMix je moderna digitalna agencija specijalizirana za upravljanje društvenim mrežama, kreiranje sadržaja i Meta Ads oglašavanje.",
  keywords: "digitalni marketing, Instagram marketing, Meta Ads, kreiranje sadržaja, društvene mreže",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hr">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""></script>
      </head>
      <body className={`${_robotoFlex.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

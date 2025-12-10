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

// Base URL for the site - update this to your production domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmix.hr"

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "DigitalMix - Vođenje Društvenih Mreža i Kreiranje Sadržaja | Hrvatska",
    template: "%s | DigitalMix",
  },
  description:
    "DigitalMix je agencija za vođenje društvenih mreža i kreiranje sadržaja. Prepustite nam Instagram, Facebook i TikTok dok se vi fokusirate na posao. Zadar, Hrvatska.",
  keywords: [
    "vođenje društvenih mreža",
    "sadržaj za društvene mreže",
    "social media marketing",
    "Instagram marketing",
    "Facebook marketing",
    "kreiranje sadržaja",
    "digitalni marketing",
    "social media agencija",
    "društvene mreže Hrvatska",
    "vođenje Instagrama",
    "marketing za male poduzetnike",
    "digitalna agencija Zadar",
    "social media Dalmacija",
  ],
  
  // Author and creator
  authors: [{ name: "DigitalMix", url: siteUrl }],
  creator: "DigitalMix",
  publisher: "DigitalMix",
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Canonical URL
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "hr-HR": "/",
    },
  },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: siteUrl,
    siteName: "DigitalMix",
    title: "DigitalMix - Vođenje Društvenih Mreža i Kreiranje Sadržaja",
    description:
      "Prepustite nam vođenje vaših društvenih mreža. Instagram, Facebook, TikTok - sve na jednom mjestu. Profesionalno, dosljedno, učinkovito.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "DigitalMix - Vođenje Društvenih Mreža",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DigitalMix - Vođenje Društvenih Mreža i Kreiranje Sadržaja",
    description:
      "Prepustite nam vođenje vaših društvenih mreža. Instagram, Facebook, TikTok - sve na jednom mjestu.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@digitalmix_hrv",
  },
  
  // Verification (add these once you set up the accounts)
  // verification: {
  //   google: "your-google-verification-code",
  // },
  
  // Additional metadata
  category: "business",
  classification: "Digital Marketing Agency",
  
  // Icons
  icons: {
    icon: [
      { url: "/logo-digitalmix.svg", type: "image/svg+xml" },
    ],
    apple: "/logo-digitalmix.svg",
  },
  
  // Manifest for PWA (optional)
  // manifest: "/manifest.json",
}

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "DigitalMix",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-digitalmix.svg`,
      },
      description:
        "Agencija za vođenje društvenih mreža i kreiranje sadržaja u Hrvatskoj.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Zadar",
        addressRegion: "Zadarska županija",
        addressCountry: "HR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "digitalmixhrv@gmail.com",
        contactType: "customer service",
        availableLanguage: ["Croatian", "English"],
      },
      sameAs: [
        "https://www.instagram.com/digital_mix_hrv",
      ],
      areaServed: {
        "@type": "Country",
        name: "Croatia",
      },
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 44.1194,
          longitude: 15.2314,
        },
        geoRadius: "500000",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "DigitalMix",
      image: `${siteUrl}/logo-digitalmix.svg`,
      url: siteUrl,
      telephone: "",
      email: "digitalmixhrv@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "",
        addressLocality: "Zadar",
        addressRegion: "Zadarska županija",
        postalCode: "23000",
        addressCountry: "HR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 44.1194,
        longitude: 15.2314,
      },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Usluge digitalnog marketinga",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Vođenje društvenih mreža",
              description: "Kompletno upravljanje Instagram, Facebook i TikTok profilima",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Kreiranje sadržaja",
              description: "Profesionalna izrada vizualnog sadržaja za društvene mreže",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Strategija društvenih mreža",
              description: "Izrada strategije i plana objava za vaš brend",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "DigitalMix",
      description: "Agencija za vođenje društvenih mreža i kreiranje sadržaja",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "hr-HR",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hr">
      <head>
        <title>DigitalMix - Vođenje Društvenih Mreža i Kreiranje Sadržaja</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""></script>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${_robotoFlex.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

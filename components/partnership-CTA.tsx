import { ArrowRight } from "lucide-react"
import Link from "next/link"

const CTAs = [
    {   
        id: 1,
        title: "Kreativan/na si? Snimaš fotke?",
        description: "Imaš oko za detalje, igraš se svjetlom, kadriranjem, onim sitnicama koje običnu sliku pretvore u priču? Ako si kimnuo/la glavom barem jednom — pošalji nam poruku. Možda se baš tamo, negdje između piksela i inspiracije, dogodi odlična suradnja.",
        buttonText: "Kontaktiraj Nas",
        link: "/#kontakt",
    },
    {
        id: 2,
        title: "Radiš u Canva-i, Photoshopu, Adobe alatima?",
        description: "Tvoj je komp  pun nedovršenih ideja, skica, filtera i projekata koji čekaju pravi trenutak? Ako si kimnuo/la glavom barem jednom — pošalji nam poruku. Možda se baš tamo, negdje između piksela i inspiracije, dogodi odlična suradnja.",
        buttonText: "Kontaktiraj Nas",
        link: "/#kontakt",
    }
]

function getRandomCTA() {
  return CTAs[Math.floor(Math.random() * CTAs.length)]
}

const PartnershipCTA = () => {
  const cta = getRandomCTA()
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
        style={{ background: "linear-gradient(135deg, #dc7d12 0%, #ffb873 100%)" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{cta.title}</h2>
        <p className="text-white/90 text-lg mb-8">{cta.description}</p>
        <Link
          href={cta.link}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
          style={{ color: "#dc7d12" }}
        >
          {cta.buttonText}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}

export default PartnershipCTA
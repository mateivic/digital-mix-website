export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "kako-povecati-engagement-na-instagram-profilima",
    title: "Kako povećati engagement na Instagram profilima u tren oka",
    excerpt: "Saznaj 5 provjerenih strategija za povećanje angažmana tvoje publike na Instagramu.",
    content: `
      <p>U svijetu društvenih mreža, engagement je ključan za uspjeh. Evo 5 strategija koje možete primijeniti već danas:</p>
      
      <h2>1. Objavljujte u pravo vrijeme</h2>
      <p>Analizirajte kada je vaša publika najaktivnija. Instagram Insights može vam pomoći identificirati najbolje vrijeme za objavu. Općenito, to je između 11-13h i 19-21h.</p>
      
      <h2>2. Koristite interaktivne Stories</h2>
      <p>Ankete, kvizovi i pitanja u Stories su odličan način za poticanje interakcije. Kada korisnici sudjeluju, algoritam prepoznaje vaš sadržaj kao relevantan.</p>
      
      <h2>3. Odgovarajte na komentare</h2>
      <p>Brzi i personalizirani odgovori na komentare grade zajednicu. Postavite pitanja u opisu objave kako biste potaknuli razgovor.</p>
      
      <h2>4. Kreirajte sadržaj koji se sprema</h2>
      <p>Infografike, savjeti i edukativni sadržaj potiču korisnike da spreme vašu objavu za kasnije. Spremanja su snažan signal algoritmu.</p>
      
      <h2>5. Koristite relevantne hashtage</h2>
      <p>Kombinirajte popularne i niche hashtage. 10-15 ciljanih hashtaga može značajno povećati doseg vaših objava.</p>
      
      <p>Implementirajte ove strategije konzistentno i pratite rezultate. Engagement se ne gradi preko noći, ali s pravim pristupom, rezultati su neizbježni.</p>
    `,
    date: "15. prosinca 2024.",
    readTime: "5 min čitanja",
    category: "Instagram",
  },
  {
    id: 2,
    slug: "trendovi-u-meta-oglasavanju-2024",
    title: "Trendovi u Meta oglašavanju 2024",
    excerpt: "Što je novo u Meta Ads platformi i kako to iskoristiti za bolji ROI na tvojim kampanjama.",
    content: `
      <p>Meta Ads platforma kontinuirano evoluira. Evo ključnih trendova koje trebate pratiti:</p>
      
      <h2>AI-powered kreative</h2>
      <p>Meta sve više integrira AI alate za automatsko generiranje i optimizaciju kreativa. Advantage+ kreativne opcije omogućuju dinamičko prilagođavanje oglasa svakom korisniku.</p>
      
      <h2>Conversions API postaje standard</h2>
      <p>S obzirom na promjene u praćenju korisnika, server-side tracking putem Conversions API-ja postaje ključan za točno mjerenje rezultata.</p>
      
      <h2>Reels oglasi dominiraju</h2>
      <p>Vertikalni video format nastavlja rasti. Reels oglasi imaju niži CPM i veći engagement u usporedbi s tradicionalnim formatima.</p>
      
      <h2>Advantage+ Shopping kampanje</h2>
      <p>Za e-commerce, AI-vođene shopping kampanje pokazuju impresivne rezultate uz minimalnu manualnu optimizaciju.</p>
      
      <h2>Fokus na kreativu</h2>
      <p>S automatizacijom targetiranja, kvaliteta kreative postaje glavni diferencijator. Ulaganje u video produkciju i UGC sadržaj donosi najbolje rezultate.</p>
      
      <p>Prilagodite svoju strategiju ovim trendovima i ostanite ispred konkurencije u 2024. godini.</p>
    `,
    date: "10. prosinca 2024.",
    readTime: "4 min čitanja",
    category: "Meta Ads",
  },
  {
    id: 3,
    slug: "vaznost-konzistentnog-branda-na-drustvenim-mrezama",
    title: "Važnost konsistentnog brenda na društvenim mrežama",
    excerpt: "Kako vizualna konzistentnost pomaže u izgradnji prepoznatljivog i jačeg brenda online.",
    content: `
      <p>Konzistentan brend je temelj uspješne prisutnosti na društvenim mrežama. Evo zašto je to važno i kako to postići:</p>
      
      <h2>Prepoznatljivost na prvi pogled</h2>
      <p>Kada korisnici scrollaju kroz feed, imate manje od sekunde da privučete pažnju. Konzistentne boje, fontovi i stil omogućuju instant prepoznavanje vašeg brenda.</p>
      
      <h2>Izgradnja povjerenja</h2>
      <p>Profesionalan i ujednačen vizualni identitet komunicira pouzdanost. Nekonzistentnost može djelovati neprofesionalno i odbiti potencijalne klijente.</p>
      
      <h2>Elementi brand konzistentnosti</h2>
      <ul>
        <li><strong>Paleta boja:</strong> Definirajte 3-5 glavnih boja i dosljedno ih koristite</li>
        <li><strong>Tipografija:</strong> Odaberite 1-2 fonta za naslove i body tekst</li>
        <li><strong>Ton komunikacije:</strong> Budite dosljedni u načinu pisanja</li>
        <li><strong>Vizualni stil fotografija:</strong> Koristite iste filtere ili preset-ove</li>
      </ul>
      
      <h2>Praktični savjeti</h2>
      <p>Kreirajte brand guidelines dokument koji će služiti kao referenca za sve objave. Koristite alate poput Canve za kreiranje predložaka koji osiguravaju konzistentnost.</p>
      
      <p>Investicija u konzistentan brend danas znači prepoznatljivost i lojalnost sutra.</p>
    `,
    date: "5. prosinca 2024.",
    readTime: "6 min čitanja",
    category: "Branding",
  },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}

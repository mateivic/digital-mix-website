# SEO Setup Guide for DigitalMix

Ovaj vodič sadrži korake za potpunu SEO optimizaciju vaše web stranice.

---

## ✅ Implementirano u kodu

### 1. Meta Tags
- [x] Osnovni title i description za sve stranice
- [x] Open Graph tags za Facebook/LinkedIn dijeljenje
- [x] Twitter Card tags
- [x] Canonical URL-ovi
- [x] Ključne riječi (keywords)

### 2. Structured Data (Schema.org)
- [x] Organization schema
- [x] LocalBusiness schema
- [x] WebSite schema
- [x] BlogPosting schema za svaki blog članak

### 3. Technical SEO
- [x] robots.ts - automatski generira robots.txt
- [x] sitemap.ts - dinamički sitemap s blog postovima
- [x] Semantic HTML (article, section, nav, header, footer)
- [x] Lang atribut (hr)

---

## 🔧 Potrebno napraviti ručno

### 1. Dodaj Environment Varijable

U `.env.local` datoteku dodaj:

```env
NEXT_PUBLIC_SITE_URL=https://digitalmix.hr
```

### 2. Kreiraj Open Graph sliku

Kreiraj `/public/og-image.jpg`:
- **Dimenzije**: 1200 x 630 px
- **Sadržaj**: DigitalMix logo + tagline
- **Format**: JPG ili PNG

**Alati za kreiranje:**
- Canva (besplatno): https://www.canva.com
- Figma: https://www.figma.com

### 3. Google Search Console

1. Idi na: https://search.google.com/search-console
2. Dodaj property (URL prefix): `https://digitalmix.hr`
3. Verificiraj vlasništvo (preporučujem DNS verification)
4. Nakon verifikacije, dodaj u `app/layout.tsx`:

```typescript
verification: {
  google: "tvoj-google-verification-kod",
},
```

5. Submit sitemap:
   - U Search Console → Sitemaps
   - Dodaj: `https://digitalmix.hr/sitemap.xml`

### 4. Google Analytics 4

1. Idi na: https://analytics.google.com
2. Kreiraj novi property
3. Već imaš `@vercel/analytics`, ali za detaljniju analitiku:

```bash
pnpm add @next/third-parties
```

Dodaj u `app/layout.tsx`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

// U body, prije zatvaranja:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### 5. Google Business Profile

1. Idi na: https://business.google.com
2. Dodaj DigitalMix kao business
3. Ispuni sve podatke:
   - Naziv: DigitalMix
   - Kategorija: Marketing Agency / Social Media Agency
   - Adresa: Zadar, Hrvatska
   - Kontakt: digitalmixhrv@gmail.com
   - Website: https://digitalmix.hr
   - Radni sati
4. Dodaj fotografije i logo

### 6. Social Media Links

Dodaj službene profile u JSON-LD (već pripremljeno u `layout.tsx`):

```typescript
sameAs: [
  "https://www.instagram.com/digital_mix_hrv",
  "https://www.facebook.com/digitalmix",  // ako postoji
  "https://www.linkedin.com/company/digitalmix",  // ako postoji
],
```

---

## 📊 Praćenje i optimizacija

### Korisni alati

1. **Google Search Console** - prati indexiranje i pretraživanja
2. **Google PageSpeed Insights** - https://pagespeed.web.dev
3. **Rich Results Test** - https://search.google.com/test/rich-results
4. **Schema Markup Validator** - https://validator.schema.org

### Redovite aktivnosti

- [ ] Objavi 1-2 blog posta mjesečno
- [ ] Prati Search Console za greške indexiranja
- [ ] Provjeri PageSpeed jednom mjesečno
- [ ] Odgovaraj na Google Business Profile recenzije

---

## 🎯 Ključne riječi za ciljanje

### Primarne
- vođenje društvenih mreža
- sadržaj za društvene mreže
- social media marketing hrvatska

### Sekundarne
- instagram marketing
- facebook marketing
- kreiranje sadržaja za instagram
- social media agencija

### Lokalne
- digitalna agencija zadar
- marketing agencija dalmacija
- vođenje instagrama hrvatska

---

## 📝 Content strategija za blog

### Teme za članke (SEO fokusirane)

1. "Kako voditi Instagram profil za mali biznis - kompletni vodič"
2. "10 ideja za sadržaj na društvenim mrežama"
3. "Zašto outsourcati vođenje društvenih mreža?"
4. "Instagram vs Facebook - koju mrežu odabrati?"
5. "Koliko često objavljivati na Instagramu?"
6. "Kako napisati caption koji privlači pažnju"
7. "Hashtag strategija za 2025"
8. "Reels vs Posts - što donosi više dosega?"

### Struktura članka za SEO

1. **Naslov (H1)**: Uključi glavnu ključnu riječ
2. **Uvod**: 2-3 rečenice, postavi problem
3. **Sadržaj**: 
   - Koristi H2 za sekcije
   - Koristi H3 za podsekcije
   - Dodaj liste i bullet points
4. **Zaključak**: Call-to-action
5. **Meta opis**: 150-160 znakova, uključi ključnu riječ

---

## 🚀 Dodatne preporuke

### Brzina stranice
- Slike su već optimizirane kroz Storage service
- Koristi `next/image` umjesto `<img>` gdje je moguće
- Minimaliziraj third-party scripts

### Mobile-first
- Stranica je već responsive
- Testiraj na Google Mobile-Friendly Test

### Internal linking
- Povezuj blog postove međusobno
- Iz blog postova linkaj na usluge
- Koristi descriptive anchor text

---

## Kontakt za SEO pitanja

Ako trebaš pomoć s SEO implementacijom ili imaš pitanja:
- Testiraj structured data: https://search.google.com/test/rich-results
- Provjeri indexiranje: `site:digitalmix.hr` na Googleu


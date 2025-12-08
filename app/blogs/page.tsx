"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <nav className="mx-auto max-w-4xl flex items-center justify-between px-8 py-4 rounded-full bg-white/95 shadow-lg backdrop-blur-lg border border-gray-200">
          <Link href="/" className="text-2xl font-bold" style={{ color: "#dc7d12" }}>
          <img
                src="/logo-digitalmix.svg"
                alt="Digital Mix Logo"
                className="h-12 w-12 md:h-15 md:w-15"
                style={{ display: "inline-block" }}
              />          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100"
            style={{ color: "#393536" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Natrag
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorations */}
        <div
          className="absolute top-20 right-10 w-34 h-34 rounded-full opacity-30"
          style={{ backgroundColor: "#ffb873" }}
        />
        <div
          className="absolute bottom-0 left-10 w-28 h-28 rounded-full opacity-20"
          style={{ backgroundColor: "#dc7d12" }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#393536" }}>
            Naš <span style={{ color: "#dc7d12" }}>Blog</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Savjeti, trikovi i insights za digitalni rast tvog poslovanja. Ostani u toku s najnovijim trendovima.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group block"
                style={{
                  animation: `slideInUp 0.6s ease-out ${0.1 * index}s forwards`,
                  opacity: 0,
                }}
              >
                <article className="h-full p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col">
                  {/* Category Badge */}
                  <span
                    className="self-start px-3 py-1 rounded-full text-sm font-medium mb-4"
                    style={{ backgroundColor: "#ffb873", color: "#393536" }}
                  >
                    {post.category}
                  </span>

                  <h2
                    className="text-xl font-bold mb-4 group-hover:text-orange-600 transition-colors line-clamp-2"
                    style={{ color: "#393536" }}
                  >
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{post.excerpt}</p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Read more */}
                  <div
                    className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all"
                    style={{ color: "#dc7d12" }}
                  >
                    Pročitaj više
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
          style={{ background: "linear-gradient(135deg, #dc7d12 0%, #ffb873 100%)" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Želiš personalizirane savjete?</h2>
          <p className="text-white/90 text-lg mb-8">
            Kontaktiraj nas za besplatnu analizu tvog Instagram profila i saznaj kako možemo pomoći tvom poslovanju.
          </p>
          <Link
            href="/#besplatna-analiza"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            style={{ color: "#dc7d12" }}
          >
            Besplatna IG Analiza
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">© 2025 DigitalMix. Sva prava pridržana.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}

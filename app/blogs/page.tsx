/**
 * Public Blog Listing Page
 * 
 * Fetches published posts from Supabase.
 */

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import { getPublishedPosts } from "@/lib/services/blog.service"
import Footer from "@/components/footer"
import { Instagram, Facebook, Camera, Heart, Share2, Video, BarChart3, Target, Users, MessageCircle } from "lucide-react"

const floatingIcons = [
  { Icon: Facebook, size: 43, bottom: "5%", left: "32%", delay: "2.2s", duration: "6s" },
  { Icon: Camera, size: 34, bottom: "58%", left: "10%", delay: "2s", duration: "5s" },
  { Icon: Video, size: 45, top: "60%", right: "20%", delay: "3.5s", duration: "5s" },
  { Icon: Users, size: 28, bottom: "10%", right: "10%", delay: "3s", duration: "5.5s" },
]

// Format date for display
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('hr-HR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export default async function BlogsPage() {
  const projectSlug = process.env.NEXT_PUBLIC_PROJECT_SLUG || 'digital-mix'
  const result = await getPublishedPosts(projectSlug)
  const posts = result.data || []

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
            />
          </Link>
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
      <section className="pt-52 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorations */}
        {floatingIcons
        .map((item, index) => (
          <div
            key={index}
            className="absolute opacity-20 pointer-events-none"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              animation: `float ${item.duration} ease-in-out infinite ${item.delay}`,
              color: index % 2 === 0 ? "#dc7d12" : "#ed9d42",
            }}
          >
            <item.Icon size={item.size} />
          </div>
        ))}
        <div
          className="absolute top-20 right-10 w-34 h-34 rounded-full opacity-30"
          style={{ backgroundColor: "#ffb873" }}
        />
        <div
          className="absolute bottom-0 left-5 w-28 h-28 rounded-full opacity-20"
          style={{ backgroundColor: "#dc7d12" }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#393536", animation: "slideInUp 1s ease-out 0.1s forwards" }}>
            Naš <span style={{ color: "#dc7d12" }}>Blog</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto" style={{ animation: "slideInUp 1s ease-out 0.1s forwards" }}>
            Savjeti, trikovi i insights za digitalni rast tvog poslovanja. Ostani u toku s najnovijim trendovima.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Trenutno nema objavljenih blogova.</p>
              <p className="text-gray-400 mt-2">Uskoro dolaze novi članci!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group block"
                >
                  <article className="h-full rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col overflow-hidden">
                    {/* Featured Image */}
                    {post.picture_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.picture_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-8 flex flex-col flex-grow">
                      {/* Category Badge */}
                      {post.category && (
                        <span
                          className="self-start px-3 py-1 rounded-full text-sm font-medium mb-4"
                          style={{ backgroundColor: "#ffb873", color: "#393536" }}
                        >
                          {post.category}
                        </span>
                      )}

                      <h2
                        className="text-xl font-bold mb-4 group-hover:text-orange-600 transition-colors line-clamp-2"
                        style={{ color: "#393536" }}
                      >
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                      )}

                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.read_time} min
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
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
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
            href="/#free-audit"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
            style={{ color: "#dc7d12" }}
          >
            Besplatna IG Analiza
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

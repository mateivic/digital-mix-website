import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import { getBlogBySlug, blogPosts } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import ShareButton from "@/components/share-button"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (exclude current)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2)

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <nav className="mx-auto max-w-4xl flex items-center justify-between px-8 py-4 rounded-full bg-white/95 shadow-lg backdrop-blur-lg border border-gray-200">
          <Link href="/" className="text-2xl font-bold" style={{ color: "#dc7d12" }}>
            DigitalMix
          </Link>
          <Link
            href="/blogs"
            className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-100"
            style={{ color: "#393536" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Svi blogovi
          </Link>
        </nav>
      </header>

      {/* Article */}
      <article className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: "#ffb873", color: "#393536" }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: "#393536" }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

          {/* Share Button - Client Component */}
          <ShareButton title={post.title} excerpt={post.excerpt} />

          {/* Divider */}
          <div className="w-20 h-1 rounded-full mb-12" style={{ backgroundColor: "#dc7d12" }} />

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-800"
            style={{
              ["--tw-prose-headings" as string]: "#393536",
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Box */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: "#dc7d12" }}
              >
                DM
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: "#393536" }}>
                  DigitalMix Tim
                </h3>
                <p className="text-gray-600">Stručnjaci za digitalni marketing i društvene mreže iz Zadra.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: "#393536" }}>
              Pročitaj još
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blogs/${relatedPost.slug}`} className="group block">
                  <article className="h-full p-8 rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col">
                    <span
                      className="self-start px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{ backgroundColor: "#ffb873", color: "#393536" }}
                    >
                      {relatedPost.category}
                    </span>
                    <h3
                      className="text-xl font-bold mb-4 group-hover:text-orange-600 transition-colors"
                      style={{ color: "#393536" }}
                    >
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 flex-grow">{relatedPost.excerpt}</p>
                    <div
                      className="flex items-center gap-2 mt-6 font-semibold group-hover:gap-3 transition-all"
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
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
          style={{ background: "linear-gradient(135deg, #dc7d12 0%, #ffb873 100%)" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Spreman za digitalni rast?</h2>
          <p className="text-white/90 text-lg mb-8">
            Kontaktiraj nas za besplatnu analizu i saznaj kako možemo pomoći tvom poslovanju.
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
    </main>
  )
}

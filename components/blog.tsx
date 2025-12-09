/**
 * Blog Section Component
 * 
 * Displays recent blog posts on the home page.
 * Server component that fetches from Supabase.
 */

import Link from "next/link"
import { ArrowRight, Instagram, TrendingUp, Heart, Facebook } from "lucide-react"
import { getPublishedPosts } from "@/lib/services/blog.service"

const floatingIcons = [
  { Icon: Instagram, bottom: "12%", left: "3%", delay: 0, size: 30 },
  { Icon: TrendingUp, bottom: "15%", right: "35%", delay: 1.5, size: 24 },
  { Icon: Heart, top: "20%", left: "25%", delay: 2.5, size: 23 },
  { Icon: Facebook, top: "10%", right: "8%", delay: 0.8, size: 32 },
]

export default async function Blog() {
  const projectSlug = process.env.NEXT_PUBLIC_PROJECT_SLUG || 'digital-mix'
  const result = await getPublishedPosts(projectSlug)
  const posts = (result.data || []).slice(0, 3) // Show max 3 posts on home page

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute opacity-10 pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            animation: `float ${4 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <item.Icon size={item.size} style={{ color: "#dc7d12" }} />
        </div>
      ))}
      <div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: "#dc7d12", animation: "float 8s ease-in-out infinite 1s" }}
      />
      <div
        className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-15 pointer-events-none"
        style={{ backgroundColor: "#ffb873", animation: "float 8s ease-in-out infinite 1s" }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: "#393536" }}>
            Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            DigitalMix dijeli savjete, trikove i insights za digitalni rast tvog poslovanja.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Blogovi dolaze uskoro!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col overflow-hidden">
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
                    {post.category && (
                      <span
                        className="self-start px-3 py-1 rounded-full text-sm font-medium mb-4"
                        style={{ backgroundColor: "#ffb873", color: "#393536" }}
                      >
                        {post.category}
                      </span>
                    )}

                    <h3
                      className="text-xl font-bold mb-4 group-hover:text-orange-600 transition-colors"
                      style={{ color: "#393536" }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                    )}

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

        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:scale-105"
            style={{
              backgroundColor: "#dc7d12",
              color: "#FFFFFF",
            }}
          >
            Pogledaj sve blogove
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

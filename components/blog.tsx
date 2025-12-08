"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

const Blog = () => {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
        <div className="grid md:grid-cols-3 gap-8">
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
                <span
                  className="self-start px-3 py-1 rounded-full text-sm font-medium mb-4"
                  style={{ backgroundColor: "#ffb873", color: "#393536" }}
                >
                  {post.category}
                </span>

                <h3
                  className="text-xl font-bold mb-4 group-hover:text-orange-600 transition-colors"
                  style={{ color: "#393536" }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>

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

export default Blog

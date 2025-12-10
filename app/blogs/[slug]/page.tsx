/**
 * Single Blog Post Page
 * 
 * Fetches single published post from Supabase.
 */

import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/services/blog.service"
import ShareButton from "@/components/share-button"
import Footer from "@/components/footer"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmix.hr"

// Format date for display
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('hr-HR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const projectSlug = process.env.NEXT_PUBLIC_PROJECT_SLUG || 'digital-mix'
  const result = await getPublishedPostBySlug(projectSlug, slug)
  
  if (!result.success || !result.data) {
    return {
      title: "Članak nije pronađen",
    }
  }
  
  const post = result.data
  
  return {
    title: post.title,
    description: post.excerpt || `Pročitajte članak "${post.title}" na DigitalMix blogu.`,
    keywords: post.category ? [post.category, "digitalni marketing", "društvene mreže", "blog"] : undefined,
    authors: [{ name: "DigitalMix" }],
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ["DigitalMix"],
      images: post.picture_url ? [
        {
          url: post.picture_url,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
      images: post.picture_url ? [post.picture_url] : undefined,
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  }
}

// Generate static params for all published posts (for static generation)
export async function generateStaticParams() {
  const projectSlug = process.env.NEXT_PUBLIC_PROJECT_SLUG || 'digital-mix'
  const result = await getPublishedPosts(projectSlug)
  const posts = result.data || []
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const projectSlug = process.env.NEXT_PUBLIC_PROJECT_SLUG || 'digital-mix'
  
  const result = await getPublishedPostBySlug(projectSlug, slug)

  if (!result.success || !result.data) {
    notFound()
  }

  const post = result.data

  // Get related posts (other published posts)
  const allPostsResult = await getPublishedPosts(projectSlug)
  const relatedPosts = (allPostsResult.data || [])
    .filter(p => p.id !== post.id)
    .slice(0, 2)

  // JSON-LD structured data for blog post
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.picture_url || undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: "DigitalMix",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "DigitalMix",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-digitalmix.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${slug}`,
    },
    articleSection: post.category || "Digitalni Marketing",
    wordCount: post.content ? post.content.replace(/<[^>]*>/g, '').split(/\s+/).length : undefined,
    timeRequired: `PT${post.read_time}M`,
    inLanguage: "hr-HR",
  }

  return (
    <>
      {/* Structured Data for Blog Post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
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
      <article className="pt-52 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.category && (
              <span
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: "#ffb873", color: "#393536" }}
              >
                {post.category}
              </span>
            )}
            <span className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              {post.read_time} min čitanja
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: "#393536" }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
          )}

          {/* Share Button */}
          <ShareButton title={post.title} excerpt={post.excerpt || ''} />

          {/* Featured Image */}
          {post.picture_url && (
            <div className="my-8 rounded-2xl overflow-hidden">
              <img
                src={post.picture_url}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Divider */}
          <div className="w-20 h-1 rounded-full mb-12" style={{ backgroundColor: "#dc7d12" }} />

          {/* Content */}
          {post.content && (
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-800"
              style={{
                ["--tw-prose-headings" as string]: "#393536",
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

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
                  <article className="h-full rounded-2xl bg-white border-2 border-gray-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col overflow-hidden">
                    {relatedPost.picture_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.picture_url}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-8 flex flex-col flex-grow">
                      {relatedPost.category && (
                        <span
                          className="self-start px-3 py-1 rounded-full text-sm font-medium mb-4"
                          style={{ backgroundColor: "#ffb873", color: "#393536" }}
                        >
                          {relatedPost.category}
                        </span>
                      )}
                      <h3
                        className="text-xl font-bold mb-4 group-hover:text-orange-600 transition-colors"
                        style={{ color: "#393536" }}
                      >
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-gray-600 flex-grow">{relatedPost.excerpt}</p>
                      )}
                      <div
                        className="flex items-center gap-2 mt-6 font-semibold group-hover:gap-3 transition-all"
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
          </div>
        </section>
      )}

      {/* <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl"
          style={{ background: "linear-gradient(135deg, #dc7d12 0%, #ffb873 100%)" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Spreman za digitalni rast?</h2>
          <p className="text-white/90 text-lg mb-8">
            Kontaktiraj nas za besplatnu analizu i saznaj kako možemo pomoći tvom poslovanju.
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
      </section> */}

        <Footer />
      </main>
    </>
  )
}

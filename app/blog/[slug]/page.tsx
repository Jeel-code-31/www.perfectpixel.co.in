import Image from "next/image"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { Post } from "@/sanity/lib/types"

// Force Next.js to check for new content every 60 seconds
export const revalidate = 60;

// 1. THIS FIXES THE BUILD ERROR: Pre-generates all existing blog slugs
export async function generateStaticParams() {
  const allSlugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
  const posts = await sanityFetch<{ slug: string }[]>({
    query: allSlugsQuery,
    perspective: "published",
    tags: ["post"],
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#AC9148] pl-6 italic my-6 text-white">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => <h1 className="oh-headline text-3xl md:text-4xl mt-8 mb-4 text-[#1A1815]">{children}</h1>,
    h2: ({ children }) => <h2 className="oh-headline text-2xl md:text-3xl mt-6 mb-4 text-[#1A1815]">{children}</h2>,
    h3: ({ children }) => <h3 className="oh-headline text-xl md:text-2xl mt-6 mb-3 text-white">{children}</h3>,
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value).width(800).height(600).url()
      return (
        <div className="my-8">
          <Image src={imageUrl} alt={value.alt || "Content image"} width={800} height={600} className="w-full h-auto rounded-lg" />
        </div>
      )
    },
  },
}

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, mainImage, gallery,
  author->{ _id, name, image },
  publishedAt, excerpt, body,
  categories[]->{ _id, title }
}`

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  
  // Fetch the post data
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post"],
    preview: isEnabled,
  })

  if (!post) return notFound()

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : null

  return (
    <main className="min-h-screen text-[#1A1815]">
      <Navbar />
      <section className="pt-28 mt-20 pb-16 px-5 md:px-4">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[#AC9148] mb-6">(Blog Post)</p>
          <h1 className="oh-headline text-4xl md:text-5xl lg:text-6xl mb-6 text-[#1A1815]">{post.title}</h1>
          <div className="flex flex-wrap gap-4 mb-8 text-sm text-[#AC9148]">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image src={urlFor(post.author.image).width(40).height(40).url()} alt={post.author.name} width={40} height={40} className="rounded-full" />
                )}
                <span>Author : {post.author.name}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {imageUrl && (
        <div className="max-w-[900px] mx-auto px-5 mb-16">
          <Image src={imageUrl} alt={post.title} width={1200} height={600} className="rounded-lg w-full h-auto" priority />
        </div>
      )}

      <section className="px-5 md:px-4 pb-20">
        <div className="max-w-[900px] mx-auto">
          <article className="prose prose-lg max-w-none text-white leading-relaxed">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </article>
          
          <div className="mt-12">
            <Link href="/blog" className="text-[#AC9148] hover:underline uppercase font-bold">
              ← Back to All Blogs
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
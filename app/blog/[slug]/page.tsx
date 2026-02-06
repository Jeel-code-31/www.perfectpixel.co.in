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

// Custom PortableText components to fix hydration errors
const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#AC9148] pl-6 italic my-6 text-white">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => (
      <h1 className="oh-headline text-3xl md:text-4xl mt-8 mb-4 text-[#1A1815]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="oh-headline text-2xl md:text-3xl mt-6 mb-4 text-[#1A1815]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="oh-headline text-xl md:text-2xl mt-6 mb-3 text-white">
        {children}
      </h3>
    ),
    // Standard paragraph to ensure no nested Divs
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2 text-white/70">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4">
        {children}
      </li>
    ),
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#AC9148] hover:underline">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value).width(800).height(600).url()
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Content image"}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )
    },
  },
}

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  mainImage,
  gallery,
  author->{
    _id,
    name,
    image,
  },
  publishedAt,
  excerpt,
  body,
  categories[]->{
    _id,
    title,
  }
}`

const relatedPostsQuery = `*[_type == "post" && slug.current != $slug][0...3]{
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  author->{name}
}`

async function getPost(slug: string, preview: boolean) {
  return sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post"],
    preview,
  })
}

async function getRelated(currentSlug: string | undefined, preview: boolean) {
  const posts = await sanityFetch<Post[]>({
    query: relatedPostsQuery,
    params: { slug: currentSlug || "" },
    tags: ["post"],
    preview,
  })

  return posts || []
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const post = await getPost(slug, isEnabled)

  if (!post) return notFound()

  const related = await getRelated(post.slug?.current, isEnabled)
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : null

  return (
    <main className="min-h-screen text-[#1A1815]">
      <Navbar />

      <section className="pt-28 mt-20 pb-16 px-5 md:px-4">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[#AC9148] mb-6">(Blog Post)</p>
          <h1 className="oh-headline text-4xl md:text-5xl lg:text-6xl mb-6 text-[#1A1815]">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-[#AC9148]">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span>Author :  {post.author.name}</span>
              </div>
            )}
            {post.publishedAt && (
              <span suppressHydrationWarning>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {imageUrl && (
        <section className="relative group px-5 md:px-4 mb-16">
          <div className="max-w-[900px] mx-auto">
            <div className="relative p-[2px] overflow-hidden rounded-lg">
              <div
                className="absolute inset-[-1000%] animate-border-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#AC9148_50%,#E2E8F0_100%)] 
                opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative bg-black rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="px-5 md:px-4 pb-20">
        <div className="max-w-[900px] mx-auto">
          <article className="prose prose-lg max-w-none text-white leading-relaxed">
            {post.body && (
              <PortableText value={post.body} components={portableTextComponents} />
            )}
          </article>

          {post.gallery && post.gallery.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#D4AF85] border-opacity-20">
              <h2 className="oh-headline text-2xl md:text-3xl mb-8">Blog Images</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {post.gallery?.map((image: any, idx: number) => {
                  // Use a consistent aspect ratio (e.g., 4:3 or 1:1) for a clean grid
                  const galleryImageUrl = image
                    ? urlFor(image).width(1000).height(1000).fit('max').auto('format').url()
                    : null;

                  return galleryImageUrl ? (
                    <div key={image._key || idx} className="group relative">
                      <div className="relative p-[1px] bg-gradient-to-r from-[#AC9148] to-[#D4AF85] rounded-lg overflow-hidden shadow-md transition-shadow duration-300 group-hover:shadow-xl">

                        {/* Image Container with Aspect Ratio Lock */}
                        <div className="relative aspect-square overflow-hidden bg-[#1A1815] rounded-[7px]">
                          <Image
                            src={galleryImageUrl}
                            alt={image.alt || `Gallery image ${idx + 1}`}
                            fill 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
          )}
          <div className="mt-25">
          <a href="/blog"  className="text-[#c2542d] hover:underline uppercase text-xl font-bold">
            ← Back to All Blogs
          </a>
        </div>

          {post.categories && post.categories.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#D4AF85] border-opacity-20">
              <h3 className="oh-label mb-4">Categories</h3>
              <div className="flex flex-wrap gap-3">
                {post.categories.map((cat: any) => (
                  <span
                    key={cat._id}
                    className="inline-block px-4 py-2 bg-[#AC9148] bg-opacity-10 text-[#AC9148] rounded-full text-sm"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
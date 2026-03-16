import Image from "next/image"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import { projectBySlugQuery, featuredProjectsQuery } from "@/sanity/lib/queries"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PortableText } from "@portabletext/react"

export const revalidate = 60;

type Project = {
  title: string
  slug?: { current: string }
  heroImage?: any
  heroVideo?: string
  gallery?: any[]
  excerpt?: string
  overview?: any[]
  challenge?: any[]
  solution?: any[]
  location?: string
  year?: string
  materials?: string[]
  services?: string[]
  credits?: { name?: string; role?: string; organization?: string }[]
  awards?: { title?: string; year?: number; organization?: string; link?: string }[]
}

export async function generateStaticParams() {
  const allProjectSlugsQuery = `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`
  const projects = await sanityFetch<{ slug: string }[]>({
    query: allProjectSlugsQuery,
    perspective: "published",
    tags: ["project"],
  })
  return projects.map((project) => ({ slug: project.slug }))
}

async function getProject(slug: string, preview: boolean) {
  return sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project"],
    preview,
  })
}

async function getRelated(currentSlug: string | undefined, preview: boolean) {
  const featured = await sanityFetch<Project[]>({
    query: featuredProjectsQuery,
    tags: ["project"],
    preview,
  })
  return featured.filter((p) => p.slug?.current !== currentSlug).slice(0, 3)
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const project = await getProject(slug, isEnabled)

  if (!project) return notFound()

  const heroUrl = project.heroImage ? urlFor(project.heroImage).width(1600).url() : null

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32  px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto border-b border-white/10 pb-6 mt-10">
          <p className="text-[#AC9148] uppercase tracking-widest text-xs mb-4">Project</p>
          <h1 className="text-2xl md:text-3xl lg:text-6xl font-light uppercase tracking-tighter mb-6">
            {project.title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-8 text-xs uppercase tracking-widest text-[#AC9148]">
            {project.services?.length ? <span>Services: {project.services.join(" / ")}</span> : null}
          </div>
        </div>
      </section>

      {/* Hero Visual Section */}
      {heroUrl && (
       <section className="px-6 md:px-10">
  <div className="max-w-[1400px] mx-auto overflow-hidden rounded-sm">
    <Image
      src={heroUrl}
      alt={project.title}
      width={1600}
      height={900}
      className="w-full h-auto object-cover"
      priority
    />
  </div>
</section>
      )}

      {/* Content Section: Overview, Challenge, Solution */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[1400px] mx-auto">
          {/* THE GOLDEN LINE */}
          <div className="w-full h-[1px] bg-[#AC9148] mb-16 opacity-100" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 uppercase text-[10px] tracking-[0.3em] font-bold text-white/40 space-y-10">
              <div>
                <p className="text-[#AC9148] mb-2">Year</p>
                <p className="text-white">{project.year}</p>
              </div>
              <div>
                <p className="text-[#AC9148] mb-2">Client</p>
                <p className="text-white">{project.title}</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-20">
              {project.overview && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#AC9148] font-bold">Overview</span>
                  <div className="md:col-span-3 text-lg leading-relaxed font-light prose prose-invert max-w-none">
                    <PortableText value={project.overview} />
                  </div>
                </div>
              )}
              {project.challenge && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#AC9148] font-bold">Challenge</span>
                  <div className="md:col-span-3 text-lg leading-relaxed font-light prose prose-invert max-w-none">
                    <PortableText value={project.challenge} />
                  </div>
                </div>
              )}
              {project.solution && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#AC9148] font-bold">Solution</span>
                  <div className="md:col-span-3 text-lg leading-relaxed font-light prose prose-invert max-w-none">
                    <PortableText value={project.solution} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery?.length ? (
        <section className="px-6 md:px-10 py-24 bg-white">
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header */}
           

            <div className="columns-1 md:columns-2 gap-10 space-y-10">
              {project.gallery.map((img, idx) => {
                const imgUrl = urlFor(img).width(1200).url();
                if (!imgUrl) return null;

                return (
                  <div
                    key={idx}
                    className="relative break-inside-avoid overflow-hidden rounded-sm bg-zinc-900/50 group"
                  >
                    <Image
                      src={imgUrl}
                      alt={img?.alt || project.title}
                      width={1200}
                      height={800} 
                      className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Subtle Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                );
              })}
            </div>

            {/* Back Button */}
            <div className="mt-20 flex justify-center">
              <Link
                href="/projects"
                className="group flex items-center gap-4 uppercase text-[10px] tracking-[0.3em] font-bold text-black hover:text-[#AC9148] transition-colors"
              >
                <span className="w-8 h-[1px] bg-black group-hover:bg-[#AC9148] group-hover:w-12 transition-all duration-500"></span>
                Back to All Works
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  )
}

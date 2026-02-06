import Image from "next/image"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { sanityFetch } from "@/sanity/lib/fetch"
import { projectsQuery, projectsByTypeQuery, categoriesQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import { projectBySlugQuery, featuredProjectsQuery } from "@/sanity/lib/queries"
import Navbar from "@/components/navbar"
import { Fullscreen } from "lucide-react"

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

  const related = await getRelated(project.slug?.current, isEnabled)

  const heroUrl = ((urlFor(project.heroImage as any) as any)?.width(1600).height(1000).url()) || null

  return (
    <main className="min-h-screen text-[#1A1815]">
      <Navbar />
      <section className="pt-28 pb-16 px-5 md:px-4">
        <div className="max-w-[1200px] mx-auto mt-10">
          <p className="oh-label mb-4">(Project)</p>
          <h1 className="oh-headline text-4xl md:text-5xl lg:text-6xl mb-4 text-[#1A1815]">{project.title}</h1>
          <p className="oh-body text-lg max-w-3xl">{project.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-[#4a4640]">
            {project.location && <span>Location: {project.location}</span>}
            {project.year && (
              <span suppressHydrationWarning>
                Year: {project.year}
              </span>
            )}
            {project.materials?.length ? <span>Materials: {project.materials.join(", ")}</span> : null}
            {project.services?.length ? <span>Services: {project.services.join(", ")}</span> : null}
          </div>
        </div>
      </section>
      {heroUrl && (
        <section className="relative group">
  <div className="relative p-[2px] overflow-hidden rounded-lg">
    <div className="absolute inset-[-1000%] animate-border-slow bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#AC9148_50%,#E2E8F0_100%)] 
      opacity-50 group-hover:opacity-100 transition-opacity duration-500" 
    />

 
    <div className="relative bg-black rounded-lg overflow-hidden">
      <Image
        src={heroUrl}
        alt={project.title}
        width={1400}
        height={200}
        className="w-full h-100 object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        priority
      />
    </div>
  </div>
</section>

      )}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[1000px] mx-auto space-y-10">
          {project.credits?.length ? (
            <div>
              <p className="oh-label mb-3">(Credits)</p>
              <div className="grid md:grid-cols-2 gap-3">
                {project.credits.map((c, idx) => (
                  <div key={idx} className="oh-body text-sm">
                    <span className="font-semibold">{c.name}</span>
                    {c.role ? ` — ${c.role}` : ""} {c.organization ? `, ${c.organization}` : ""}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {project.awards?.length ? (
            <div>
              <p className="oh-label mb-3">(Recognition)</p>
              <ul className="space-y-2">
                {project.awards.map((a, idx) => (
                  <li key={idx} className="oh-body text-sm">
                    {a.title} {a.organization ? `— ${a.organization}` : ""} {a.year ? `(${a.year})` : ""}{" "}
                    {a.link ? (
                      <a href={a.link} className="text-[#C2542D] underline" target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {project.gallery?.length ? (
  /* Added bg-neutral-50 to change the section background */
  <section className="px-6 md:px-10 py-24 bg-[#F8F8F8]"> 
    <div className="max-w-[1400px] mx-auto">
      <p className=" mb-8 text-[#1A1815] font-medium tracking-widest uppercase text-xl">
        ( Gallery Selection )
      </p>
      
      {/* Changed to 3 columns on desktop for a better rhythm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {project.gallery.map((img, idx) => {
          const imgUrl = urlFor(img).width(1200).height(1200).url();
          
          if (!imgUrl) return null;

          return (
            <div 
              key={idx} 
              /* This creates the "Card" effect */
              className="group bg-white p-3 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <Image 
                  src={imgUrl} 
                  alt={img?.alt || project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              {/* Optional: Add a small caption under each card if you want */}
              <div className="mt-4 pb-2">
                <p className="text-[14px] uppercase tracking-tighter text-gray">
                  Work — 0{idx + 1}
                </p>
              </div>
              
            </div>
            
          );
        })}
      </div>
      <div className="mt-10">
          <a href="/projects" className="text-[#c2542d] hover:underline uppercase text-sm font-bold">
            ← Back to All Works
          </a>
        </div>
      </div>
  </section>
) : null}
    
    </main>
  )
}


// "use client";

import { draftMode } from "next/headers";
import { WorksFilters } from "@/components/work-filters";
import { ProjectsGrid } from '@/components/Project-Grid';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { categoriesQuery, projectsByTypeQuery, projectsQuery } from "@/sanity/lib/queries";
import type { Project, Category } from "@/sanity/lib/types";
import type { Metadata } from 'next';
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: 'Our Projects | Perfect Pixel Studio',
  description: 'Explore our portfolio of digital excellence and monumental art.',
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function WorksPage({ searchParams }: Props) {
  const { isEnabled } = await draftMode();
  const params = await searchParams;
  const categorySlug = params.category;

  const [categories, projects] = await Promise.all([
    sanityFetch<Category[]>({
      query: categoriesQuery,
      tags: ["category"],
      preview: isEnabled,
    }).catch(() => []),
    
    categorySlug
      ? sanityFetch<Project[]>({
          query: projectsByTypeQuery,
          params: { categorySlug },
          tags: ["project"],
          preview: isEnabled,
        }).catch(() => [])
      : sanityFetch<Project[]>({
          query: projectsQuery,
          tags: ["project"],
          preview: isEnabled,
        }).catch(() => []),
  ]);

  const mapped = (projects || []).map((proj, idx) => ({
    title: proj.title || "Untitled Project",
    number: String(idx + 1).padStart(2, "0"),
    image: proj.heroImage 
      ? urlFor(proj.heroImage).width(800).height(1000).url() 
      : "/placeholder.jpg",
    href: proj.slug?.current ? `/projects/${proj.slug.current}` : "#", 
    size: "medium" as const,
    description: proj.excerpt || "",
  }));

  return (
    <main className="min-h-screen relative overflow-hidden bg-white !text-black">
      <Navbar />
      
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[url('/grid.svg')] bg-repeat"
      />
   
      <section className="relative px-4 sm:px-6 md:px-10 mt-10 sm:pt-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Using !text-black to override any global oh-headline styles */}
          <h1 className="oh-headline text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-10 !text-black font-bold tracking-tight">
            Our Excellent Projects
          </h1>
          
          <p className="oh-body text-sm sm:text-base md:text-lg max-w-[650px] mb-8 sm:mb-10 leading-relaxed !text-black">
            A curated selection of our monumental installations and public artworks. Each commission blends cultural
            research, material mastery, and architectural integration.
          </p>
          
          <div className="border-b border-neutral-200 pb-8">
             <WorksFilters categories={categories} />
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 md:px-10 pt-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          {mapped.length === 0 ? (
            <div className="text-center py-16 sm:py-20 !text-neutral-500">
              <p className="oh-body text-base sm:text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <div className="!text-black">
              <ProjectsGrid projects={mapped} />
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
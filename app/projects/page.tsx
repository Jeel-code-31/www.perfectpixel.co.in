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

  // Fetch categories and projects in parallel
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

  // Transform data for the ProjectsGrid component
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
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />
      
      {/* Background Decorative Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
      />
   
      <section className="relative px-4 sm:px-6 md:px-10 mt-24 sm:pt-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <h1 className="oh-headline text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-10">
            Our Excellent Projects
          </h1>
          <p className="oh-body text-sm sm:text-base md:text-lg max-w-[650px] mb-8 sm:mb-10 leading-relaxed">
            A curated selection of our monumental installations and public artworks. Each commission blends cultural
            research, material mastery, and architectural integration.
          </p>
          
          <WorksFilters categories={categories} />
        </div>
      </section>

      <section className="relative px-4 sm:px-6 md:px-10 pt-5 pb-10 sm:pb-28 md:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          {mapped.length === 0 ? (
            <div className="text-center py-16 sm:py-20 text-[#6B6560]">
              <p className="oh-body text-base sm:text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <ProjectsGrid projects={mapped} />
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
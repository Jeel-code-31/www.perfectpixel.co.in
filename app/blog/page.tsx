import { draftMode } from "next/headers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { Post } from "@/sanity/lib/types";
import type { Metadata } from 'next';
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { BlogFilters } from "@/components/blog-filters";

export const metadata: Metadata = {
    title: 'Blog | Perfect Pixel Studio',
    description: 'Insights, stories, and perspectives from our team.',
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
    const { isEnabled } = await draftMode();
    const params = await searchParams;
    const sortBy = params.sort || "latest";
    const sortOrder = sortBy === 'oldest' ? 'asc' : 'desc';

    // Fetch ordered data directly from Sanity
    const query = `*[_type == "post"] | order(publishedAt ${sortOrder}) {
                _id,
                title,
                slug,
                mainImage,
                excerpt,
                publishedAt,
                author->{
                    name,
                    image
                },
                categories[]->{
                    title
                }
            }`;

    const posts = await sanityFetch<Post[]>({
        query,
        tags: ["post"],
        preview: isEnabled,
    }).catch(() => []);

   
    const mappedPosts = (posts || []).map((post, idx) => {
 
        let issueNumber;
        if (sortBy === "latest") {
            issueNumber = String(posts.length - idx).padStart(2, "0");
        } else {
            issueNumber = String(idx + 1).padStart(2, "0");
        }

        return {
            ...post,
            displayNumber: issueNumber,
            image: post.mainImage
                ? urlFor(post.mainImage).width(800).height(600).url()
                : "/placeholder.jpg",
            href: post.slug?.current ? `/blog/${post.slug.current}` : "#",
        };
    });

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a] text-white">
            <Navbar />

            <section className="relative px-4 sm:px-6 md:px-10 mt-24 pt-20 pb-10">
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <h1 className="oh-headline text-5xl md:text-7xl mb-6 uppercase tracking-tighter">
                        Our Blog
                    </h1>
                    <p className="oh-body text-gray-400 text-lg max-w-[600px] leading-relaxed">
                        Explore our insights, stories, and perspectives on design, art, and creative innovation.
                    </p>
                </div>
            </section>

            <section className="px-4 sm:px-6 md:px-10 pb-32">
                <div className="max-w-[1400px] mx-auto">
                    <BlogFilters currentSort={sortBy} />
                    
                    {mappedPosts.length === 0 ? (
                        <div className="text-center py-20 text-gray-600 border border-dashed border-white/10 rounded-xl">
                            <p>No blog posts found yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {mappedPosts.map((post) => (
                                <Link key={post._id} href={post.href} className="group">
                                    <article className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-[#111] border border-white/5 transition-all duration-500 hover:border-[#AC9148]/50">
                                        
                                        {/* Large Background Number */}
                                        <div className="absolute top-0 right-4 z-0 pointer-events-none select-none">
                                            <span className="text-[10rem] font-black text-[#AC9148] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 italic">
                                                {post.displayNumber}
                                            </span>
                                        </div>

                                        <div className="relative h-72 overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                                        </div>

                                        <div className="p-8 flex-1 flex flex-col relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-[10px] font-bold tracking-[0.4em] text-[#AC9148] uppercase">
                                                    Issue {post.displayNumber}
                                                </span>
                                                <div className="h-[2px] flex-1 bg-[#AC9148]/20" />
                                            </div>

                                            <h3 className="oh-headline text-3xl mb-4 group-hover:text-[#AC9148] transition-colors">
                                                {post.title}
                                            </h3>    
                                            <div className="mt-auto pt-6 border-t border-white/20 flex justify-between items-center text-[10px] tracking-widest uppercase text-gray-500 font-bold">
                                                <span> Author Name:{post.author?.name}</span>
                                                <span suppressHydrationWarning>
                                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}
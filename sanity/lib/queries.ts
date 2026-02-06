import { defineQuery } from "next-sanity";

// Query to get ALL projects
export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,          // Keep as object for type safety
    heroImage,     // Keep as object so urlFor() works
    featured,
    category->{
      _id,
      title,
      slug
    },
    excerpt,
    year,
    location,
    order
  }
`);

// Query to get projects filtered by Category
export const projectsByTypeQuery = defineQuery(`
  *[_type == "project" && category->slug.current == $categorySlug] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    heroImage,
    excerpt,
    year,
    location,
    category->{
      title, 
      slug
    }
  }
`);

// Query to get all categories
export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`);
// sanity/lib/queries.ts


export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    heroImage,
    excerpt
  }
`)
// sanity/lib/queries.ts

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroImage,
    description,
    excerpt,
    "category": category->title,
    gallery, 
    // If your gallery has specific metadata or alt text, use: gallery[] { ..., asset-> }
    year,
    location
  }
`)

// Query to get ALL blog posts
export const postsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    author->{
      _id,
      name,
      image
    },
    categories[]->{
      _id,
      title
    }
  }
`)

// Query to get a single blog post by slug
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    body,
    author->{
      _id,
      name,
      image
    },
    categories[]->{
      _id,
      title
    }
  }
`)

// Query to get related blog posts
export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    author->{
      name
    }
  }
`)
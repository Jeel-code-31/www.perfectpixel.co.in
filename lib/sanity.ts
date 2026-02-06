import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'la1f1tef',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getProjects() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    description,
    image,
    category,
    link,
    publishedAt,
    "imageUrl": image.asset->url
  }`
  return await client.fetch(query)
}

export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    description,
    image,
    category,
    link,
    content,
    publishedAt,
    "imageUrl": image.asset->url
  }`
  return await client.fetch(query, { slug })
}

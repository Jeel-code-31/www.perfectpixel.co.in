import { createClient } from "@sanity/client"
import "server-only"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-22"
const token = process.env.SANITY_API_READ_TOKEN // Matches the .env name

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, 
  perspective: "previewDrafts",
})

export function getClient(preview = false) {
  // If preview is requested but token is missing, 
  // we return the regular client to avoid "Unauthorized" errors
  if (preview && !token) {
    console.warn("Preview requested but SANITY_API_READ_TOKEN is missing.")
    return client
  }
  return preview ? previewClient : client
}
import { createClient } from "@sanity/client"
import "server-only"

// Use the exact names from your .env
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-22"
const token = process.env.SANITY_READ_TOKEN 

// SAFETY: If projectId is missing, this logs a clear error instead of crashing the build
if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Check Vercel Environment Variables.")
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
})

export const previewClient = token 
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, token, perspective: "previewDrafts" })
  : client

export function getClient(preview = false) {
  return preview ? previewClient : client
}
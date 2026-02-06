# Sanity CMS Integration Setup Guide

## Your Project Details
- **Project ID**: `la1f1tef`
- **Organization ID**: `ohY8sqcXv`
- **Dataset**: `production` (default)

## Environment Variables Required

Add these environment variables to your `.env.local` or through the Vercel dashboard:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=la1f1tef
NEXT_PUBLIC_SANITY_DATASET=production
```

## Quick Start

1. **Set Environment Variables**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add the two variables above
   - Redeploy your project

2. **Create Sanity Schema**
   - Log in to your Sanity Studio at: `https://sanity.io/manage/personal/la1f1tef`
   - Create a new schema type called "project" with these fields:
     - `title` (string, required)
     - `description` (text)
     - `slug` (slug, sourced from title)
     - `image` (image)
     - `category` (string, enum: Design, Development, Strategy, etc.)
     - `link` (url)
     - `content` (rich text)
     - `publishedAt` (datetime)

3. **Add Sample Projects**
   - Visit your Sanity Studio
   - Create sample project documents
   - Publish them to the production dataset

## File Structure

- `/lib/sanity.ts` - Sanity client configuration and query functions
- `/app/projects/page.tsx` - Projects page that fetches from Sanity

## Features Implemented

✅ Fetch projects from Sanity CMS
✅ Filter by category
✅ Responsive grid layout
✅ Smooth animations and hover effects
✅ Image optimization
✅ Loading states

## GROQ Queries Used

The projects page uses this GROQ query to fetch data:

```groq
*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  description,
  image,
  category,
  link,
  publishedAt,
  "imageUrl": image.asset->url
}
```

## Testing

Once configured, visit `/projects` to see your Sanity-powered projects page in action!

## Troubleshooting

If projects don't load:
1. Verify environment variables are set in Vercel
2. Check Sanity Studio has published project documents
3. Ensure dataset is set to "production"
4. Check browser console for any fetch errors

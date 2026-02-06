"use client"
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes'
import {projectId, dataset} from './sanity/env' // Ensure these are imported

export default defineConfig({
  basePath: '/admin',
  projectId, // This must not be undefined
  dataset,   // This must not be undefined

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schema.types,
  },
})
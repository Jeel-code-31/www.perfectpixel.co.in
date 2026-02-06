import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageWithAlt',
  title: 'Image with Alt',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
    }),
  ],
})
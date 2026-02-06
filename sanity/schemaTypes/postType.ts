import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const post = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'meta', title: 'Metadata' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'content',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'imageWithAlt',
      group: 'media',
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
      group: 'media',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      group: 'meta',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'meta',
    },
    {
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'content',
    },
    {
      name: 'body',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'meta',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author->name',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const {author} = selection
      return {...selection, subtitle: author ? `by ${author}` : 'No author'}
    },
  },
}

export default post

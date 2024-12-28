// categoryType.js
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of this category (optional).',
    }),
    // Keywords/Tags for Category SEO
    defineField({
      name: 'keywords',
      title: 'Keywords/Tags',
      type: 'array',
      of: [{type: 'string'}], // Array of strings for keywords
      description: 'Comma-separated keywords for SEO (e.g., "react, javascript, frontend").',
    }),
  ],
})

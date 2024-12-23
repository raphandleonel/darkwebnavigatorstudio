import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    // Author Name
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // Slug for Author
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    // Author Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    // Author Bio
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Bio',
      validation: (rule) => rule.max(200).warning('Keep the bio concise (under 200 characters).'),
    }),
  ],
})

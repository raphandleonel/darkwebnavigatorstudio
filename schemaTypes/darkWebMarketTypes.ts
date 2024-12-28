import {defineField, defineType} from 'sanity'

export const darkWebMarketType = defineType({
  name: 'darkWebMarket',
  title: 'Dark Web Market',
  type: 'document',
  fields: [
    // Market Name
    defineField({
      name: 'name',
      type: 'string',
      title: 'Market Name',
      validation: (rule) => rule.required(),
    }),
    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    // Description
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      validation: (rule) => rule.max(160),
    }),
    // Market Details
    defineField({
      name: 'details',
      type: 'array',
      title: 'Market Details',
      of: [{type: 'block'}],
      description: 'Detailed description or notes about the market.',
    }),
    // Image
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Market Logo',
      options: {hotspot: true},
    }),
    // Links
    defineField({
      name: 'links',
      type: 'array',
      title: 'Market Links',
      of: [
        defineField({
          type: 'object',
          name: 'marketLink',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Link Name',
              validation: (rule) => rule.required(),
            },
            {name: 'url', type: 'url', title: 'URL', validation: (rule) => rule.required()},
          ],
        }),
      ],
    }),
    // Related Post Reference
    defineField({
      name: 'relatedPost',
      type: 'reference',
      title: 'Related Post',
      to: [{type: 'post'}],
    }),
  ],
})

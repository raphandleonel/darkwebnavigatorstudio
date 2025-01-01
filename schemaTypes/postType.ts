import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // Title Field
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // Slug Field
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    // Published Date
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    // Main Image
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
    }),
    // Cover Image
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),
    // Open Graph Image (SEO)
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (Optional)',
      type: 'image',
      options: {hotspot: true},
      description: 'This image will be used for social media previews.',
    }),
    // Excerpt Field
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      validation: (rule) =>
        rule.max(160).warning('Keep the excerpt under 160 characters for better SEO.'),
    }),
    // Body Content
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body Content',
      of: [
        {type: 'block'}, // For rich text content like paragraphs, headers, etc.
        {
          type: 'image', // For adding images within the content
          options: {hotspot: true},
          fields: [
            // Caption field
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Add a caption for the image (optional).',
            }),
            // Alt text field
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Describe the image for accessibility and SEO.',
            }),
          ],
        },
      ],
    }),
    // Category
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cryptocurrency',
      type: 'array',
      title: 'Cryptocurrency',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Bitcoin (BTC)', value: 'BTC'},
              {title: 'Ethereum (ETH)', value: 'ETH'},
              {title: 'Monero (XMR)', value: 'XMR'},
              {title: 'Litecoin (LTC)', value: 'LTC'},
              {title: 'Bitcoin Cash (BCH)', value: 'BCH'},
            ],
            layout: 'tags',
          },
        },
      ],
      // hidden: ({parent}) => {
      //   const categorySlug = parent?.category?.slug?.current
      //   return !['darknet-vendors-shop', 'deep-web-forums', 'top-dark-web-markets'].includes(
      //     categorySlug,
      //   )
      // },
    }),
    // Tags
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    // Author Reference
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
    }),
    // Estimated Read Time
    defineField({
      name: 'readTime',
      type: 'number',
      title: 'Estimated Read Time (minutes)',
      validation: (rule) => rule.min(1).max(60),
    }),
    // SEO Title
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      validation: (rule) =>
        rule.max(60).warning('SEO titles should be under 60 characters for best results.'),
    }),
    // SEO Description
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Description',
      validation: (rule) =>
        rule.max(160).warning('SEO descriptions should be under 160 characters for best results.'),
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
            },
            {name: 'url', type: 'string', title: 'URL', validation: (rule) => rule.required()},
          ],
        }),
      ],
    }),
    // Featured Post Flag
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Post',
      description: 'Flag to mark this post as featured',
      initialValue: false,
    }),
  ],
})

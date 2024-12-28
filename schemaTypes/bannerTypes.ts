import {defineField, defineType} from 'sanity'

export const bannerType = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Short descriptive title for the banner.',
    }),
    defineField({
      name: 'position',
      type: 'number',
      title: 'Position',
      description: 'Ordering position for frontend display',
      validation: (Rule) =>
        Rule.required().custom(async (position, context) => {
          if (typeof position !== 'number') return true // Allow empty values

          const currentDocumentId = context.document?._id || null // Safely get _id or null

          if (currentDocumentId === null && position === null) return true //Allow null position for new document

          const existingBanners = await context
            .getClient({apiVersion: '2023-07-03'})
            .fetch(
              `*[_type == "banner" && position == $position ${currentDocumentId ? '&& _id != $id' : ''}]`,
              {position, id: currentDocumentId},
            )

          if (existingBanners.length > 0) {
            return 'Position is already in use. Please choose a different position.'
          }

          return true
        }),
    }),

    defineField({
      name: 'media',
      type: 'image',
      title: 'Image/GIF',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
      description: 'The image or GIF for the banner.',
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postLink',
      title: 'Post Link (Internal)',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link (URL)',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
  ],
})

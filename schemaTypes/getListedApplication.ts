import {defineField, defineType} from 'sanity'

export const getListedApplication = defineType({
  name: 'getListedApplication',
  title: 'Get Listed Applications',
  type: 'document',
  fields: [
    // Name of Market, Shop, or Forum
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name of Market, Shop, or Forum',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),

    // Mirror Links or URLs
    defineField({
      name: 'mirrorLinks',
      type: 'array',
      title: 'Mirror Links or URLs',
      of: [{type: 'url'}],
      validation: (Rule) => Rule.required(),
    }),

    // Type (Market, Shop, or Forum)
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          {title: 'Market', value: 'market'},
          {title: 'Shop', value: 'shop'},
          {title: 'Forum', value: 'forum'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // PGP Key Link (only for Markets)
    defineField({
      name: 'pgpKeyLink',
      type: 'url',
      title: 'PGP Key Link',
      description: 'Link to PGP Key for Market (Only for Markets)',
      hidden: ({parent}) => parent?.type !== 'market',
    }),

    // Banner Image
    defineField({
      name: 'banner',
      type: 'image',
      title: 'Banner',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Cryptocurrencies Accepted
    defineField({
      name: 'cryptocurrencies',
      type: 'array',
      title: 'Cryptocurrencies Accepted',
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

      validation: (Rule) => Rule.required().min(1),
    }),

    // Description of Market/Shop/Forum
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) => Rule.required().min(50).max(1000),
    }),

    // Date of submission
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    // Jabber Address (for contacting user)
    defineField({
      name: 'jabberAddress',
      type: 'string',
      title: 'Jabber Address',
      description: 'Jabber (XMPP) address for contacting the vendor',
      validation: (Rule) => Rule.required().min(5).max(255),
    }),

    // Approval status
    defineField({
      name: 'approved',
      type: 'boolean',
      title: 'Approved',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'banner',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: `${subtitle.substring(0, 30)}...`, // Limit the message preview
      }
    },
  },
})

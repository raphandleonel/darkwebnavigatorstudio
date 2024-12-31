import {defineField, defineType} from 'sanity'

export const contactUsSubmission = defineType({
  name: 'contactUs',
  title: 'Contact Us',
  type: 'document',
  fields: [
    // Email of the person submitting the contact form
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: (Rule) => Rule.required().email(),
    }),

    // The message they submitted
    defineField({
      name: 'message',
      type: 'text',
      title: 'Message',
      validation: (Rule) => Rule.required().min(10).max(1000),
    }),

    // Date of submission
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
      readOnly: true, // The created date should be read-only
    }),

    // A flag to indicate if the message has been viewed by an admin
    defineField({
      name: 'viewed',
      type: 'boolean',
      title: 'Viewed',
      initialValue: false,
    }),
  ],
  // This will make the document visible in the Sanity Studio dashboard for the admins
  preview: {
    select: {
      title: 'email',
      subtitle: 'createdAt',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: `${new Date(subtitle).toLocaleDateString()}`, // Limit the message preview
      }
    },
  },
})

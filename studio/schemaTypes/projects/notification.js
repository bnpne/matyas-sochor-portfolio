import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Project Notifications',
  name: 'notification',
  type: 'document',
  fields: [
    defineField({
      title: 'Notification Title',
      name: 'notificationTitle',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      title: 'Notification Description',
      name: 'notificationDesc',
      type: 'array',
      of: [{type: 'block', options: {spellcheck: true}}],
      validation: rule => rule.required(),
    }),
    defineField({
      title: 'Notification Image',
      name: 'notificationImage',
      type: 'image',
    }),
  ],
})

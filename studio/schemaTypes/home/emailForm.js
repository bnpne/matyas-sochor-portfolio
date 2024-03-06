import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'emailForm',
  title: 'Email',
  type: 'document',
  fields: [
    defineField({
      title: 'Email Text',
      name: 'emailText',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      title: 'Email URL',
      name: 'emailUrl',
      type: 'text',
      rows: 1,
      validation: rule => rule.required().email(true),
    }),
  ],
})

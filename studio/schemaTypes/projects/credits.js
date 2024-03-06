import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Credits',
  name: 'credits',
  type: 'object',
  fields: [
    defineField({
      title: 'Credit Name',
      name: 'creditName',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      title: 'Credit Title',
      name: 'creditTitle',
      type: 'string',
      validation: rule => rule.required(),
    }),
  ],
})

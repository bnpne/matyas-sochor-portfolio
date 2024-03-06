import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Tags',
  name: 'tags',
  type: 'document',
  fields: [
    defineField({
      title: 'Tag Title',
      name: 'tagTitle',
      type: 'string',
      validation: rule => rule.required(),
    }),
  ],
})

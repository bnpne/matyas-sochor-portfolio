import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Show Tags',
  name: 'showTags',
  type: 'document',
  fields: [
    defineField({
      title: 'Show Tag Title',
      name: 'showTagTitle',
      type: 'string',
      validation: rule => rule.required(),
    }),
  ],
})

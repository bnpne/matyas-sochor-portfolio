import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Filters',
  name: 'filters',
  type: 'document',
  fields: [
    defineField({
      title: 'Filter',
      name: 'filter',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tags'}}],
      layout: 'list',
    }),
  ],
})

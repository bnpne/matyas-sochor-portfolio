import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Show Filters',
  name: 'showFilters',
  type: 'document',
  fields: [
    defineField({
      title: 'Show Filter',
      name: 'showFilter',
      type: 'array',
      of: [{type: 'reference', to: {type: 'showTags'}}],
      validation: rule => rule.length(1),
      layout: 'list',
    }),
  ],
})

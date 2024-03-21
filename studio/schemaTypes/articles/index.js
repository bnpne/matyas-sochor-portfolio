import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'articles',
  title: 'Articles',
  type: 'document',
  fields: [
    defineField({
      title: 'Articles',
      name: 'articleList',
      type: 'array',
      of: [{type: 'article'}],
    }),
  ],
})

import {defineType} from 'sanity'

export default defineType({
  title: 'Links',
  name: 'links',
  type: 'document',
  fields: [
    {
      name: 'linkArray',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'link'}],
    },
  ],
})

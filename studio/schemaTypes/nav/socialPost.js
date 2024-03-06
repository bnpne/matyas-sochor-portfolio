import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Social Post',
  name: 'socialPost',
  type: 'document',
  fields: [
    defineField({
      title: 'Post Text',
      name: 'postText',
      type: 'array',
      of: [{type: 'block', options: {spellcheck: true}}],
      validation: rule => rule.required(),
    }),
    defineField({
      title: 'Post Location',
      name: 'postLocation',
      type: 'string',
      validation: rule => rule.required(),
    }),
  ],
})

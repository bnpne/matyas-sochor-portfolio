import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageOption',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'addBorder',
      title: 'Add Image Border',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

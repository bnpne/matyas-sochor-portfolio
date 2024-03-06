import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      title: 'Selected Projects',
      name: 'greeting',
      type: 'string',
    }),
  ],
})

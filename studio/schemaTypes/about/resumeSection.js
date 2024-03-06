import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Resume Section',
  name: 'resumeSection',
  type: 'object',
  fields: [
    defineField({
      title: 'Section Title',
      name: 'sectionTitle',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({}),
  ],
})

import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Link',
  name: 'link',
  type: 'document',
  fields: [
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pdf',
      title: 'PDF',
      type: 'file',
    }),
    defineField({
      name: 'linkURL',
      title: 'Link URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      title: 'In Footer',
      name: 'inFooter',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
  ],
})

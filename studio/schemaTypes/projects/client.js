import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      title: 'Client Name',
      name: 'clientName',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      title: 'Client Link',
      name: 'clientLink',
      description: 'Client link to their website.',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
  ],
})

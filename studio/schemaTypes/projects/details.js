import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'details',
  title: 'Project Details',
  type: 'document',
  fields: [
    defineField({
      title: 'Clients',
      name: 'clients',
      type: 'array',
      of: [{type: 'client'}],
    }),
    defineField({
      title: 'Project Year',
      name: 'projectYear',
      type: 'date',
      options: {
        dateFormat: 'YYYY',
      },
      // validation: rule => rule.required(),
    }),
    defineField({
      title: 'Project Type',
      name: 'projectType',
      type: 'array',
      of: [{type: 'string'}],
      // validation: rule => rule.required(),
    }),
    defineField({
      title: 'Project Role',
      name: 'projectRole',
      type: 'array',
      of: [{type: 'string'}],
      // validation: rule => rule.required(),
    }),
    defineField({
      title: 'Agencies',
      name: 'agencies',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      title: 'Awards',
      name: 'awards',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})

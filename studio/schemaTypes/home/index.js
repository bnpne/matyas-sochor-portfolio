import {defineField} from 'sanity'

export default defineField({
  name: 'home',
  title: 'Home & Nav Sidebar',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Avatar',
      name: 'avatar',
      type: 'image',
    }),
    defineField({
      title: 'Email Form',
      name: 'emailForm',
      type: 'emailForm',
    }),
    defineField({
      title: 'Social Post',
      name: 'socialPost',
      type: 'socialPost',
    }),
    defineField({
      title: 'Selected Projects',
      name: 'selectedProjects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'projects'}]}],
      description: 'Selected Projects to appear on the homepage',
    }),
    defineField({
      title: 'Selected Experiments',
      name: 'selectedExperiments',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'projects'}]}],
      description: 'Selected Experiments to appear on the homepage',
    }),
  ],
})

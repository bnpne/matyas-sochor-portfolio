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
      type: 'reference',
      description: 'Selected Projects to appear on the homepage',
      to: [{type: 'projects'}],
    }),
    defineField({
      title: 'Selected Experiments',
      name: 'selectedExperiments',
      type: 'reference',
      description: 'Selected Experiments to appear on the homepage',
      to: [{type: 'projects'}],
    }),
  ],
})

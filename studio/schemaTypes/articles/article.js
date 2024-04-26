import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Article',
  name: 'article',
  type: 'object',
  fields: [
    defineField({
      title: 'Article Type Filters',
      name: 'articleTypeFilters',
      type: 'showFilters',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
    }),
    defineField({
      name: 'articleCategory',
      title: 'Article Category',
      description:
        'If an article is a project, this wont show. This is the category that the card falls under. Only Projects and Experiments have this',
      type: 'string',
    }),
    defineField({
      name: 'articleImage',
      title: 'Article Image',
      type: 'image',
    }),
    defineField({
      name: 'articleDesc',
      title: 'Article Description',
      type: 'text',
    }),
    defineField({
      type: 'boolean',
      name: 'isProject',
      title: 'Is Project',
      initialValue: false,
      description: 'Is this an exisiting project?',
    }),
    defineField({
      title: 'Project Reference',
      name: 'project',
      type: 'reference',
      options: {
        disableNew: true,
      },
      to: [{type: 'projects'}],
      hidden: ({parent}) => parent.isProject !== true,
    }),
    defineField({
      name: 'articleLinkText',
      title: 'Article Link Text',
      type: 'string',
      hidden: ({parent}) => parent.isProject !== false,
    }),
    defineField({
      name: 'articleLink',
      title: 'Article Link',
      type: 'url',
      hidden: ({parent}) => parent.isProject !== false,
    }),
  ],
})

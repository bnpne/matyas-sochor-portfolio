import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Projects & Experiments',
  name: 'projects',
  type: 'document',
  fields: [
    defineField({
      title: 'Project Title',
      name: 'projectTitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Project Slug',
      name: 'projectSlug',
      type: 'slug',
      description:
        'The slug is the url extension. Please hyphenate and leave no spaces. For example "pebble-life" will appear as "example.com/pebble-life"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Project Type',
      name: 'projectType',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Selected Project', value: 'selectedProject'},
          {title: 'Experiment', value: 'experiment'},
        ],
      },
      initialValue: 'selectedProject',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Project Snippet',
      name: 'projectSnippet',
      description: 'This snippet appears on the home page in its respective card',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Project Card Image',
      name: 'projectCardImage',
      description: 'Image that appears on the card on the nav sidebar',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      // title: 'Project Case Image',
      // name: 'projectCaseImage',
      // description: 'Image that appears on the homepage as a Case Image',
      // type: 'image',
      // validation: rule => rule.required(),
      title: 'Project Case Image',
      name: 'projectCaseImage',
      type: 'object',
      fields: [
        defineField({
          title: 'Image, Video, or Embed (Vimeo)',
          type: 'string',
          name: 'projectCaseSelection',
          options: {
            layout: 'radio',
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Video', value: 'video'},
              {title: 'Vimeo', value: 'vimeo'},
            ],
          },
        }),
        defineField({
          title: 'Image',
          type: 'image',
          name: 'image',
          hidden: ({parent}) => parent?.projectCaseSelection !== 'image',
        }),
        defineField({
          title: 'Video',
          type: 'file',
          name: 'video',
          hidden: ({parent}) => parent?.projectCaseSelection !== 'video',
        }),
        defineField({
          title: 'Vimeo',
          type: 'url',
          description: 'Vimeo Url',
          name: 'vimeo',
          hidden: ({parent}) => parent?.projectCaseSelection !== 'vimeo',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Project Detail Image',
      name: 'projectDetailImage',
      type: 'image',
      description: 'The image that appears on the project detail hero, rather than the home page.',
    }),
    defineField({
      title: 'Project Filters',
      name: 'projectFilters',
      type: 'filters',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Notifications',
      name: 'notifications',
      type: 'array',
      of: [{type: 'notification'}],
    }),
    defineField({
      title: 'Project Details',
      name: 'projectDetails',
      type: 'details',
      // validation: rule => rule.required(),
    }),
    defineField({
      title: 'Project Hero Text',
      name: 'projectHeroText',
      description: 'The main description on the Project Detail page',
      type: 'array',
      of: [{type: 'block'}],
      // validation: rule => rule.required(),
    }),
    defineField({
      title: 'Project Sections',
      name: 'projectSections',
      type: 'projectSections',
    }),
    defineField({
      title: 'Project Credits',
      name: 'projectCredits',
      type: 'array',
      of: [{type: 'credits'}],
    }),
  ],
})

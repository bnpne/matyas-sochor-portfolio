import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Project Sections',
  name: 'projectSections',
  type: 'object',
  fields: [
    defineField({
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Full Width Image',
          name: 'fullWidthImage',
          type: 'object',
          fields: [
            defineField({
              title: 'Image, Video, or Embed (Vimeo)',
              type: 'string',
              name: 'fullWidthSelection',
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
              hidden: ({parent}) => parent?.fullWidthSelection !== 'image',
            }),
            defineField({
              title: 'Video',
              type: 'file',
              name: 'video',
              hidden: ({parent}) => parent?.fullWidthSelection !== 'video',
            }),
            defineField({
              title: 'Vimeo',
              type: 'url',
              description: 'Vimeo Url',
              name: 'vimeo',
              hidden: ({parent}) => parent?.fullWidthSelection !== 'vimeo',
            }),
          ],
          validation: (rule) => rule.required(),
        }),
        defineArrayMember({
          title: 'Image Grid',
          name: 'imageGrid',
          type: 'object',
          fields: [
            defineField({
              title: 'Grid Image',
              name: 'gridImage',
              type: 'array',
              of: [{type: 'imageOption', name: 'imageOption'}],
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineArrayMember({
          title: 'Project Text',
          name: 'projectText',
          type: 'object',
          fields: [
            defineField({
              title: 'Project Text Highlight',
              name: 'projectTextHighlight',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              title: 'Project Text Title',
              name: 'projectTextTitle',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              title: 'Project Text Body',
              name: 'projectTextBody',
              type: 'array',
              of: [{type: 'block'}],
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineArrayMember({
          title: 'Project Plain Text',
          name: 'projectPlainText',
          type: 'object',
          fields: [
            defineField({
              title: 'Plain Text',
              name: 'plainText',
              type: 'array',
              of: [{type: 'block'}],
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
})

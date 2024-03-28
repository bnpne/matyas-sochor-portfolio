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
              title: 'Image or Video',
              type: 'string',
              name: 'fullWidthSelection',
              options: {
                layout: 'radio',
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video', value: 'video'},
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
          ],
          validation: rule => rule.required(),
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
              of: [
                {type: 'image', name: 'image'},
                {type: 'file', name: 'video'},
              ],
              validation: rule => rule.required(),
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
              validation: rule => rule.required(),
            }),
            defineField({
              title: 'Project Text Title',
              name: 'projectTextTitle',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              title: 'Project Text Body',
              name: 'projectTextBody',
              type: 'array',
              of: [{type: 'block'}],
              validation: rule => rule.required(),
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
              validation: rule => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
})

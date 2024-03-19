import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  title: 'About',
  name: 'about',
  type: 'document',
  fields: [
    defineField({
      title: 'Bio',
      name: 'bio',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      title: 'Bio Image',
      name: 'bioImage',
      type: 'image',
    }),
    defineField({
      title: 'Image Carousel',
      name: 'imageCarousel',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      title: 'Resume',
      name: 'resume',
      type: 'object',
      fields: [
        defineField({
          title: 'Education List',
          name: 'eductionList',
          type: 'array',
          of: [
            defineArrayMember({
              title: 'Eduction',
              name: 'eduction',
              type: 'object',
              fields: [
                defineField({
                  title: 'School',
                  name: 'school',
                  type: 'string',
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'School Link',
                  name: 'schoolLink',
                  type: 'url',
                }),
                defineField({
                  title: 'School Location',
                  name: 'schoolLocation',
                  type: 'string',
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'Currently Attending',
                  name: 'currentlyAttending',
                  type: 'boolean',
                  initialValue: false,
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'School Date',
                  name: 'schoolDate',
                  type: 'date',
                  hidden: ({parent, value}) =>
                    !value && parent?.currentlyAttending,
                  options: {
                    dateFormat: 'YYYY',
                  },
                }),
              ],
            }),
          ],
        }),
        defineField({
          title: 'Experience List',
          name: 'experienceList',
          type: 'array',
          of: [
            defineArrayMember({
              title: 'Experience',
              name: 'experience',
              type: 'object',
              fields: [
                defineField({
                  title: 'Job',
                  name: 'job',
                  type: 'string',
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'Job Link',
                  name: 'jobLink',
                  type: 'url',
                }),
                defineField({
                  title: 'Job Role',
                  name: 'jobRole',
                  type: 'string',
                }),
                defineField({
                  title: 'Job Location',
                  name: 'jobLocation',
                  type: 'string',
                }),
                defineField({
                  title: 'Job Start Date',
                  name: 'jobStartDate',
                  type: 'date',
                  options: {
                    dateFormat: 'YYYY',
                  },
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'Current Job',
                  name: 'currentJob',
                  type: 'boolean',
                  initialValue: false,
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'Job End Date',
                  name: 'jobEndDate',
                  type: 'date',
                  hidden: ({parent, value}) => !value && parent?.currentJob,
                  options: {
                    dateFormat: 'YYYY',
                    calendarTodayLabel: 'Present',
                  },
                }),
              ],
            }),
          ],
        }),
        defineField({
          title: 'Recognition List',
          name: 'recognitionList',
          type: 'array',
          of: [
            defineArrayMember({
              title: 'Recognition',
              name: 'recognition',
              type: 'object',
              fields: [
                defineField({
                  title: 'Award',
                  name: 'award',
                  type: 'string',
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'Award Link',
                  name: 'awardLink',
                  type: 'url',
                }),
                defineField({
                  title: 'Award Date',
                  name: 'awardDate',
                  type: 'date',
                  options: {
                    dateFormat: 'YYYY',
                  },
                  validation: rule => rule.required(),
                }),
              ],
            }),
          ],
        }),
        defineField({
          title: 'Software List',
          name: 'softwareList',
          type: 'array',
          of: [
            defineArrayMember({
              title: 'Software',
              name: 'software',
              type: 'string',
              validation: rule => rule.required(),
            }),
          ],
        }),
        defineField({
          title: 'Selected Projects & Collaborations',
          name: 'selectedAndCollaborations',
          type: 'array',
          of: [
            defineArrayMember({
              title: 'Project',
              name: 'project',
              type: 'object',
              fields: [
                defineField({
                  title: 'Project Title',
                  name: 'projectTitle',
                  type: 'string',
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'Project Link',
                  name: 'projectLink',
                  type: 'url',
                }),
                defineField({
                  title: 'Project Type',
                  name: 'projectType',
                  type: 'string',
                  options: {
                    list: ['project', 'collaboration'],
                  },
                  validation: rule => rule.required(),
                }),
                defineField({
                  title: 'Project Date',
                  name: 'projectDate',
                  type: 'date',
                  options: {
                    dateFormat: 'YYYY',
                  },
                  validation: rule => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})

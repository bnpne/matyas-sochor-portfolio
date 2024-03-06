import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './structures/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'matyas-sochor',

  projectId: '8dcr9g54',
  dataset: 'production',

  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
})

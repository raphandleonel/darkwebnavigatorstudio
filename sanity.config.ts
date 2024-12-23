import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import MyLogo from './components/MyLogo'

export default defineConfig({
  name: 'default',
  title: 'deepwebnavigator',
  icon: MyLogo,
  projectId: 'o9seh0j0',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

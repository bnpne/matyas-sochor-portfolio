import type {
  SanityImageObject,
  SanityImageSource,
  SanityImageWithAssetStub,
} from '@sanity/image-url/lib/types/types'
import {
  ImageAsset,
  type DateRule,
  type BlockAnnotationDefinition,
  type PortableTextBlock,
  type ReferenceSchemaType,
  type Reference,
  type Slug,
  type ArraySchemaType,
  type ObjectField,
  type BooleanSchemaType,
  type ObjectSchemaType,
} from '@sanity/types'

export {}

declare global {
  interface HomeData {
    _id: string
    _type: 'home'
    _createdAt: string
    name: string
    avatar?: {
      _type: string
      asset: {
        _ref: string
        _type: string
      }
    }
    emailForm?: {
      _type: string
      emailText: string
      emailUrl: string
    }
    socialPost?: {
      postLocation: string
      postText: PortableTextBlock
    }
    selectedProjects?: Reference
    selectedExperiments?: Reference
  }

  interface Project {
    _id: string
    _type: string
    _createdAt: string
    _rev: string
    projectHeroText: PortableTextBlock
    projectCardImage: SanityImageObject
    projectSections: ArraySchemaType
    projectDetails: ObjectField
    projectSnippet: string
    projectFilters: ObjectSchemaType
    projectSlug: Slug
    projectType: BooleanSchemaType
    projectTitle: string
    projectCredits: ObjectSchemaType
    projectCaseImage: SanityImageObject
  }
}

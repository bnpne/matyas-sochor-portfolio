import type {
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
  }
}

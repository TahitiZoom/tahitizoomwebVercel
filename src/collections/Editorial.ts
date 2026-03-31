import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Editorial: CollectionConfig = {
  slug: 'editorial',
  labels: { singular: 'Article', plural: 'Éditorial' },
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt'],
    description: 'Collez simplement le lien de votre post Facebook.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
    },
    {
      name: 'facebookUrl',
      type: 'text',
      label: 'URL du post Facebook',
      required: true,
      admin: {
        description: 'Ex: https://www.facebook.com/TahitiZoom/posts/xxxxx',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Catégorie',
      options: [
        { label: 'Reportage', value: 'reportage' },
        { label: 'Culture',   value: 'culture'   },
        { label: 'Portraits', value: 'portraits' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

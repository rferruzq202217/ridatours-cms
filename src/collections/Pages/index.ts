import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { AlertaConfianza } from '../../blocks/AlertaConfianza/config'
import { TablaConversion } from '../../blocks/TablaConversion/config'
import { BotonCTA } from '../../blocks/BotonCTA/config'
import { FAQ } from '../../blocks/FAQ/config'
import { ContentAcordeon } from '../../blocks/ContentAcordeon/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'city', 'country', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, AlertaConfianza, TablaConversion, BotonCTA, FAQ, ContentAcordeon],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'country',
      type: 'select',
      label: 'País',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'España', value: 'espana' },
        { label: 'Italia', value: 'italia' },
        { label: 'Francia', value: 'francia' },
        { label: 'Reino Unido', value: 'reino-unido' },
        { label: 'Alemania', value: 'alemania' },
        { label: 'Países Bajos', value: 'paises-bajos' },
        { label: 'Portugal', value: 'portugal' },
        { label: 'Grecia', value: 'grecia' },
        { label: 'Austria', value: 'austria' },
        { label: 'Bélgica', value: 'belgica' },
        { label: 'República Checa', value: 'republica-checa' },
        { label: 'Irlanda', value: 'irlanda' },
        { label: 'Suiza', value: 'suiza' },
        { label: 'Croacia', value: 'croacia' },
        { label: 'Hungría', value: 'hungria' },
        { label: 'Polonia', value: 'polonia' },
        { label: 'Turquía', value: 'turquia' },
        { label: 'Marruecos', value: 'marruecos' },
        { label: 'Estados Unidos', value: 'estados-unidos' },
        { label: 'México', value: 'mexico' },
        { label: 'Japón', value: 'japon' },
        { label: 'Tailandia', value: 'tailandia' },
      ],
    },
    {
      name: 'city',
      type: 'text',
      label: 'Ciudad',
      admin: {
        position: 'sidebar',
        description: 'Nombre de la ciudad (ej: Roma, París, Barcelona)',
      },
    },
    {
      name: 'citySlug',
      type: 'text',
      label: 'Slug de ciudad',
      admin: {
        position: 'sidebar',
        description: 'Slug para URLs (ej: roma, paris, barcelona)',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (!value && siblingData?.city) {
              return siblingData.city
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'continent',
      type: 'select',
      label: 'Continente',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Europa', value: 'europa' },
        { label: 'Asia', value: 'asia' },
        { label: 'América del Norte', value: 'america-norte' },
        { label: 'América del Sur', value: 'america-sur' },
        { label: 'África', value: 'africa' },
        { label: 'Oceanía', value: 'oceania' },
      ],
      defaultValue: 'europa',
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

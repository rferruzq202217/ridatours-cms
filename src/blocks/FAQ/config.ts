import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BoldFeature,
  ItalicFeature,
} from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ / Preguntas Frecuentes',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'titulo',
      label: 'Título de la sección',
      type: 'text',
      defaultValue: 'Preguntas Frecuentes',
      admin: {
        placeholder: 'Ej: Preguntas Frecuentes sobre la Torre Eiffel',
      },
    },
    {
      name: 'preguntas',
      label: 'Preguntas y Respuestas',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Pregunta',
        plural: 'Preguntas',
      },
      admin: {
        description: 'Añade pares de pregunta/respuesta para el acordeón FAQ',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'pregunta',
          label: 'Pregunta',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Ej: ¿Cuánto tiempo dura la visita a la Torre Eiffel?',
          },
        },
        {
          name: 'respuesta',
          label: 'Respuesta',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: () => [
              BoldFeature(),
              ItalicFeature(),
              LinkFeature(),
              UnorderedListFeature(),
              OrderedListFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'generarSchema',
      label: 'Generar Schema FAQ (SEO)',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Genera automáticamente el schema JSON-LD para FAQ (mejora SEO)',
      },
    },
    {
      name: 'estiloAcordeon',
      label: 'Estilo del acordeón',
      type: 'select',
      defaultValue: 'classic',
      options: [
        { label: 'Clásico', value: 'classic' },
        { label: 'Minimalista', value: 'minimal' },
        { label: 'Con bordes', value: 'bordered' },
      ],
    },
  ],
}

import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BoldFeature,
  ItalicFeature,
} from '@payloadcms/richtext-lexical'

export const ContentAcordeon: Block = {
  slug: 'contentAcordeon',
  interfaceName: 'ContentAcordeonBlock',
  labels: {
    singular: 'Contenido Acordeón',
    plural: 'Contenidos Acordeón',
  },
  fields: [
    {
      name: 'titulo',
      label: 'Título de la sección',
      type: 'text',
      admin: {
        placeholder: 'Ej: Todo lo que necesitas saber',
      },
    },
    {
      name: 'subtitulo',
      label: 'Subtítulo (opcional)',
      type: 'text',
      admin: {
        placeholder: 'Ej: Información detallada sobre tu visita',
      },
    },
    {
      name: 'items',
      label: 'Secciones desplegables',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Sección',
        plural: 'Secciones',
      },
      admin: {
        description: 'Cada sección se mostrará como un acordeón desplegable',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'titulo',
          label: 'Título del acordeón',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Ej: Horarios y precios',
          },
        },
        {
          name: 'icono',
          label: 'Icono (opcional)',
          type: 'select',
          options: [
            { label: 'Ninguno', value: 'none' },
            { label: '🕐 Reloj', value: 'clock' },
            { label: '📍 Ubicación', value: 'location' },
            { label: '💰 Dinero', value: 'money' },
            { label: '📋 Lista', value: 'list' },
            { label: 'ℹ️ Info', value: 'info' },
            { label: '⭐ Estrella', value: 'star' },
            { label: '🎫 Ticket', value: 'ticket' },
            { label: '📸 Cámara', value: 'camera' },
            { label: '🚶 Persona', value: 'person' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'contenido',
          label: 'Contenido',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: () => [
              BoldFeature(),
              ItalicFeature(),
              LinkFeature(),
              UnorderedListFeature(),
              OrderedListFeature(),
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'abiertoPorDefecto',
          label: 'Abierto por defecto',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Si está marcado, este acordeón estará expandido al cargar la página',
          },
        },
      ],
    },
    {
      name: 'permitirMultiplesAbiertos',
      label: 'Permitir múltiples acordeones abiertos',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Si está desmarcado, al abrir un acordeón se cerrarán los demás',
      },
    },
    {
      name: 'estilo',
      label: 'Estilo visual',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Tarjetas', value: 'cards' },
        { label: 'Minimalista', value: 'minimal' },
        { label: 'Con bordes', value: 'bordered' },
        { label: 'Sombreado', value: 'shadowed' },
      ],
    },
  ],
}

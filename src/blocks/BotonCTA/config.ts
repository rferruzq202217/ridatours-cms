import type { Block } from 'payload'

export const BotonCTA: Block = {
  slug: 'botonCTA',
  interfaceName: 'BotonCTABlock',
  labels: {
    singular: 'Botón CTA Grande',
    plural: 'Botones CTA',
  },
  fields: [
    {
      name: 'texto',
      label: 'Texto del botón',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Ej: 🚨 ¡RESERVAR AHORA TU ENTRADA SIN COLAS! 🚨',
      },
    },
    {
      name: 'subtexto',
      label: 'Subtexto (debajo del botón)',
      type: 'text',
      admin: {
        placeholder: 'Ej: Cancelación gratuita hasta 24h antes',
      },
    },
    {
      name: 'url',
      label: 'URL de destino',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'https://www.tiqets.com/es/...',
        description: '🔗 URL de afiliado o página de destino',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'estilo',
          label: 'Estilo del botón',
          type: 'select',
          defaultValue: 'primary',
          admin: {
            width: '50%',
          },
          options: [
            { label: 'Principal (Destacado)', value: 'primary' },
            { label: 'Secundario', value: 'secondary' },
            { label: 'Urgente (Rojo)', value: 'urgent' },
            { label: 'Éxito (Verde)', value: 'success' },
            { label: 'Outline', value: 'outline' },
          ],
        },
        {
          name: 'tamano',
          label: 'Tamaño',
          type: 'select',
          defaultValue: 'large',
          admin: {
            width: '50%',
          },
          options: [
            { label: 'Grande', value: 'large' },
            { label: 'Mediano', value: 'medium' },
            { label: 'Pequeño', value: 'small' },
          ],
        },
      ],
    },
    {
      name: 'anchoCompleto',
      label: 'Ancho completo',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'El botón ocupará todo el ancho disponible',
      },
    },
    {
      name: 'abrirEnNuevaVentana',
      label: 'Abrir en nueva ventana',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'tracking',
      label: 'Atributos de Tracking (opcional)',
      type: 'group',
      admin: {
        condition: (data) => data?.mostrarTracking,
      },
      fields: [
        {
          name: 'dataCategory',
          label: 'Categoría (GA)',
          type: 'text',
          admin: {
            placeholder: 'Ej: CTA_Guia',
          },
        },
        {
          name: 'dataAction',
          label: 'Acción (GA)',
          type: 'text',
          admin: {
            placeholder: 'Ej: Click_Reservar',
          },
        },
        {
          name: 'dataLabel',
          label: 'Etiqueta (GA)',
          type: 'text',
          admin: {
            placeholder: 'Ej: Torre_Eiffel_CTA_Principal',
          },
        },
      ],
    },
  ],
}

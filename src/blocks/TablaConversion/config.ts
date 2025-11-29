import type { Block } from 'payload'

export const TablaConversion: Block = {
  slug: 'tablaConversion',
  interfaceName: 'TablaConversionBlock',
  labels: {
    singular: 'Tabla de Conversión',
    plural: 'Tablas de Conversión',
  },
  fields: [
    {
      name: 'tituloTabla',
      label: 'Título de la tabla',
      type: 'text',
      admin: {
        placeholder: 'Ej: Compara todas las opciones de entrada',
      },
    },
    {
      name: 'subtitulo',
      label: 'Subtítulo / Descripción',
      type: 'text',
      admin: {
        placeholder: 'Ej: Precios actualizados - Reserva con cancelación gratuita',
      },
    },
    {
      name: 'productos',
      label: 'Productos / Entradas',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Producto',
        plural: 'Productos',
      },
      admin: {
        description: '⚠️ CRÍTICO: Aquí defines cada fila con nombre, precio, URL de afiliado y texto del CTA.',
        initCollapsed: false,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'nombre',
              label: 'Nombre del producto',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Ej: Entrada Torre Eiffel - 2º Piso',
                width: '50%',
              },
            },
            {
              name: 'destacado',
              label: 'Destacar como recomendado',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                width: '25%',
                description: 'Resalta esta opción',
              },
            },
            {
              name: 'etiquetaDestacado',
              label: 'Etiqueta',
              type: 'text',
              admin: {
                placeholder: 'Ej: ⭐ Más vendido',
                width: '25%',
                condition: (_, siblingData) => siblingData?.destacado,
              },
            },
          ],
        },
        {
          name: 'descripcionCorta',
          label: 'Descripción corta',
          type: 'text',
          admin: {
            placeholder: 'Ej: Acceso sin colas + audioguía incluida',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'precio',
              label: 'Precio',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Ej: Desde 35€',
                width: '50%',
              },
            },
            {
              name: 'precioOriginal',
              label: 'Precio original (tachado)',
              type: 'text',
              admin: {
                placeholder: 'Ej: 45€',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'urlAfiliado',
          label: '🔗 URL de Afiliado',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://www.tiqets.com/es/...',
            description: 'Pega aquí tu enlace de afiliado de Tiqets',
          },
        },
        {
          name: 'textoCTA',
          label: 'Texto del botón CTA',
          type: 'text',
          required: true,
          defaultValue: 'Reservar ahora',
          admin: {
            placeholder: 'Ej: Reservar ahora, Ver disponibilidad',
          },
        },
        {
          name: 'caracteristicas',
          label: 'Características incluidas',
          type: 'array',
          labels: {
            singular: 'Característica',
            plural: 'Características',
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'texto',
              label: 'Texto',
              type: 'text',
              admin: {
                placeholder: 'Ej: ✓ Acceso sin colas',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'estiloTabla',
      label: 'Estilo de la tabla',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Tarjetas (Cards)', value: 'cards' },
        { label: 'Tabla clásica', value: 'table' },
        { label: 'Lista compacta', value: 'list' },
      ],
    },
  ],
}

import type { Block } from 'payload'

export const AlertaConfianza: Block = {
  slug: 'alertaConfianza',
  interfaceName: 'AlertaConfianzaBlock',
  labels: {
    singular: 'Alerta de Confianza',
    plural: 'Alertas de Confianza',
  },
  fields: [
    {
      name: 'icono',
      label: 'Icono',
      type: 'select',
      defaultValue: 'shield',
      options: [
        { label: '🛡️ Escudo (Garantía)', value: 'shield' },
        { label: '✅ Check Verde', value: 'check' },
        { label: '🔒 Candado', value: 'lock' },
        { label: '⭐ Estrella', value: 'star' },
        { label: '💯 100%', value: 'hundred' },
        { label: '🎫 Ticket', value: 'ticket' },
        { label: '⚡ Rayo', value: 'bolt' },
      ],
    },
    {
      name: 'titulo',
      label: 'Título de la alerta',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Ej: Acceso 100% Garantizado',
      },
    },
    {
      name: 'mensaje',
      label: 'Mensaje',
      type: 'textarea',
      required: true,
      admin: {
        placeholder: 'Ej: Trabajamos con Tiqets, plataforma oficial verificada...',
        rows: 3,
      },
    },
    {
      name: 'estilo',
      label: 'Estilo del recuadro',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Información (Azul)', value: 'info' },
        { label: 'Éxito (Verde)', value: 'success' },
        { label: 'Advertencia (Amarillo)', value: 'warning' },
        { label: 'Urgente (Rojo)', value: 'danger' },
        { label: 'Destacado (Morado)', value: 'highlight' },
      ],
    },
  ],
}

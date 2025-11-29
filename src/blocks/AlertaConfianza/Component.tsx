import React from 'react'
import type { AlertaConfianzaBlock as AlertaConfianzaBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const iconMap: Record<string, string> = {
  shield: '🛡️',
  check: '✅',
  lock: '🔒',
  star: '⭐',
  hundred: '💯',
  ticket: '🎫',
  bolt: '⚡',
}

const styleMap: Record<string, { bg: string; border: string; text: string }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
  },
  danger: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
  },
  highlight: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-800 dark:text-purple-200',
  },
}

export const AlertaConfianzaBlock: React.FC<AlertaConfianzaBlockType> = (props) => {
  const { icono, titulo, mensaje, estilo } = props

  const icon = iconMap[icono ?? 'shield'] ?? '🛡️'
  const styles = styleMap[estilo ?? 'info'] ?? styleMap.info

  return (
    <div
      className={cn(
        'rounded-lg border-2 p-6 my-8',
        styles.bg,
        styles.border,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0" role="img" aria-hidden="true">
          {icon}
        </span>
        <div className="flex-1">
          <h3 className={cn('text-lg font-bold mb-2', styles.text)}>
            {titulo}
          </h3>
          <p className={cn('text-base leading-relaxed', styles.text)}>
            {mensaje}
          </p>
        </div>
      </div>
    </div>
  )
}

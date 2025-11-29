import React from 'react'
import type { BotonCTABlock as BotonCTABlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const estiloClasses: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  urgent: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25 animate-pulse',
  success: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/25',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
}

const tamanoClasses: Record<string, string> = {
  large: 'py-5 px-8 text-xl',
  medium: 'py-4 px-6 text-lg',
  small: 'py-3 px-4 text-base',
}

export const BotonCTABlock: React.FC<BotonCTABlockType> = (props) => {
  const {
    texto,
    subtexto,
    url,
    estilo,
    tamano,
    anchoCompleto,
    abrirEnNuevaVentana,
    tracking,
  } = props

  const estiloClass = estiloClasses[estilo ?? 'primary'] ?? estiloClasses.primary
  const tamanoClass = tamanoClasses[tamano ?? 'large'] ?? tamanoClasses.large

  return (
    <div className="my-10 text-center">
      <a
        href={url}
        target={abrirEnNuevaVentana ? '_blank' : '_self'}
        rel={abrirEnNuevaVentana ? 'noopener noreferrer' : undefined}
        data-category={tracking?.dataCategory}
        data-action={tracking?.dataAction}
        data-label={tracking?.dataLabel}
        className={cn(
          'inline-block font-bold rounded-xl transition-all transform hover:scale-105',
          estiloClass,
          tamanoClass,
          anchoCompleto && 'w-full max-w-2xl',
        )}
      >
        {texto}
      </a>
      {subtexto && (
        <p className="mt-3 text-sm text-muted-foreground">
          {subtexto}
        </p>
      )}
    </div>
  )
}

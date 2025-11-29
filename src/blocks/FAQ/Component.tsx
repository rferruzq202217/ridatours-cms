'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

type Pregunta = NonNullable<FAQBlockType['preguntas']>[number]

const FAQItem: React.FC<{
  pregunta: Pregunta
  isOpen: boolean
  onToggle: () => void
  estilo: string
}> = ({ pregunta, isOpen, onToggle, estilo }) => {
  const estiloClasses: Record<string, { container: string; header: string }> = {
    classic: {
      container: 'border-b border-border',
      header: 'hover:bg-muted/50',
    },
    minimal: {
      container: '',
      header: 'hover:text-primary',
    },
    bordered: {
      container: 'border border-border rounded-lg mb-3',
      header: 'hover:bg-muted/30 rounded-lg',
    },
  }

  const styles = estiloClasses[estilo] ?? estiloClasses.classic

  return (
    <div className={styles.container}>
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between py-4 px-4 text-left transition-colors',
          styles.header,
        )}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-foreground pr-4">{pregunta.pregunta}</span>
        <span
          className={cn(
            'flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-muted transition-transform',
            isOpen && 'rotate-180',
          )}
        >
          <svg
            className="w-4 h-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-4 pb-4 text-muted-foreground">
          {pregunta.respuesta && <RichText data={pregunta.respuesta} />}
        </div>
      </div>
    </div>
  )
}

export const FAQBlock: React.FC<FAQBlockType> = (props) => {
  const { titulo, preguntas, generarSchema, estiloAcordeon } = props
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const estilo = estiloAcordeon ?? 'classic'

  if (!preguntas || preguntas.length === 0) return null

  const faqSchema = generarSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: preguntas.map((p) => ({
          '@type': 'Question',
          name: p.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: p.pregunta,
          },
        })),
      }
    : null

  return (
    <div className="my-12">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {titulo && (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
          {titulo}
        </h2>
      )}

      <div
        className={cn(
          'max-w-3xl mx-auto',
          estilo === 'bordered' ? '' : 'divide-y divide-border border-y border-border',
        )}
      >
        {preguntas.map((pregunta, index) => (
          <FAQItem
            key={index}
            pregunta={pregunta}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            estilo={estilo}
          />
        ))}
      </div>
    </div>
  )
}

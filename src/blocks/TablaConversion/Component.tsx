import React from 'react'
import type { TablaConversionBlock as TablaConversionBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Producto = NonNullable<TablaConversionBlockType['productos']>[number]

const ProductCard: React.FC<{ producto: Producto }> = ({ producto }) => {
  const {
    nombre,
    descripcionCorta,
    precio,
    precioOriginal,
    urlAfiliado,
    textoCTA,
    destacado,
    etiquetaDestacado,
    caracteristicas,
  } = producto

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 p-6 transition-all hover:shadow-lg',
        destacado
          ? 'border-primary bg-primary/5 dark:bg-primary/10'
          : 'border-border bg-card hover:border-primary/50',
      )}
    >
      {destacado && etiquetaDestacado && (
        <div className="absolute -top-3 left-4 bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
          {etiquetaDestacado}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground mb-1">{nombre}</h3>
        {descripcionCorta && (
          <p className="text-muted-foreground text-sm">{descripcionCorta}</p>
        )}
      </div>

      {caracteristicas && caracteristicas.length > 0 && (
        <ul className="mb-4 space-y-1">
          {caracteristicas.map((item, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-green-500">✓</span>
              {item.texto}
            </li>
          ))}
        </ul>
      )}

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{precio}</span>
          {precioOriginal && (
            <span className="text-lg text-muted-foreground line-through">
              {precioOriginal}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">por persona</p>
      </div>

      <a
        href={urlAfiliado}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all',
          destacado
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        )}
      >
        {textoCTA || 'Reservar ahora'}
      </a>
    </div>
  )
}

const ProductRow: React.FC<{ producto: Producto }> = ({ producto }) => {
  const {
    nombre,
    descripcionCorta,
    precio,
    precioOriginal,
    urlAfiliado,
    textoCTA,
    destacado,
    etiquetaDestacado,
  } = producto

  return (
    <tr
      className={cn(
        'border-b border-border',
        destacado && 'bg-primary/5 dark:bg-primary/10',
      )}
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          {destacado && etiquetaDestacado && (
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded">
              {etiquetaDestacado}
            </span>
          )}
          <div>
            <div className="font-semibold text-foreground">{nombre}</div>
            {descripcionCorta && (
              <div className="text-sm text-muted-foreground">{descripcionCorta}</div>
            )}
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="font-bold text-foreground">{precio}</div>
        {precioOriginal && (
          <div className="text-sm text-muted-foreground line-through">{precioOriginal}</div>
        )}
      </td>
      <td className="py-4 px-4 text-right">
        <a
          href={urlAfiliado}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-all text-sm"
        >
          {textoCTA || 'Reservar'}
        </a>
      </td>
    </tr>
  )
}

export const TablaConversionBlock: React.FC<TablaConversionBlockType> = (props) => {
  const { tituloTabla, subtitulo, productos, estiloTabla } = props

  const estilo = estiloTabla ?? 'cards'

  if (!productos || productos.length === 0) return null

  return (
    <div className="my-12">
      {(tituloTabla || subtitulo) && (
        <div className="text-center mb-8">
          {tituloTabla && (
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {tituloTabla}
            </h2>
          )}
          {subtitulo && (
            <p className="text-muted-foreground">{subtitulo}</p>
          )}
        </div>
      )}

      {estilo === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto, index) => (
            <ProductCard key={index} producto={producto} />
          ))}
        </div>
      )}

      {estilo === 'table' && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Entrada</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Precio</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">Reservar</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <ProductRow key={index} producto={producto} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {estilo === 'list' && (
        <div className="space-y-4">
          {productos.map((producto, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border',
                producto.destacado
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card',
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {producto.destacado && producto.etiquetaDestacado && (
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded">
                      {producto.etiquetaDestacado}
                    </span>
                  )}
                  <span className="font-semibold text-foreground">{producto.nombre}</span>
                </div>
                {producto.descripcionCorta && (
                  <p className="text-sm text-muted-foreground mt-1">{producto.descripcionCorta}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold text-foreground">{producto.precio}</div>
                  {producto.precioOriginal && (
                    <div className="text-sm text-muted-foreground line-through">
                      {producto.precioOriginal}
                    </div>
                  )}
                </div>
                <a
                  href={producto.urlAfiliado}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-all text-sm whitespace-nowrap"
                >
                  {producto.textoCTA || 'Reservar'}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

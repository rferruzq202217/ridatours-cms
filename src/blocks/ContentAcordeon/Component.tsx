'use client'

import React, { useState } from 'react'
import { ChevronDown, Clock, MapPin, DollarSign, List, Info, Star, Ticket, Camera, User } from 'lucide-react'
import RichText from '@/components/RichText'

type Props = {
  titulo?: string
  subtitulo?: string
  items: {
    titulo: string
    icono?: string
    contenido: any
    abiertoPorDefecto?: boolean
  }[]
  permitirMultiplesAbiertos?: boolean
  estilo?: 'cards' | 'minimal' | 'bordered' | 'shadowed'
}

const iconMap: Record<string, React.ReactNode> = {
  clock: <Clock className="w-5 h-5" />,
  location: <MapPin className="w-5 h-5" />,
  money: <DollarSign className="w-5 h-5" />,
  list: <List className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  ticket: <Ticket className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  person: <User className="w-5 h-5" />,
}

export const ContentAcordeonBlock: React.FC<Props> = ({
  titulo,
  subtitulo,
  items,
  permitirMultiplesAbiertos = true,
  estilo = 'cards',
}) => {
  const [openItems, setOpenItems] = useState<number[]>(
    items
      .map((item, index) => (item.abiertoPorDefecto ? index : -1))
      .filter((index) => index !== -1)
  )

  const toggleItem = (index: number) => {
    if (permitirMultiplesAbiertos) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  const getItemClasses = () => {
    switch (estilo) {
      case 'minimal':
        return 'border-b border-gray-200 last:border-b-0'
      case 'bordered':
        return 'border-2 border-gray-200 rounded-lg mb-3'
      case 'shadowed':
        return 'bg-white shadow-md rounded-xl mb-4'
      case 'cards':
      default:
        return 'bg-gray-50 rounded-xl mb-3 overflow-hidden'
    }
  }

  const getHeaderClasses = () => {
    switch (estilo) {
      case 'minimal':
        return 'py-4 hover:bg-gray-50'
      case 'bordered':
        return 'p-4 hover:bg-gray-50'
      case 'shadowed':
        return 'p-5 hover:bg-gray-50'
      case 'cards':
      default:
        return 'p-4 hover:bg-gray-100'
    }
  }

  return (
    <div className="my-8">
      {titulo && (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{titulo}</h2>
      )}
      {subtitulo && <p className="text-gray-600 mb-6">{subtitulo}</p>}

      <div className={estilo === 'minimal' ? 'divide-y divide-gray-200' : ''}>
        {items.map((item, index) => {
          const isOpen = openItems.includes(index)
          const Icon = item.icono && item.icono !== 'none' ? iconMap[item.icono] : null

          return (
            <div key={index} className={getItemClasses()}>
              <button
                onClick={() => toggleItem(index)}
                className={`w-full flex items-center justify-between text-left transition-colors ${getHeaderClasses()}`}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  {Icon && <span className="text-amber-600">{Icon}</span>}
                  <span className="font-semibold text-gray-900">{item.titulo}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`px-4 pb-4 ${Icon ? 'pl-12' : ''}`}>
                  <RichText data={item.contenido} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ContentAcordeonBlock

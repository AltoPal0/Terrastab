import { Radio, BarChart3, Shield } from 'lucide-react'

export const PRODUCT_CONFIG = {
  'survey-light': {
    id: 'survey-light',
    icon: Radio,
    name: 'SURVEY Light',
    colors: {
      primary: 'bg-amber-600',
      text: 'text-white',
      cardBg: 'bg-gradient-to-br from-amber-50 via-amber-25 to-amber-50',
      border: 'border-amber-200',
      button: 'bg-amber-600 hover:bg-amber-700'
    }
  },
  'survey-plus': {
    id: 'survey-plus',
    icon: BarChart3,
    name: 'SURVEY+',
    colors: {
      primary: 'bg-blue-600',
      text: 'text-white',
      cardBg: 'bg-gradient-to-br from-blue-50 via-blue-25 to-blue-50',
      border: 'border-blue-200',
      button: 'bg-blue-600 hover:bg-blue-700'
    }
  },
  'shield': {
    id: 'shield',
    icon: Shield,
    name: 'SHIELD',
    colors: {
      primary: 'bg-emerald-600',
      text: 'text-white',
      cardBg: 'bg-gradient-to-br from-emerald-50 via-emerald-25 to-emerald-50',
      border: 'border-emerald-200',
      button: 'bg-emerald-600 hover:bg-emerald-700'
    }
  }
} as const

export type ProductId = keyof typeof PRODUCT_CONFIG
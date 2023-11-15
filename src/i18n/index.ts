import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { EN_US, ZH_CN } from '@/locales'
import type { Lang } from '@/types/lang'

export const resources = {
  'en-US': EN_US,
  'zh-CN': ZH_CN
} as const

const ns = Object.keys(EN_US) as (keyof typeof EN_US)[]

i18n.use(initReactI18next).init({
  lng: 'en-US',
  fallbackLng: 'en-US',
  ns,
  defaultNS: 'Global',
  resources,
  interpolation: {
    escapeValue: false
  },
  compatibilityJSON: 'v3' // For compatibility on React Native
})

export const changeLanguage = async (lang: Lang) => {
  await i18n.changeLanguage(lang)
}

export default i18n

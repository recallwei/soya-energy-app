import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DE, EN_US, FR, ZH_CN } from '@/locales'
import type { Lang } from '@/types/lang'

export const resources = {
  'en-US': EN_US,
  fr: FR,
  'zh-CN': ZH_CN,
  de: DE
} as const

const ns = ['Global', 'Auth', 'Menu', 'Notification', 'System', 'Services', 'Settings'] as const

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

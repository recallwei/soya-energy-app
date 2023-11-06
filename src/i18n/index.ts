import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { EN, FR, ZH_CN } from '@/locales'
import type { Lang } from '@/types/lang'

export const resources = {
  en: EN,
  fr: FR,
  zh_cn: ZH_CN
} as const

const ns = ['Global', 'Auth', 'Menu', 'Notification', 'System', 'Services', 'Settings'] as const

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
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

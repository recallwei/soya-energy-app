import 'i18next'

import type { EN } from '../locales'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'global'
    resources: {
      global: typeof EN.global
      auth: typeof EN.auth
    }
  }
}

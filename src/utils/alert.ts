import { alert } from '@baronha/ting'

import i18n from '@/i18n'

interface AlertOptions {
  title?: string
  message?: string
}

const t = i18n.getFixedT(null, 'Global')

export class AlertUtils {
  static success(options?: AlertOptions) {
    const { title = t('Alert.Default.Title.Success'), message = '' } = options ?? {}
    alert({ title, message, haptic: 'success', preset: 'done' })
  }

  static warning(options?: AlertOptions) {
    const { title = t('Alert.Default.Title.Warning'), message = '' } = options ?? {}
    alert({ title, message, haptic: 'warning' })
  }

  static error(options?: AlertOptions) {
    const { title = t('Alert.Default.Title.Error'), message = '' } = options ?? {}
    alert({ title, message, haptic: 'error', preset: 'error' })
  }

  static loading(options?: AlertOptions) {
    const { title = t('Alert.Default.Title.Loading'), message = '' } = options ?? {}
    alert({ title, message, haptic: 'none', preset: 'spinner' })
  }
}

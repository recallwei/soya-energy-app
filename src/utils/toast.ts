import { toast } from '@baronha/ting'

import i18n from '@/i18n'

interface ToastOptions {
  title?: string
  message?: string
}

const t = i18n.getFixedT(null, 'Global')

export class ToastUtils {
  static success(options?: ToastOptions) {
    const { title = t('Toast.Default.Title.Success'), message = '' } = options ?? {}
    toast({ title, message, haptic: 'success', preset: 'done' })
  }

  static warning(options?: ToastOptions) {
    const { title = t('Toast.Default.Title.Warning'), message = '' } = options ?? {}
    toast({ title, message, haptic: 'warning' })
  }

  static error(options?: ToastOptions) {
    const { title = t('Toast.Default.Title.Error'), message = '' } = options ?? {}
    toast({ title, message, haptic: 'error', preset: 'error' })
  }

  static loading(options?: ToastOptions) {
    const { title = t('Toast.Default.Title.Loading'), message = '' } = options ?? {}
    toast({ title, message, haptic: 'none', preset: 'spinner' })
  }
}

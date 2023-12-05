import { toast } from '@baronha/ting'

import i18n from '@/i18n'

interface ToastOptions {
  title?: string
  message?: string
}

const t = i18n.getFixedT(null, 'Global')

export class ToastUtils {
  static success(options?: ToastOptions) {
    const {
      // title = "",
      message = t('Toast.Default.Title.Success')
    } = options ?? {}
    toast({ title: '', message, haptic: 'success', preset: 'done' })
  }

  static warning(options?: ToastOptions) {
    const {
      // title = "",
      message = t('Toast.Default.Title.Warning')
    } = options ?? {}
    toast({ title: '', message, haptic: 'warning' })
  }

  static error(options?: ToastOptions) {
    const {
      // title = "",
      message = t('Toast.Default.Title.Error')
    } = options ?? {}
    toast({ title: '', message, haptic: 'error', preset: 'error' })
  }

  static loading(options?: ToastOptions) {
    const {
      // title = "",
      message = t('Toast.Default.Title.Loading')
    } = options ?? {}
    toast({ title: '', message, haptic: 'none', preset: 'spinner' })
  }
}

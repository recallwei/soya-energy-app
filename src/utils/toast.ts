import { toast } from '@baronha/ting'

interface ToastOptions {
  title?: string
  message?: string
}

export class ToastUtils {
  static success(options?: ToastOptions) {
    const { title, message } = options ?? {}
    toast({ title, message, haptic: 'success', preset: 'done' })
  }

  static warning(options?: ToastOptions) {
    const { title, message } = options ?? {}
    toast({ title, message, haptic: 'warning' })
  }

  static error(options?: ToastOptions) {
    const { title, message } = options ?? {}
    toast({ title, message, haptic: 'error', preset: 'error' })
  }

  static loading(options?: ToastOptions) {
    const { title, message } = options ?? {}
    toast({ title, message, haptic: 'none', preset: 'spinner' })
  }
}

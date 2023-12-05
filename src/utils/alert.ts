import { alert, dismissAlert } from '@baronha/ting'

interface AlertOptions {
  title?: string
  message?: string
}

export class AlertUtils {
  static success(options?: AlertOptions) {
    const { title, message } = options ?? {}
    alert({ title, message, haptic: 'success', preset: 'done' })
  }

  static warning(options?: AlertOptions) {
    const { title, message } = options ?? {}
    alert({ title, message, haptic: 'warning', preset: 'error' })
  }

  static error(options?: AlertOptions) {
    const { title, message } = options ?? {}
    alert({ title, message, haptic: 'error', preset: 'error' })
  }

  static loading(options?: AlertOptions) {
    const { title, message } = options ?? {}
    alert({ title, message, haptic: 'none', preset: 'spinner' })
  }

  static dismiss() {
    dismissAlert()
  }
}

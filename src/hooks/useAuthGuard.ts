import { useAsyncEffect } from 'ahooks'

import { useAuthStore } from '@/store'
import { AuthUtils } from '@/utils'

import { useIsForeground } from './useIsForeground'

export const useAuthGuard = (
  fetchUserInfo: (onSuccess?: (() => void) | undefined) => Promise<void>
) => {
  const isForeground = useIsForeground()
  const authStore = useAuthStore()

  useAsyncEffect(async () => {
    await checkLogin()
  }, [])

  useAsyncEffect(async () => {
    if (isForeground) {
      await checkLogin()
      fetchUserInfo()
    }
  }, [isForeground])

  async function checkLogin() {
    if (await AuthUtils.isLogin()) {
      authStore.login()
    } else {
      authStore.logout()
      authStore.loaded()
    }
  }
}

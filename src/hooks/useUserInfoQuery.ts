import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { UserAPI } from '@/api'
import { UserRole } from '@/enums'
import { useAuthStore } from '@/store'
import { ToastUtils } from '@/utils'

export const useUserInfoQuery = () => {
  const { t } = useTranslation()
  const authStore = useAuthStore()

  const meQuery = useQuery({
    queryKey: [UserAPI.ME_QUERY_KEY],
    queryFn: () => UserAPI.me(),
    enabled: false,
    select: (data) => {
      const { roles, user } = data.data ?? {}
      return { roles, ...user }
    }
  })

  async function fetchUserInfo(onSuccess?: () => void) {
    const { data } = await meQuery.refetch()
    if (data) {
      const { roles, ...rest } = data
      authStore.setUser(rest)
      if (roles?.includes(UserRole.INSTALLER)) {
        authStore.setUserRole(UserRole.INSTALLER)
        authStore.login()
        authStore.loaded()
        onSuccess?.()
        return
      }
      if (roles?.includes(UserRole.USER)) {
        authStore.setUserRole(UserRole.USER)
        authStore.login()
        authStore.loaded()
        onSuccess?.()
        return
      }
    }
    authStore.logout()
    authStore.loaded()
    ToastUtils.error({ message: t('Unauthorized') })
  }

  return { fetchUserInfo }
}

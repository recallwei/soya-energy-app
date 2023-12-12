import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { UserAPI } from '@/api'
import { UserRole } from '@/enums'
import { useAuthStore } from '@/store'
import { ToastUtils } from '@/utils'

export const useUserInfoQuery = () => {
  const { t } = useTranslation('Global')
  const authStore = useAuthStore()
  const meQuery = useQuery({
    queryKey: [UserAPI.ME_QUERY_KEY],
    queryFn: () => UserAPI.me(),
    enabled: false,
    select: (data) => {
      const { roles, user } = data.data ?? {}
      return {
        roles,
        ...user
      }
    }
  })

  const refetchUserInfo = async () => {
    const { data } = await meQuery.refetch()
    if (data) {
      const { roles, ...rest } = data
      authStore.setUser(rest)
      if (roles?.includes(UserRole.INSTALLER)) {
        authStore.setUserRole(UserRole.INSTALLER)
        authStore.login()
        return true
      }
      if (roles?.includes(UserRole.USER)) {
        authStore.setUserRole(UserRole.USER)
        authStore.login()
        return true
      }
    }
    authStore.logout()
    ToastUtils.error({ message: t('Unauthorized') })
    return false
  }

  return {
    refetchUserInfo
  }
}

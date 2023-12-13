import * as Sentry from '@sentry/react-native'
import { useQuery } from '@tanstack/react-query'
import { useAsyncEffect } from 'ahooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { AppStateStatus, NativeEventSubscription } from 'react-native'
import { AppState } from 'react-native'
import CodePush from 'react-native-code-push'

import { UserAPI } from '@/api'
import { UserRole } from '@/enums'
import { globalEnvConfig } from '@/env'
import { useAuthStore } from '@/store'
import { AuthUtils, CodePushUtils, ToastUtils } from '@/utils'

import { useIsForeground } from './useIsForeground'

export const useAuthGuard = () => {
  const { t } = useTranslation('Global')
  const isForeground = useIsForeground()
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

  useEffect(() => {
    async function syncCode(appStateStatus: AppStateStatus) {
      if (appStateStatus === 'active') {
        CodePushUtils.syncCode(
          (status) => {
            switch (status) {
              case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                authStore.loading()
                ToastUtils.loading({ message: CodePushUtils.syncStatusMap.get(status)?.() })
                break
              case CodePush.SyncStatus.INSTALLING_UPDATE:
              case CodePush.SyncStatus.UPDATE_INSTALLED:
                ToastUtils.success({ message: CodePushUtils.syncStatusMap.get(status)?.() })
                break
              case CodePush.SyncStatus.UP_TO_DATE:
                ToastUtils.success({
                  message: CodePushUtils.syncStatusMap.get(status)?.()
                })
                CodePush.getUpdateMetadata().then((data) =>
                  Sentry.init({
                    dsn: globalEnvConfig.SENTRY_DSN,
                    release: data?.appVersion,
                    dist: data?.label,
                    environment: globalEnvConfig.APP_ENVIRONMENT,
                    tracesSampleRate: 1.0
                  })
                )
                break
              case CodePush.SyncStatus.UNKNOWN_ERROR:
              default:
                break
            }
          },
          (progress) =>
            authStore.setDownloadProgress((progress.receivedBytes / progress.totalBytes) * 100)
        ).catch(() => {
          CodePush.getUpdateMetadata().then((data) => {
            if (data) {
              Sentry.init({
                dsn: globalEnvConfig.SENTRY_DSN,
                release: data?.appVersion,
                dist: data?.label,
                environment: globalEnvConfig.APP_ENVIRONMENT,
                tracesSampleRate: 1.0
              })
            }
          })
        })
      }
    }
    let appListener: NativeEventSubscription
    if (globalEnvConfig.APP_ENVIRONMENT !== 'DEV') {
      syncCode(AppState.currentState)
      appListener = AppState.addEventListener('change', syncCode)
    }
    return () => appListener?.remove()
  }, [])

  useAsyncEffect(async () => {
    await checkLogin()
  }, [])

  useAsyncEffect(async () => {
    if (isForeground) {
      await checkLogin()
    }
  }, [isForeground])

  async function checkLogin() {
    if (await AuthUtils.isLogin()) {
      authStore.login()
      await refetchUserInfo()
    } else {
      authStore.logout()
      ToastUtils.error({ message: t('Unauthorized') })
    }
    authStore.loaded()
  }

  async function refetchUserInfo() {
    const { data } = await meQuery.refetch()
    if (data) {
      const { roles, ...rest } = data
      authStore.setUser(rest)
      if (roles?.includes(UserRole.INSTALLER)) {
        authStore.setUserRole(UserRole.INSTALLER)
        return
      }
      if (roles?.includes(UserRole.USER)) {
        authStore.setUserRole(UserRole.USER)
        return
      }
    }
    authStore.logout()
    ToastUtils.error({ message: t('Unauthorized') })
  }
}

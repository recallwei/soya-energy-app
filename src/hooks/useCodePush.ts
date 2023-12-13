import * as Sentry from '@sentry/react-native'
import { useEffect } from 'react'
import type { AppStateStatus, NativeEventSubscription } from 'react-native'
import { AppState } from 'react-native'
import CodePush from 'react-native-code-push'

import { globalEnvConfig } from '@/env'
import { useAuthStore } from '@/store'
import { CodePushUtils, ToastUtils } from '@/utils'

export const useCodePush = () => {
  const authStore = useAuthStore()

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
}

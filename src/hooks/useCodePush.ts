import * as Sentry from '@sentry/react-native'
import { useEffect } from 'react'
import type { AppStateStatus } from 'react-native'
import { AppState } from 'react-native'
import CodePush from 'react-native-code-push'

import { globalEnvConfig } from '@/env'
import i18n from '@/i18n'
import { useAuthStore } from '@/store'
import { CodePushUtils, ToastUtils } from '@/utils'

const t = i18n.getFixedT(null, 'Global')

export function useCodePush() {
  const authStore = useAuthStore()
  useEffect(() => {
    async function syncCode(appStateStatus: AppStateStatus) {
      if (appStateStatus === 'active') {
        CodePushUtils.syncCode(
          (status) => {
            switch (status) {
              case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                authStore.loading()
                ToastUtils.loading({
                  title: t('Confirm.Dialog.Default.Title'),
                  message: CodePushUtils.syncStatusMap.get(status)?.()
                })
                break
              case CodePush.SyncStatus.INSTALLING_UPDATE:
              case CodePush.SyncStatus.UPDATE_INSTALLED:
                ToastUtils.success({
                  title: t('Confirm.Dialog.Default.Title'),
                  message: CodePushUtils.syncStatusMap.get(status)?.()
                })
                break
              case CodePush.SyncStatus.UP_TO_DATE:
                ToastUtils.success({
                  title: t('Confirm.Dialog.Default.Title'),
                  message: CodePushUtils.syncStatusMap.get(status)?.()
                })
                CodePush.getUpdateMetadata().then((data) => {
                  if (data) {
                    authStore.setPackageMetadata(data)
                    Sentry.init({
                      dsn: globalEnvConfig.SENTRY_DSN,
                      release: data?.appVersion,
                      dist: data?.label,
                      environment: globalEnvConfig.APP_ENVIRONMENT,
                      tracesSampleRate: 1.0
                    })
                  }
                })
                authStore.loaded()
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
              authStore.setPackageMetadata(data)
              Sentry.init({
                dsn: globalEnvConfig.SENTRY_DSN,
                release: data?.appVersion,
                dist: data?.label,
                environment: globalEnvConfig.APP_ENVIRONMENT,
                tracesSampleRate: 1.0
              })
            }
          })
          authStore.loaded()
        })
      }
    }

    syncCode(AppState.currentState)
    const appListener = AppState.addEventListener('change', syncCode)
    return () => appListener.remove()
  }, [])
}

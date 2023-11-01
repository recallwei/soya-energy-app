import { useEffect } from 'react'
import type { AppStateStatus, NativeEventSubscription } from 'react-native'
import { AppState } from 'react-native'
import CodePush from 'react-native-code-push'

import { globalEnvConfig } from '@/env'

export default function useCodePush() {
  useEffect(() => {
    async function syncCode(appStateStatus: AppStateStatus) {
      if (appStateStatus === 'active') {
        await CodePush.sync()
      }
    }

    let appListener: NativeEventSubscription

    if (globalEnvConfig.APP_ENVIRONMENT !== 'DEV') {
      syncCode(AppState.currentState).catch(() => {})

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      appListener = AppState.addEventListener('change', syncCode)
    } else {
      console.log('[CodePush] DEV 环境下不更新代码推送')
    }

    return () => {
      appListener?.remove()
    }
  }, [])
}

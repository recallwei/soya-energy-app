import { useEffect } from 'react'
import type { AppStateStatus } from 'react-native'
import { AppState } from 'react-native'

import { CodePushUtils } from '@/utils'

export function useCodePush() {
  useEffect(() => {
    async function syncCode(appStateStatus: AppStateStatus) {
      if (appStateStatus === 'active') {
        CodePushUtils.syncCode()
      }
    }
    syncCode(AppState.currentState)
    const appListener = AppState.addEventListener('change', syncCode)
    return () => appListener.remove()
  }, [])
}

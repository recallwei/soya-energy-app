import './i18n'

import { setup } from '@baronha/ting'
import NetInfo from '@react-native-community/netinfo'
import * as Sentry from '@sentry/react-native'
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { useAsyncEffect } from 'ahooks'
import { enableMapSet } from 'immer'
import { useEffect, useState } from 'react'
import type { AppStateStatus } from 'react-native'
import { Appearance, AppState, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { TamaguiProvider } from 'tamagui'

import config from '../tamagui.config'
import type { UserRole } from './enums'
import { useCodePush } from './hooks'
import Navigation from './Navigation'
import { useAuthStore, useLangStore, useThemeStore } from './store'
import { AuthUtils, LangUtils, LoggerUtils, ThemeUtils } from './utils'

enableMapSet()

// Init toast and alert
setup({
  toast: {
    duration: 1.5,
    position: 'top',
    shouldDismissByDrag: false
  },
  alert: {
    duration: 1.5,
    shouldDismissByTap: false
  }
})

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1
          },
          mutations: {
            retry: false
          }
        }
      })
  )
  const { theme } = useThemeStore()
  const langStore = useLangStore()
  const authStore = useAuthStore()

  useAsyncEffect(async () => {
    langStore.setLang(await LangUtils.getDefaultLang())
    useThemeStore.setState({ theme: ((await ThemeUtils.getTheme()) ?? 'light') as any })
    LoggerUtils.printEnv()
    await LoggerUtils.printStorage()

    if (await AuthUtils.isLogin()) {
      authStore.login()
    } else {
      authStore.logout()
    }

    const role = await AuthUtils.getRole()
    if (role) {
      authStore.setUserRole(role as UserRole)
    }
  }, [])

  useEffect(() => {
    Appearance.setColorScheme('light')

    /**
     * 在线状态管理
     * @see https://tanstack.com/query/latest/docs/react/react-native#online-status-management
     */
    onlineManager.setEventListener((setOnline) =>
      NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected)
      })
    )

    /**
     * 应用程序焦点
     * @see https://tanstack.com/query/latest/docs/react/react-native#refetch-on-app-focus
     */
    const subscription = AppState.addEventListener('change', onAppStateChange)
    return () => {
      subscription.remove()
    }
  }, [])

  useCodePush()

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme={theme}
      >
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </TamaguiProvider>
      <FlipperAsyncStorage />
    </QueryClientProvider>
  )
}

const AppWithCodePush = Sentry.wrap(App)

export default AppWithCodePush

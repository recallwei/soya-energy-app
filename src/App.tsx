import './i18n'

import NetInfo from '@react-native-community/netinfo'
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { useAsyncEffect } from 'ahooks'
import { useEffect, useState } from 'react'
import type { AppStateStatus } from 'react-native'
import { Appearance, AppState, Platform } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiProvider } from 'tamagui'

import config from '../tamagui.config'
import Navigation from './Navigation'
import { useLangStore, useThemeStore } from './store'
import { LangUtils, ThemeUtils } from './utils'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

const GestureHandlerProvider = gestureHandlerRootHOC(() => (
  <SafeAreaProvider>
    <Navigation />
  </SafeAreaProvider>
))

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false }
        }
      })
  )
  const { theme } = useThemeStore()
  const langStore = useLangStore()

  useAsyncEffect(async () => {
    langStore.setLang(await LangUtils.getDefaultLang())
    useThemeStore.setState({ theme: ((await ThemeUtils.getTheme()) ?? 'light') as any })
  }, [])

  useEffect(() => {
    Appearance.setColorScheme('light')

    /**
     * 在线状态管理
     * @see https://tanstack.com/query/latest/docs/react/react-native#online-status-management
     */
    onlineManager.setEventListener((setOnline) =>
      NetInfo.addEventListener((state) => setOnline(!!state.isConnected))
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

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme={theme}
      >
        <GestureHandlerProvider />
      </TamaguiProvider>
    </QueryClientProvider>
  )
}
export default App

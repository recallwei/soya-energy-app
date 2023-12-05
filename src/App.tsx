import './i18n'

import { setup } from '@baronha/ting'
import NetInfo from '@react-native-community/netinfo'
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
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { enableLatestRenderer } from 'react-native-maps'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { TamaguiProvider } from 'tamagui'

import config from '../tamagui.config'
import type { UserRole } from './enums'
import { useCodePush } from './hooks'
import Navigation from './Navigation'
import { useAuthStore, useLangStore, useThemeStore } from './store'
import { AuthUtils, LangUtils, ThemeUtils } from './utils'

// immer
enableMapSet()
// react-native-maps
enableLatestRenderer()

// Init toast and alert
setup({
  toast: {
    title: Platform.select({ ios: '', android: undefined }),
    duration: 1.5,
    position: 'top',
    shouldDismissByDrag: false,
    icon: {
      uri: require('../assets/images/soya-app-icon.png')
    }
  },
  alert: {
    duration: 1.5,
    shouldDismissByTap: false
    // icon: {
    //   uri: require('../assets/images/soya-app-icon.png')
    // }
  }
})

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
    // LoggerUtils.printEnv()
    // await LoggerUtils.printStorage()

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

    // 开发模式启用 react-query-native-devtools
    if (__DEV__) {
      import('react-query-native-devtools').then(({ addPlugin }) => {
        addPlugin({ queryClient })
      })
    }

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
        <GestureHandlerProvider />
      </TamaguiProvider>
      <FlipperAsyncStorage />
    </QueryClientProvider>
  )
}
export default App

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
import { useEffect, useState } from 'react'
import type { AppStateStatus } from 'react-native'
import { Appearance, AppState, Platform } from 'react-native'
import CodePush from 'react-native-code-push'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { TamaguiProvider } from 'tamagui'

import config from '../tamagui.config'
import { useCodePush } from './hooks'
import Navigation from './Navigation'
import { useLangStore, useThemeStore } from './store'
import { LangUtils, LoggerUtils, ThemeUtils } from './utils'

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

LangUtils.getDefaultLang()

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const { theme } = useThemeStore()
  const langStore = useLangStore()

  useCodePush()

  useAsyncEffect(async () => {
    langStore.setLang(await LangUtils.getDefaultLang())
    LoggerUtils.printEnv()
    await LoggerUtils.printStorage()
    useThemeStore.setState({ theme: ((await ThemeUtils.getTheme()) ?? 'light') as any })
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

const AppWithCodePush = CodePush({
  updateDialog: {
    // title: 'Update available',
    // optionalUpdateMessage: 'An update is available. Would you like to install it?',
    // optionalInstallButtonLabel: 'Install',
    // optionalIgnoreButtonLabel: 'Ignore',
    // mandatoryContinueButtonLabel: 'Continue',
    // mandatoryUpdateMessage: 'An update is available that must be installed.',
    // descriptionPrefix: 'Description: ',
    // appendReleaseDescription: true
    title: '更新提示',
    appendReleaseDescription: true,
    descriptionPrefix: '更新内容：',
    mandatoryContinueButtonLabel: '立即更新',
    mandatoryUpdateMessage: '有新版本了，请您及时更新',
    optionalIgnoreButtonLabel: '稍后',
    optionalInstallButtonLabel: '后台更新',
    optionalUpdateMessage: '有新版本了，是否更新？'
  },
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE
})(App)

export default AppWithCodePush

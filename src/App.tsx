import './i18n'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import CodePush from 'react-native-code-push'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { TamaguiProvider } from 'tamagui'

import { GlobalToast } from '@/components'

import config from '../tamagui.config'
import { useCodePush } from './hooks'
import Navigation from './Navigation'
import { useThemeStore } from './store'
import { LoggerUtils } from './utils'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const { theme } = useThemeStore()

  useCodePush()

  useEffect(() => {
    Appearance.setColorScheme('light')

    const init = async () => {
      LoggerUtils.printEnv()
      await LoggerUtils.printStorage()
    }

    init().catch(() => {})
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme={theme}
      >
        <GlobalToast />
        <Navigation />
      </TamaguiProvider>
      <FlipperAsyncStorage />
    </QueryClientProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const AppWithCodePush = CodePush({
  updateDialog: {
    // title: 'Update available',
    // optionalUpdateMessage:
    //   'An update is available. Would you like to install it?',
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

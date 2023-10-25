import './i18n'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { TamaguiProvider } from 'tamagui'

import { GlobalToast } from '@/components'

import config from '../tamagui.config'
import Navigation from './Navigation'
import { useThemeStore } from './store'
import { LoggerUtils } from './utils'

export default function App() {
  const [queryClient] = useState(() => new QueryClient())
  const { theme } = useThemeStore()

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

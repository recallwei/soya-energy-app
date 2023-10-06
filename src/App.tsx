import './i18n'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { TamaguiProvider } from 'tamagui'

import { GlobalToast } from '@/components'

import config from '../tamagui.config'
import Navigation from './Navigation'

export default function App(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    Appearance.setColorScheme('light')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme="light"
      >
        <GlobalToast />
        <Navigation />
      </TamaguiProvider>
      <FlipperAsyncStorage />
    </QueryClientProvider>
  )
}

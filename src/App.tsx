import './i18n'

import { useFlipper } from '@react-navigation/devtools'
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { TamaguiProvider } from 'tamagui'

// import { GlobalToastProvider } from '@/providers'
import config from '../tamagui.config'
import Navigation from './Navigation'

export default function App(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())

  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  useEffect(() => {
    Appearance.setColorScheme('light')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme="light"
      >
        <NavigationContainer ref={navigationRef}>
          <Navigation />
        </NavigationContainer>
      </TamaguiProvider>
      <FlipperAsyncStorage />
    </QueryClientProvider>
  )
}

import { useQuery } from '@tanstack/react-query'
import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'

import { BatteryCard, HeaderArea, InputCard, OutputCard, TotalCard } from './components'

export default function UserHomeScreen() {
  const insets = useSafeAreaInsets()

  const { refetch } = useQuery({
    queryKey: ['Status'],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('')
        }, 1000)
      })
  })

  const { refreshing, onRefresh } = useRefresh(refetch)

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      contentContainerStyle={{
        paddingTop: insets.top
      }}
    >
      <YStack
        padding="$4"
        space="$2"
      >
        <HeaderArea />

        <TotalCard />

        <InputCard />

        <OutputCard />

        <BatteryCard />
      </YStack>
    </ScrollView>
  )
}

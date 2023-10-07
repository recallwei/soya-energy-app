import { useQuery } from '@tanstack/react-query'
import { RefreshControl, SafeAreaView } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'

import {
  BatteryCard,
  HeaderArea,
  InputCard,
  OutputCard,
  TotalCard
} from './components'

export default function StatusScreen() {
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
    <SafeAreaView>
      <ScrollView
        minHeight="100%"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <YStack
          padding="$4"
          rowGap="$2"
        >
          <HeaderArea />

          <TotalCard />

          <InputCard />

          <OutputCard />

          <BatteryCard />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

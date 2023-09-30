import { SafeAreaView, RefreshControl } from 'react-native'
import { ScrollView, YStack } from 'tamagui'
import { useQuery } from '@tanstack/react-query'

import { useRefresh } from '@/hooks'

import {
  HeaderArea,
  TotalCard,
  InputCard,
  OutputCard,
  BatteryCard
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

import { useQuery } from '@tanstack/react-query'
import { RefreshControl } from 'react-native'
import { ScrollView, View, YStack } from 'tamagui'

import { useRefresh, useSafeAreaPadding } from '@/hooks'

import { BatteryCard, HeaderArea, InputCard, OutputCard, TotalCard } from './components'

export default function Screen() {
  const { insetsWithoutBottom } = useSafeAreaPadding()

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
    <View {...insetsWithoutBottom}>
      <ScrollView
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
          space="$2"
        >
          <HeaderArea />

          <TotalCard />

          <InputCard />

          <OutputCard />

          <BatteryCard />
        </YStack>
      </ScrollView>
    </View>
  )
}

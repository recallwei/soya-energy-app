import { RefreshControl, View } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh } from '@/hooks'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()

  return (
    <View>
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
          space="$3"
        >
          <NoData />
        </YStack>
      </ScrollView>
    </View>
  )
}

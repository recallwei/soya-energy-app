import { RefreshControl, View } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh, useSafeAreaPadding } from '@/hooks'

export default function DemoScreen() {
  const { insetsWithoutBottom } = useSafeAreaPadding()
  const { refreshing, onRefresh } = useRefresh()

  return (
    <View {...insetsWithoutBottom}>
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
          space="$3"
        >
          <NoData />
        </YStack>
      </ScrollView>
    </View>
  )
}

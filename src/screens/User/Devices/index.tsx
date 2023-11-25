import { RefreshControl } from 'react-native'
import { ScrollView, View, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh, useSafeAreaPadding } from '@/hooks'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()
  const { insetsWithoutBottom } = useSafeAreaPadding()
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
          space="$3"
          marginBottom="$10"
        >
          <NoData />
        </YStack>
      </ScrollView>
    </View>
  )
}

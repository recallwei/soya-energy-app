import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh } from '@/hooks'

export default function DemoScreen() {
  const insets = useSafeAreaInsets()
  const { refreshing, onRefresh } = useRefresh()

  return (
    <View
      paddingTop={insets.top}
      left={insets.left}
      right={insets.right}
    >
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

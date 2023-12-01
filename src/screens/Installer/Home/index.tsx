import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'

import { Header, List, Statistics } from './components'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const { refreshing, onRefresh } = useRefresh()

  return (
    <View
      paddingTop={insets.top}
      paddingLeft={insets.left}
      paddingRight={insets.right}
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
          space="$2"
        >
          <Header />
          <Statistics />
          <List />
        </YStack>
      </ScrollView>
    </View>
  )
}

import { RefreshControl, View } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { useRefresh, useSafeAreaPadding } from '@/hooks'

import { Header, List, Statistics } from './components'

export default function Screen() {
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
          <Header />
          <Statistics />
          <List />
        </YStack>
      </ScrollView>
    </View>
  )
}

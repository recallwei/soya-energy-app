import { RefreshControl } from 'react-native'
import { ScrollView, View, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'

import { HeaderArea, MenuList, Statistics } from './components'

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
          gap="$3"
        >
          <HeaderArea />
          <Statistics />
          <MenuList />
        </YStack>
      </ScrollView>
    </View>
  )
}

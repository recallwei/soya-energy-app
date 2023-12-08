import { useRoute } from '@react-navigation/native'
import { RefreshControl, View } from 'react-native'
import { ScrollView, SizableText, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'
import type { RouteProp } from '@/types'

export default function Screen() {
  const { refreshing, onRefresh } = useRefresh()
  const route = useRoute<RouteProp<'Common.Plant.Edit'>>()

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
          alignItems="center"
        >
          <SizableText>{route.params.id}</SizableText>
        </YStack>
      </ScrollView>
    </View>
  )
}

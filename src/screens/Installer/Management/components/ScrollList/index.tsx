import { RefreshControl } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh } from '@/hooks'

export default function ScrollList() {
  const { refreshing, onRefresh } = useRefresh()

  return (
    <ScrollView
      position="absolute"
      bottom={0}
      width="100%"
      height="75%"
      backgroundColor="$blue10Dark"
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
  )
}

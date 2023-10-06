import { RefreshControl } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { NoData } from '@/components'
import { useRefresh } from '@/hooks'

export default function DemoScreen(): React.JSX.Element {
  const { refreshing, onRefresh } = useRefresh()

  return (
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
        marginBottom="$10"
      >
        <NoData />
      </YStack>
    </ScrollView>
  )
}

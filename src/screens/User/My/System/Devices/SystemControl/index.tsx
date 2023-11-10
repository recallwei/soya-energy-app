import { RefreshControl } from 'react-native'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { useRefresh } from '@/hooks'

export default function SystemControlScreen(): React.JSX.Element {
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
        <Card>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                IO System Controller
              </Text>
              <Text
                fontFamily="$body"
                color="green"
              >
                Normal
              </Text>
            </XStack>

            <YStack gap="$1">
              <Text fontFamily="$body">SN: 190000101234</Text>
              <Text fontFamily="$body">SKU: ENVOY-S STANDARD KIT</Text>
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  )
}

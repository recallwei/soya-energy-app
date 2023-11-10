import { RefreshControl } from 'react-native'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
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
        <Card>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                IO 1
              </Text>
              <Text
                fontFamily="$body"
                color="green"
              >
                Normal
              </Text>
            </XStack>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text fontFamily="$body">SN: 190000101234</Text>
              <Text fontFamily="$body">SKU: ENVOY-S STANDARD KIT</Text>
            </YStack>

            <YStack gap="$1">
              <Text fontFamily="$body">Array: Array Right</Text>
              <Text fontFamily="$body">Last reported: 06 Sep 2023, 06:17</Text>
              <Text fontFamily="$body">Firmware: 520-00082-r01-v02.14.02</Text>
            </YStack>
          </YStack>
        </Card>

        <Card>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                IO 2
              </Text>
              <Text
                fontFamily="$body"
                color="green"
              >
                Normal
              </Text>
            </XStack>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text fontFamily="$body">SN: 190000101234</Text>
              <Text fontFamily="$body">SKU: ENVOY-S STANDARD KIT</Text>
            </YStack>

            <YStack gap="$1">
              <Text fontFamily="$body">Array: Array Right</Text>
              <Text fontFamily="$body">Last reported: 06 Sep 2023, 06:17</Text>
              <Text fontFamily="$body">Firmware: 520-00082-r01-v02.14.02</Text>
            </YStack>
          </YStack>
        </Card>

        <Card>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                IO 3
              </Text>
              <Text
                fontFamily="$body"
                color="green"
              >
                Normal
              </Text>
            </XStack>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text fontFamily="$body">SN: 190000101234</Text>
              <Text fontFamily="$body">SKU: ENVOY-S STANDARD KIT</Text>
            </YStack>

            <YStack gap="$1">
              <Text fontFamily="$body">Array: Array Right</Text>
              <Text fontFamily="$body">Last reported: 06 Sep 2023, 06:17</Text>
              <Text fontFamily="$body">Firmware: 520-00082-r01-v02.14.02</Text>
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  )
}

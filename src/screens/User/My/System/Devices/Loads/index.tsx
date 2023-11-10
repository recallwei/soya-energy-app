import { RefreshControl } from 'react-native'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { useRefresh } from '@/hooks'

export default function LoadsScreen(): React.JSX.Element {
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
                Well Pump
              </Text>
              <Text
                fontFamily="$body"
                color="green"
              >
                Normal
              </Text>
            </XStack>

            <YStack gap="$1">
              <Text fontFamily="$body">Mode: Basic</Text>
              <Text fontFamily="$body">Auxiliary Contact: NC1</Text>
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
                Air Conditioner
              </Text>
              <Text
                fontFamily="$body"
                color="green"
              >
                Normal
              </Text>
            </XStack>

            <YStack gap="$1">
              <Text fontFamily="$body">Mode: Advanced</Text>
              <Text fontFamily="$body">Auxiliary Contact: NC2</Text>
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
                Dishwasher
              </Text>
              <Text
                fontFamily="$body"
                color="green"
              >
                Normal
              </Text>
            </XStack>

            <YStack gap="$1">
              <Text fontFamily="$body">Mode: Advanced</Text>
              <Text fontFamily="$body">Auxiliary Contact: NC2</Text>
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
                Electric Vehicle
              </Text>
              <Text
                fontFamily="$body"
                color="green"
              >
                Normal
              </Text>
            </XStack>

            <YStack gap="$1">
              <Text fontFamily="$body">Mode: Advanced</Text>
              <Text fontFamily="$body">Auxiliary Contact: NC2</Text>
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  )
}

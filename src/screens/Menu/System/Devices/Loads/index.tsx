import { RefreshControl } from 'react-native'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
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
        <SCard>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                Well Pump
              </Text>
              <Text color="green">Normal</Text>
            </XStack>

            <YStack gap="$1">
              <Text>Mode: Basic</Text>
              <Text>Auxiliary Contact: NC1</Text>
            </YStack>
          </YStack>
        </SCard>

        <SCard>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                Air Conditioner
              </Text>
              <Text color="green">Normal</Text>
            </XStack>

            <YStack gap="$1">
              <Text>Mode: Advanced</Text>
              <Text>Auxiliary Contact: NC2</Text>
            </YStack>
          </YStack>
        </SCard>

        <SCard>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                Dishwasher
              </Text>
              <Text color="green">Normal</Text>
            </XStack>

            <YStack gap="$1">
              <Text>Mode: Advanced</Text>
              <Text>Auxiliary Contact: NC2</Text>
            </YStack>
          </YStack>
        </SCard>

        <SCard>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                Electric Vehicle
              </Text>
              <Text color="green">Normal</Text>
            </XStack>

            <YStack gap="$1">
              <Text>Mode: Advanced</Text>
              <Text>Auxiliary Contact: NC2</Text>
            </YStack>
          </YStack>
        </SCard>
      </YStack>
    </ScrollView>
  )
}

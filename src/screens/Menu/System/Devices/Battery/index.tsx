import { BatteryMedium } from '@tamagui/lucide-icons'
import { RefreshControl } from 'react-native'
import { ScrollView, Stack, Text, XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
import { useRefresh } from '@/hooks'

import { BatteryStatus } from './components'

export default function BatteryScreen(): React.JSX.Element {
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
          <XStack gap="$4">
            <Stack
              width="30%"
              alignItems="center"
              justifyContent="center"
            >
              <BatteryStatus
                size="large"
                borderColor="green"
                icon={<BatteryMedium size="$4" />}
                iconText="99%"
              />
            </Stack>

            <YStack
              flexGrow={1}
              gap="$1.5"
            >
              <Text>Available Energy</Text>
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                9.78 of 10.08 kWh
              </Text>

              <Text>Backup Time</Text>
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                8 hrs 48 mins
              </Text>

              <Text>Available Power</Text>
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                3.84 of 3.84 kWh
              </Text>

              <Text>Active Microinverter(s): 12 of 12</Text>
            </YStack>
          </XStack>
        </SCard>

        <SCard>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                IQ Battery1
              </Text>
              <Text color="green">Normal</Text>
            </XStack>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text>SN: 190000101234</Text>
              <Text>SKU: ENVOY-S STANDARD KIT</Text>
            </YStack>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text>Available Energy：3.26 of 3.36 kWh</Text>
              <Text>Available Power：1.28 of 1.28 kW</Text>
              <Text>Active Microinverters: 4 of 4</Text>
              <Text>Last reported: 06 Sep 2023, 06:17</Text>
              <Text>Firmware: 520-00082-r01-v02.14.02</Text>
            </YStack>

            <YStack gap="$1">
              <Text>LED Status:</Text>
              <Text>Battery capacity is between: 75-100%</Text>
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
                IQ Battery2
              </Text>
              <Text color="green">Normal</Text>
            </XStack>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text>SN: 190000101234</Text>
              <Text>SKU: ENVOY-S STANDARD KIT</Text>
            </YStack>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text>Available Energy：3.26 of 3.36 kWh</Text>
              <Text>Available Power：1.28 of 1.28 kW</Text>
              <Text>Active Microinverters: 4 of 4</Text>
              <Text>Last reported: 06 Sep 2023, 06:17</Text>
              <Text>Firmware: 520-00082-r01-v02.14.02</Text>
            </YStack>

            <YStack gap="$1">
              <Text>LED Status:</Text>
              <Text>Battery capacity is between: 75-100%</Text>
            </YStack>
          </YStack>
        </SCard>
      </YStack>
    </ScrollView>
  )
}

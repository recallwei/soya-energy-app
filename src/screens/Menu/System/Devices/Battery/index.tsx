import { BatteryMedium } from '@tamagui/lucide-icons'
import { RefreshControl } from 'react-native'
import { Paragraph, ScrollView, Stack, Text, XStack, YStack } from 'tamagui'

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
              width="70%"
              gap="$1.5"
            >
              <Text fontFamily="$body">Available Energy</Text>
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                9.78 of 10.08 kWh
              </Text>

              <Text fontFamily="$body">Backup Time</Text>
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                8 hrs 48 mins
              </Text>

              <Text fontFamily="$body">Available Power</Text>
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                3.84 of 3.84 kWh
              </Text>

              <Paragraph>Active Microinverter(s): 12 of 12</Paragraph>
            </YStack>
          </XStack>
        </SCard>

        <SCard>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                IQ Battery1
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

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text fontFamily="$body">Available Energy：3.26 of 3.36 kWh</Text>
              <Text fontFamily="$body">Available Power：1.28 of 1.28 kW</Text>
              <Text fontFamily="$body">Active Microinverters: 4 of 4</Text>
              <Text fontFamily="$body">Last reported: 06 Sep 2023, 06:17</Text>
              <Text fontFamily="$body">Firmware: 520-00082-r01-v02.14.02</Text>
            </YStack>

            <YStack gap="$1">
              <Text fontFamily="$body">LED Status:</Text>
              <Text fontFamily="$body">Battery capacity is between: 75-100%</Text>
            </YStack>
          </YStack>
        </SCard>

        <SCard>
          <YStack gap="$2">
            <XStack justifyContent="space-between">
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                IQ Battery2
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

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text fontFamily="$body">Available Energy：3.26 of 3.36 kWh</Text>
              <Text fontFamily="$body">Available Power：1.28 of 1.28 kW</Text>
              <Text fontFamily="$body">Active Microinverters: 4 of 4</Text>
              <Text fontFamily="$body">Last reported: 06 Sep 2023, 06:17</Text>
              <Text fontFamily="$body">Firmware: 520-00082-r01-v02.14.02</Text>
            </YStack>

            <YStack gap="$1">
              <Text fontFamily="$body">LED Status:</Text>
              <Text fontFamily="$body">Battery capacity is between: 75-100%</Text>
            </YStack>
          </YStack>
        </SCard>
      </YStack>
    </ScrollView>
  )
}

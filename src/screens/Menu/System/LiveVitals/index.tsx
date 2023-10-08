import { RefreshControl } from 'react-native'
import { ScrollView, Text, View, XStack, YStack } from 'tamagui'

import { SCard, Table } from '@/components'
import { useRefresh } from '@/hooks'

export default function LiveVitalsScreen(): React.JSX.Element {
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
            <Text
              fontSize="$5"
              fontWeight="bold"
            >
              Bruce Song
            </Text>
            <Text>06 Sep 2023 07:37 pm</Text>
            <Text marginBottom="$4">Discharging: 98%</Text>

            <Table
              data={[
                ['Voltage L1', 'Voltage L2', 'Frequency'],
                ['121.77V', '121.76V', '59.98Hz']
              ]}
            />
          </YStack>
        </SCard>

        <SCard>
          <YStack gap="$2">
            <Text
              fontSize="$5"
              fontWeight="bold"
            >
              System Controller
            </Text>
            <Text>06 Sep 2023 07:37 pm</Text>
            <Text>System controller is On Grid</Text>
            <Text marginBottom="$4">Control State: On Grid</Text>

            <XStack justifyContent="space-between">
              <View width="40%">
                <Table
                  data={[
                    ['MID', 'Closed'],
                    ['NFTN', 'Open'],
                    ['NFTL2', 'Open']
                  ]}
                />
              </View>
              <View width="55%">
                <Table
                  data={[
                    ['IQ BatteryL1', 'Closed'],
                    ['IQ BatteryL2', 'Closed']
                  ]}
                />
              </View>
            </XStack>
          </YStack>
        </SCard>

        <SCard>
          <Text
            fontSize="$5"
            fontWeight="bold"
          >
            IQ Battery xxx645
          </Text>
          <Text>06 Sep 2023 07:37 pm</Text>
          <Text>Battery is operational</Text>
          <Text>Grid Mode: On Grid</Text>
          <Text>Discharging: 98%</Text>
          <Text marginBottom="$4">
            LED Status: Battery capacity is between 75% ~ 100%
          </Text>

          <Text
            textAlign="center"
            marginBottom="$2"
          >
            4iq8x-batMicroinverters
          </Text>
          <Table
            data={[
              ['Micro1', '83.3W'],
              ['Micro2', '83.3W'],
              ['Micro3', '83.3W'],
              ['Micro4', '83.3W']
            ]}
          />

          <View
            backgroundColor="#999999"
            padding="$3"
            space="$2"
            borderWidth={0.2}
            borderColor="#999999"
          >
            <Text>SN: 12203123124</Text>
            <Text>Grid Mode: On Grid</Text>
            <Text>AC Power: 83.3W</Text>
            <Text>State: Normal</Text>
          </View>
        </SCard>
      </YStack>
    </ScrollView>
  )
}

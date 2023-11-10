import { RefreshControl } from 'react-native'
import { ScrollView, Text, View, XStack, YStack } from 'tamagui'

import { Card, Table } from '@/components'
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
        <Card>
          <YStack gap="$2">
            <Text
              fontFamily="$body"
              fontWeight="bold"
            >
              Bruce Song
            </Text>
            <Text fontFamily="$body">06 Sep 2023 07:37 pm</Text>
            <Text
              fontFamily="$body"
              marginBottom="$4"
            >
              Discharging: 98%
            </Text>

            <Table
              data={[
                ['Voltage L1', 'Voltage L2', 'Frequency'],
                ['121.77V', '121.76V', '59.98Hz']
              ]}
            />
          </YStack>
        </Card>

        <Card>
          <YStack gap="$2">
            <Text
              fontFamily="$body"
              fontWeight="bold"
            >
              System Controller
            </Text>
            <Text fontFamily="$body">06 Sep 2023 07:37 pm</Text>
            <Text fontFamily="$body">System controller is On Grid</Text>
            <Text
              fontFamily="$body"
              marginBottom="$4"
            >
              Control State: On Grid
            </Text>

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
        </Card>

        <Card>
          <Text
            fontFamily="$body"
            fontWeight="bold"
          >
            IQ Battery xxx645
          </Text>
          <Text fontFamily="$body">06 Sep 2023 07:37 pm</Text>
          <Text fontFamily="$body">Battery is operational</Text>
          <Text fontFamily="$body">Grid Mode: On Grid</Text>
          <Text fontFamily="$body">Discharging: 98%</Text>
          <Text
            fontFamily="$body"
            marginBottom="$4"
          >
            LED Status: Battery capacity is between 75% ~ 100%
          </Text>

          <Text
            fontFamily="$body"
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
            <Text fontFamily="$body">SN: 12203123124</Text>
            <Text fontFamily="$body">Grid Mode: On Grid</Text>
            <Text fontFamily="$body">AC Power: 83.3W</Text>
            <Text fontFamily="$body">State: Normal</Text>
          </View>
        </Card>
      </YStack>
    </ScrollView>
  )
}

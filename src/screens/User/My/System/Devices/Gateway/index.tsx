import { RefreshControl } from 'react-native'
import { ScrollView, Text, YStack } from 'tamagui'

import { Card, MenuItemCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function GatewayScreen(): React.JSX.Element {
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
              IQ Gateway
            </Text>
            <Text fontFamily="$body">SN: 190000101234</Text>
            <Text
              fontFamily="$body"
              marginBottom="$3"
            >
              SKU: ENVOY-S STANDARD KIT
            </Text>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text fontFamily="$body">Connected to SOYA cloud</Text>
              <Text fontFamily="$body">Last reported: 06 Sep 2023, 06:02 pm</Text>
              <Text fontFamily="$body">Firmware: D6.0.23</Text>
            </YStack>

            <Text fontFamily="$body">Connection Type : Ethernet</Text>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text fontFamily="$body">Ethernet(Active): Reports data every 15 mins</Text>
              <Text fontFamily="$body">Wi-Fi(Not Available)</Text>
              <Text fontFamily="$body">I Cell Modem(Not Available)</Text>
            </YStack>
          </YStack>
        </Card>

        <MenuItemCard
          title="Connect Locally"
          description="Connect to the gateway locally"
          onPress={() => {}}
        />

        <MenuItemCard
          title="Configure Wi-Fi"
          description="To change gateway internet connectivity"
          onPress={() => {}}
        />
      </YStack>
    </ScrollView>
  )
}

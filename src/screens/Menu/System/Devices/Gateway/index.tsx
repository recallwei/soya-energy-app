import { RefreshControl } from 'react-native'
import { ScrollView, Text, YStack } from 'tamagui'

import { MenuItemCard, SCard } from '@/components'
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
        <SCard>
          <YStack gap="$2">
            <Text
              fontSize="$5"
              fontWeight="bold"
            >
              IQ Gateway
            </Text>
            <Text>SN: 190000101234</Text>
            <Text marginBottom="$3">SKU: ENVOY-S STANDARD KIT</Text>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text>Connected to SOYA cloud</Text>
              <Text>Last reported: 06 Sep 2023, 06:02 pm</Text>
              <Text>Firmware: D6.0.23</Text>
            </YStack>

            <Text>Connection Type : Ethernet</Text>

            <YStack
              gap="$1"
              marginBottom="$3"
            >
              <Text>Ethernet(Active): Reports data every 15 mins</Text>
              <Text>Wi-Fi(Not Available)</Text>
              <Text>I Cell Modem(Not Available)</Text>
            </YStack>
          </YStack>
        </SCard>

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

import { Home } from '@tamagui/lucide-icons'
import { RefreshControl, TouchableOpacity } from 'react-native'
import { ScrollView, Separator, Text, XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function SiteDetailScreen(): React.JSX.Element {
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
            <Text>Site ID: 156224</Text>
            <Text>47281 Bay Parkway</Text>
            <Text>Fremont,CA 94538</Text>
            <Text>United States</Text>

            <Separator />

            <XStack justifyContent="space-between">
              <Text
                fontSize="$5"
                fontWeight="bold"
              >
                Backup Configurations
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text color="#0078d7">Change</Text>
              </TouchableOpacity>
            </XStack>
            <XStack
              gap="$2"
              alignItems="center"
              marginTop="$2"
            >
              <Home size="$2" />
              <Text>Partial Home Backup</Text>
            </XStack>

            <Separator />

            <XStack justifyContent="space-between">
              <Text>Connection Type: Ethernet</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text color="#0078d7">Configure</Text>
              </TouchableOpacity>
            </XStack>
            <Text>Ethernet(Active): Reports data every 15 mins</Text>
            <Text>Wi-Fi(Not Available)</Text>
            <Text>I Cell Modem(Not Available)</Text>
          </YStack>
        </SCard>
      </YStack>
    </ScrollView>
  )
}

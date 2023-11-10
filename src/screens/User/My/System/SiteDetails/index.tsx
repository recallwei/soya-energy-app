import { Home } from '@tamagui/lucide-icons'
import { RefreshControl, TouchableOpacity } from 'react-native'
import { ScrollView, Separator, Text, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
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
        <Card>
          <YStack gap="$2">
            <Text
              fontFamily="$body"
              fontWeight="bold"
            >
              Bruce Song
            </Text>
            <Text fontFamily="$body">Site ID: 156224</Text>
            <Text fontFamily="$body">47281 Bay Parkway</Text>
            <Text fontFamily="$body">Fremont,CA 94538</Text>
            <Text fontFamily="$body">United States</Text>

            <Separator />

            <XStack justifyContent="space-between">
              <Text
                fontFamily="$body"
                fontWeight="bold"
              >
                Backup Configurations
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  fontFamily="$body"
                  color="#0078d7"
                >
                  Change
                </Text>
              </TouchableOpacity>
            </XStack>
            <XStack
              gap="$2"
              alignItems="center"
              marginTop="$2"
            >
              <Home size="$2" />
              <Text fontFamily="$body">Partial Home Backup</Text>
            </XStack>

            <Separator />

            <XStack justifyContent="space-between">
              <Text fontFamily="$body">Connection Type: Ethernet</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  fontFamily="$body"
                  color="#0078d7"
                >
                  Configure
                </Text>
              </TouchableOpacity>
            </XStack>
            <Text fontFamily="$body">Ethernet(Active): Reports data every 15 mins</Text>
            <Text fontFamily="$body">Wi-Fi(Not Available)</Text>
            <Text fontFamily="$body">I Cell Modem(Not Available)</Text>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  )
}

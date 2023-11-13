import { useNavigation } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { useRefresh } from '@/hooks'

export default function StructureScreen() {
  const { refreshing, onRefresh } = useRefresh()

  const { navigate } = useNavigation()

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
            <Text fontFamily="$body">Flat Rate</Text>
            <Text
              fontFamily="$body"
              color="#0078d7"
              fontWeight="bold"
            >
              0.000$/kWh
            </Text>
          </YStack>
        </Card>

        <XStack
          gap="$2"
          alignItems="center"
        >
          <Button size="$3">Reset</Button>
          <Button
            size="$3"
            onPress={() => navigate('SettingsElectricityRateStructureEdit')}
          >
            Edit
          </Button>
        </XStack>
      </YStack>
    </ScrollView>
  )
}

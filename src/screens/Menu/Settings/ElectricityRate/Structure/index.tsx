import { useNavigation } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
import { useRefresh } from '@/hooks'

export default function StructureScreen(): React.JSX.Element {
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
        <SCard>
          <YStack gap="$2">
            <Text>Flat Rate</Text>
            <Text
              color="#0078d7"
              fontSize="$5"
              fontWeight="bold"
            >
              0.000$/kWh
            </Text>
          </YStack>
        </SCard>

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

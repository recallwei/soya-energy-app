import { useNavigation } from '@react-navigation/native'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function PerformanceScreen(): React.JSX.Element {
  const { navigate } = useNavigation()
  return (
    <ScrollView
      minHeight="100%"
      showsVerticalScrollIndicator={false}
    >
      <YStack
        padding="$4"
        space="$3"
        marginBottom="$10"
      >
        <MenuItemCard
          title="Energy"
          description="Configure your energy performance metric"
          onPress={() => navigate('SettingsPerformanceEnergy')}
        />
        <MenuItemCard
          title="Currency"
          description="Convert your energy data into equivalent currency rates"
          onPress={() => navigate('SettingsPerformanceCurrency')}
        />
      </YStack>
    </ScrollView>
  )
}

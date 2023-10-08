import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { Paragraph, Text, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function ElectricityRateScreen(): React.JSX.Element {
  const { navigate } = useNavigation()
  return (
    <SafeAreaView>
      <YStack
        padding="$4"
        space="$3"
        justifyContent="space-between"
        height="100%"
      >
        <YStack space="$3">
          <MenuItemCard
            title="Electricity Rate Structure"
            description="Electricity Rate Structure: Flat Rate"
            onPress={() => navigate('SettingsElectricityRateStructure')}
          />
          <MenuItemCard
            title="Add Electricity Export Rate"
            description="Add the rate structure at which you get paid for exporting your solar generated electricity to the grid"
            onPress={() => navigate('SettingsAddElectricityExportRate')}
          />
        </YStack>

        <YStack gap="$2">
          <Text fontSize="$3">Note:</Text>
          <Paragraph fontSize="$3">
            The electricity rate information is used by the gateway to determine
            the best battery charge and discharge schedule when your system
            profile is set as &apos;Savings&apos;. Changing this information
            will change the system&apos;s behavior.
          </Paragraph>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}

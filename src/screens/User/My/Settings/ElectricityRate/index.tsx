import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Paragraph, Text, View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function ElectricityRateScreen() {
  const insets = useSafeAreaInsets()
  const { navigate } = useNavigation()
  return (
    <View
      height="100%"
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack
        justifyContent="space-between"
        padding="$4"
        space="$3"
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
          Y
        </YStack>

        <YStack gap="$2">
          <Text fontFamily="$body">Note:</Text>
          <Paragraph>
            The electricity rate information is used by the gateway to determine the best battery
            charge and discharge schedule when your system profile is set as &apos;Savings&apos;.
            Changing this information will change the system&apos;s behavior.
          </Paragraph>
        </YStack>
      </YStack>
    </View>
  )
}

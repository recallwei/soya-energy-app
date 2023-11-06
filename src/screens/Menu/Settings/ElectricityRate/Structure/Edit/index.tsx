import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { Text, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function EditScreen(): React.JSX.Element {
  const { navigate } = useNavigation()

  return (
    <SafeAreaView>
      <YStack
        padding="$4"
        space="$3"
        marginBottom="$10"
      >
        <Text
          fontSize="$5"
          fontWeight="500"
          marginLeft="$1"
        >
          Select a mode to add your details
        </Text>
        <MenuItemCard
          title="Autofill"
          description="Import your electricity rate structure using the information from your utility"
          onPress={() => navigate('SettingsElectricityRateStructureEditAutofill')}
        />
        <MenuItemCard
          title="Manual"
          description={
            // eslint-disable-next-line quotes
            "Manually enter the details of your utility's electricity rate structure"
          }
          onPress={() => navigate('SettingsElectricityRateStructureEditManual')}
        />
      </YStack>
    </SafeAreaView>
  )
}

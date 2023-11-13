import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function EditScreen() {
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
        padding="$4"
        space="$3"
        marginBottom="$10"
      >
        <Text
          fontFamily="$body"
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
    </View>
  )
}

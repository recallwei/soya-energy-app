import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, YStack } from 'tamagui'

import { SolarArray } from './components'

export default function ArrayScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      minHeight="100%"
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack padding="$4">
        <SolarArray />
      </YStack>
    </ScrollView>
  )
}

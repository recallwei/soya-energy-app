import { SafeAreaView } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { SolarArray } from './components'

export default function ArrayScreen(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        minHeight="100%"
      >
        <YStack padding="$4">
          <SolarArray />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

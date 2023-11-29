import { ScrollView, View, YStack } from 'tamagui'

import { SolarArray } from './components'

export default function Screen() {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$4">
          <SolarArray />
        </YStack>
      </ScrollView>
    </View>
  )
}

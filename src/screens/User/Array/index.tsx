import { ScrollView, View, YStack } from 'tamagui'

import { useSafeAreaPadding } from '@/hooks'

import { SolarArray } from './components'

export default function Screen() {
  const { insetsWithoutBottom } = useSafeAreaPadding()

  return (
    <View {...insetsWithoutBottom}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$4">
          <SolarArray />
        </YStack>
      </ScrollView>
    </View>
  )
}

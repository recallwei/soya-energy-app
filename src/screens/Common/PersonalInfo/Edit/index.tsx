import { ScrollView, YStack } from 'tamagui'

import { NoData } from '@/components'

export default function Screen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$2"
      >
        <NoData />
      </YStack>
    </ScrollView>
  )
}

import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function Screen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title="Unit"
          rightTitle="公制"
        />
        <MenuItemCard
          title="Temperature unit"
          rightTitle="°C"
        />
        <MenuItemCard
          title="Time"
          rightTitle="2023/12/31 23:59"
        />
      </YStack>
    </ScrollView>
  )
}

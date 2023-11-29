import { useNavigation } from '@react-navigation/native'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function Screen() {
  const { navigate } = useNavigation()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title="天气预报"
          switcher
        />
        <MenuItemCard
          title="电站位置"
          description="25°2′N, 121°38′E"
          onPress={() => navigate('User.Home.Select_Location')}
        />
      </YStack>
    </ScrollView>
  )
}

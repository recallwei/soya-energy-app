import { useNavigation } from '@react-navigation/native'
import { YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

import { UserAvatar } from './components'

export default function Screen() {
  const { navigate } = useNavigation()
  return (
    <YStack
      padding="$4"
      space="$2"
    >
      <UserAvatar />
      <MenuItemCard
        title="Username"
        rightTitle="Bruce"
      />
      <MenuItemCard
        title="Nickname"
        rightTitle="Bruce"
      />
      <MenuItemCard title="Password" />
      <MenuItemCard
        title="Email"
        rightTitle="recall4056@gmail.com"
        rightTitleProps={{
          size: '$3'
        }}
      />
      <MenuItemCard
        title="Country/Region"
        rightTitle="China"
        onPress={() => navigate('Common.My.Personal_Info.Country_Picker')}
      />
      <MenuItemCard
        title="Time Zone"
        rightTitle="UTC+8"
      />
    </YStack>
  )
}

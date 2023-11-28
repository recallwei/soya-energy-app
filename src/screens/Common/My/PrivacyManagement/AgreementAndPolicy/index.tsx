import { useNavigation } from '@react-navigation/native'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function Screen() {
  const { navigate } = useNavigation()

  const handleNavToPrivacyPolicy = () =>
    navigate('Common.My.Privacy_Management.Agreement_And_Policy.Privacy_Policy')

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title="New Products, Event, Information"
          onPress={handleNavToPrivacyPolicy}
        />
        <MenuItemCard
          title="Platform Usage Agreement"
          onPress={handleNavToPrivacyPolicy}
        />
        <MenuItemCard
          title="Summary of Privacy Agreement"
          onPress={handleNavToPrivacyPolicy}
        />
        <MenuItemCard
          title="Privacy Policy"
          onPress={handleNavToPrivacyPolicy}
        />
        <MenuItemCard
          title="User Registration Agreement"
          onPress={handleNavToPrivacyPolicy}
        />
      </YStack>
    </ScrollView>
  )
}

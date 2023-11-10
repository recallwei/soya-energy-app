import { useNavigation } from '@react-navigation/native'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { useAuthStore } from '@/store'

export default function AccountScreen(): React.JSX.Element {
  const authStore = useAuthStore()

  const { navigate } = useNavigation()

  const handleDeleteAccount = () => authStore.logout()

  return (
    <ScrollView
      minHeight="100%"
      showsVerticalScrollIndicator={false}
    >
      <YStack
        padding="$4"
        space="$3"
        marginBottom="$10"
      >
        <MenuItemCard
          title="My Information"
          description="Update personal and system details"
          onPress={() => navigate('AccountMyInfo')}
        />
        <MenuItemCard
          title="My Notification"
          description="Manage your notifications"
          onPress={() => navigate('AccountMyNotifications')}
        />
        <MenuItemCard
          title="My Access Control"
          description="Manage access to system data"
          onPress={() => navigate('AccountMyAccessControl')}
        />
        <MenuItemCard
          title="Delete Account"
          description="​Deleting your account will deactivate your account and remove all your settings"
          onPress={handleDeleteAccount}
        />
      </YStack>
    </ScrollView>
  )
}

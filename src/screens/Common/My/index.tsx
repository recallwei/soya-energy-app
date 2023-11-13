import { useNavigation } from '@react-navigation/native'
import { Code, Power, ServerCog, Settings, UserCog } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { globalEnvConfig } from '@/env'
import { useAuthStore } from '@/store'
import { AuthUtils } from '@/utils'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation('Installer.My')
  const authStore = useAuthStore()
  const { navigate } = useNavigation()

  const logout = () => {
    authStore.logout()
    AuthUtils.removeToken()
  }

  return (
    <View
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title={t('Privacy.Management')}
          description={t('Privacy.Management')}
          icon={ServerCog}
          onPress={() => navigate('Installer.My.Privacy_Management')}
        />
        <MenuItemCard
          title={t('About.Us')}
          description={t('About.Us')}
          icon={UserCog}
          onPress={() => navigate('Installer.My.About_Us')}
        />
        <MenuItemCard
          title={t('Settings')}
          description={t('Settings')}
          icon={Settings}
          onPress={() => navigate('Settings')}
        />
        {globalEnvConfig.APP_ENVIRONMENT === 'DEV' && (
          <MenuItemCard
            title="Dev Menu"
            description="Just for dev!"
            icon={Code}
            onPress={() => navigate('DevMenu')}
          />
        )}
        <MenuItemCard
          title={t('Title.Signout')}
          description={t('Description.Signout')}
          icon={Power}
          onPress={logout}
        />
      </YStack>
    </View>
  )
}

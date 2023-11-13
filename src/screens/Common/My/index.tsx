import { useNavigation } from '@react-navigation/native'
import { BadgeInfo, Code, FolderLock, Power, Settings } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { globalEnvConfig } from '@/env'
import { useAuthStore } from '@/store'
import { AuthUtils } from '@/utils'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation(['Common.My'])
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
          title={t('Privacy.Management.Title')}
          description={t('Privacy.Management.Description')}
          icon={FolderLock}
          onPress={() => navigate('Common.My.Privacy_Management')}
        />
        <MenuItemCard
          title={t('About.Us.Title')}
          description={t('About.Us.Description')}
          icon={BadgeInfo}
          onPress={() => navigate('Common.My.About_Us')}
        />
        <MenuItemCard
          title={t('Settings.Title')}
          description={t('Settings.Description')}
          icon={Settings}
          onPress={() => navigate('Common.My.Settings')}
        />
        {globalEnvConfig.APP_ENVIRONMENT === 'DEV' && (
          <MenuItemCard
            title={t('DevMenu.Title')}
            description={t('DevMenu.Description')}
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

import { useNavigation } from '@react-navigation/native'
import { BadgeInfo, Code, FolderLock, Settings } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { ScrollView, View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { globalEnvConfig } from '@/env'
import { useSafeAreaPadding } from '@/hooks'
import { useAuthStore } from '@/store'

export default function Screen() {
  const { paddingTop } = useSafeAreaPadding()
  const { t } = useTranslation('Common.My')
  const { navigate } = useNavigation()
  const authStore = useAuthStore()

  return (
    <View paddingTop={authStore.isInstaller() && paddingTop}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        height="100%"
      >
        <YStack
          padding="$4"
          space="$2"
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
          {/* <MenuItemCard
            title={t('Settings.Title')}
            description={t('Settings.Description')}
            icon={Settings}
            onPress={() => navigate('Common.My.Settings')}
          /> */}
          {globalEnvConfig.APP_ENVIRONMENT !== 'PROD' && (
            <MenuItemCard
              title={t('Dev.Menu.Title')}
              description={t('Dev.Menu.Description')}
              icon={Code}
              onPress={() => navigate('Temp.Dev_Menu')}
            />
          )}
        </YStack>
      </ScrollView>
    </View>
  )
}

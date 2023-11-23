import { useNavigation } from '@react-navigation/native'
import { BadgeInfo, Code, FolderLock, Settings } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { ScrollView, View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { globalEnvConfig } from '@/env'
import { useSafeAreaPadding } from '@/hooks'

export default function Screen() {
  const { insetsWithoutBottom } = useSafeAreaPadding()
  const { t } = useTranslation('Common.My')
  const { navigate } = useNavigation()

  return (
    <View {...insetsWithoutBottom}>
      <ScrollView
        minHeight="100%"
        showsVerticalScrollIndicator={false}
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

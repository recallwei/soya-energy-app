import { useNavigation } from '@react-navigation/native'
import {
  Bell,
  Code,
  Compass,
  Component,
  Gem,
  Power,
  ServerCog,
  Settings,
  UserCog,
  Users
} from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Label, ScrollView, Square, XStack, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { globalEnvConfig } from '@/env'
import { useAuthStore } from '@/store'
import { AuthUtils } from '@/utils'

export default function UserMyScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation('Menu')
  const authStore = useAuthStore()
  const { navigate } = useNavigation()

  const [currentSite] = useState('Bruce')
  const [siteId] = useState('155224')

  const logout = () => {
    authStore.logout()
    AuthUtils.removeToken()
  }

  return (
    <ScrollView
      height="100%"
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack
        padding="$4"
        space="$3"
      >
        <XStack
          justifyContent="space-between"
          alignItems="center"
        >
          <Label>{t('Hello')}</Label>
          <Square
            pressStyle={{
              scale: 0.9
            }}
          >
            <TouchableOpacity onPress={() => navigate('Notification')}>
              <Bell size="$1" />
            </TouchableOpacity>
          </Square>
        </XStack>

        <XStack
          justifyContent="space-between"
          alignItems="center"
        >
          <Label>{currentSite}</Label>
          <Label>
            {t('SiteId')}
            {siteId}
          </Label>
        </XStack>

        <MenuItemCard
          title={t('Title.System')}
          description={t('Description.System')}
          icon={ServerCog}
          onPress={() => navigate('System')}
        />
        <MenuItemCard
          title={t('Title.Account')}
          description={t('Description.Account')}
          icon={UserCog}
          onPress={() => navigate('Account')}
        />
        <MenuItemCard
          title={t('Title.Settings')}
          description={t('Description.Settings')}
          icon={Settings}
          onPress={() => navigate('Settings')}
        />
        <MenuItemCard
          title={t('Title.Services')}
          description={t('Description.Services')}
          icon={Component}
          onPress={() => navigate('Services')}
        />
        <MenuItemCard
          title={t('Title.Support')}
          description={t('Description.Support')}
          icon={Gem}
          onPress={() => navigate('Support')}
        />
        <MenuItemCard
          title={t('Title.Explore')}
          description={t('Description.Explore')}
          icon={Compass}
          onPress={() => navigate('Explore')}
        />
        <MenuItemCard
          title={t('Title.Community')}
          description={t('Description.Community')}
          icon={Users}
          onPress={() => navigate('Community')}
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
    </ScrollView>
  )
}

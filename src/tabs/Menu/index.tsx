import { useNavigation } from '@react-navigation/native'
import {
  Bell,
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
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { ScrollView, Square, Text, XStack, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { useAuthStore } from '@/store'
import { AuthUtils } from '@/utils'

export default function MenuScreen(): React.JSX.Element {
  const { t } = useTranslation('Menu')

  const authStore = useAuthStore()

  const navigation = useNavigation()

  const [currentSite] = useState('Bruce')
  const [siteId] = useState('155224')

  const logout = () => {
    authStore.logout()
    AuthUtils.removeToken().catch(() => {})
  }

  return (
    <SafeAreaView>
      <ScrollView height="100%">
        <YStack
          padding="$4"
          space="$3"
        >
          <XStack
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>{t('Hello')}</Text>
            <Square
              pressStyle={{
                scale: 0.9
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}
              >
                <Bell size="$1" />
              </TouchableOpacity>
            </Square>
          </XStack>

          <XStack
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>{currentSite}</Text>
            <Text>
              {t('SiteId')}
              {siteId}
            </Text>
          </XStack>

          <MenuItemCard
            title={t('Title.System')}
            description={t('Description.System')}
            icon={ServerCog}
            onPress={() => navigation.navigate('System')}
          />
          <MenuItemCard
            title={t('Title.Account')}
            description={t('Description.Account')}
            icon={UserCog}
            onPress={() => navigation.navigate('Account')}
          />
          <MenuItemCard
            title={t('Title.Settings')}
            description={t('Description.Settings')}
            icon={Settings}
            onPress={() => navigation.navigate('Settings')}
          />
          <MenuItemCard
            title={t('Title.Services')}
            description={t('Description.Services')}
            icon={Component}
            onPress={() => navigation.navigate('Services')}
          />
          <MenuItemCard
            title={t('Title.Support')}
            description={t('Description.Support')}
            icon={Gem}
            onPress={() => navigation.navigate('Support')}
          />
          <MenuItemCard
            title={t('Title.Explore')}
            description={t('Description.Explore')}
            icon={Compass}
            onPress={() => navigation.navigate('Explore')}
          />
          <MenuItemCard
            title={t('Title.Community')}
            description={t('Description.Community')}
            icon={Users}
            onPress={() => navigation.navigate('Community')}
          />
          <MenuItemCard
            title={t('Title.Signout')}
            description={t('Description.Signout')}
            icon={Power}
            onPress={logout}
          />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

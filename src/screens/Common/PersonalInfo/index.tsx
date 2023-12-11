import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { useAuthStore } from '@/store'

import { UserAvatar } from './components'

export default function Screen() {
  const { t } = useTranslation('Auth')
  const { navigate } = useNavigation()
  const authStore = useAuthStore()

  return (
    <YStack
      padding="$4"
      space="$2"
    >
      <UserAvatar />
      <MenuItemCard
        title={t('Username')}
        rightTitle={authStore.user.account}
        onPress={() => navigate('Common.My.Personal_Info.Change_Username')}
      />
      <MenuItemCard
        title={t('Password')}
        onPress={() => navigate('Common.My.Personal_Info.Change_Password')}
      />
      <MenuItemCard
        title={t('Email')}
        rightTitle={authStore.user.email}
        rightTitleProps={{ size: '$3' }}
        onPress={() => navigate('Common.My.Personal_Info.Change_Email')}
      />
      <MenuItemCard
        title={t('Country.Region')}
        rightTitle={authStore.user.city}
        onPress={() => navigate('Common.My.Personal_Info.Country_Picker')}
      />
      <MenuItemCard
        title={t('Time.Zone')}
        rightTitle={t('Time.Zone')}
      />
    </YStack>
  )
}

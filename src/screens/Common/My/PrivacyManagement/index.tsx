import { useNavigation } from '@react-navigation/native'
import { BellDot, KeyRound, Mail, ShieldCheck } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function Screen() {
  const { t } = useTranslation('Common.My.Privacy_Management')

  const { navigate } = useNavigation()

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$2"
      >
        <MenuItemCard
          title={t('Agreement.And.Policy.Title')}
          icon={KeyRound}
          onPress={() => navigate('Common.My.Privacy_Management.Agreement_And_Policy')}
        />
        <MenuItemCard
          title={t('System.Permission.Title')}
          icon={ShieldCheck}
          onPress={() => navigate('Common.My.Privacy_Management.System_Permission')}
        />
        <MenuItemCard
          title={t('Email.Push.Title')}
          icon={Mail}
          onPress={() => navigate('Common.My.Privacy_Management.Email_Push')}
        />
        <MenuItemCard
          title={t('Push.Notice.Title')}
          icon={BellDot}
          onPress={() => navigate('Common.My.Privacy_Management.Push_Notice')}
        />
      </YStack>
    </ScrollView>
  )
}

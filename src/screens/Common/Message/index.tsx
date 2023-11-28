import { useNavigation } from '@react-navigation/native'
import { AlertOctagon, Bell, MessageCircle, Wrench } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { MessageType } from '@/enums'

export default function Screen() {
  const { t } = useTranslation('Common.My.Privacy_Management')
  const { navigate } = useNavigation()

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title={t('Alarm.Push.Title')}
          icon={AlertOctagon}
          onPress={() =>
            navigate('Common.Message.List', {
              type: MessageType.Alarm
            })
          }
        />
        <MenuItemCard
          title={t('System.Message.Title')}
          icon={Bell}
          onPress={() =>
            navigate('Common.Message.List', {
              type: MessageType.System
            })
          }
        />
        <MenuItemCard
          title={t('Service.Info.Title')}
          icon={Wrench}
          onPress={() =>
            navigate('Common.Message.List', {
              type: MessageType.Service
            })
          }
        />
        <MenuItemCard
          title={t('Activity.Message.Title')}
          icon={MessageCircle}
          onPress={() =>
            navigate('Common.Message.List', {
              type: MessageType.Event
            })
          }
        />
      </YStack>
    </ScrollView>
  )
}

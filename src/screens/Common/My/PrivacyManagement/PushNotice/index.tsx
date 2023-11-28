import { AlertOctagon, Bell, MessageCircle, Wrench } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'
import { useImmer } from 'use-immer'

import { MenuItemCard } from '@/components'

export default function Screen() {
  const { t } = useTranslation('Common.My.Privacy_Management')
  const [config, setConfig] = useImmer({
    alarmPush: false,
    systemMessage: false,
    serviceInfo: false,
    activityMessage: false
  })

  const setAlarmPush = (value: boolean) =>
    setConfig((draft) => {
      draft.alarmPush = value
    })

  const setSystemMessage = (value: boolean) =>
    setConfig((draft) => {
      draft.systemMessage = value
    })

  const setServiceInfo = (value: boolean) =>
    setConfig((draft) => {
      draft.serviceInfo = value
    })

  const setActivityMessage = (value: boolean) =>
    setConfig((draft) => {
      draft.activityMessage = value
    })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title={t('Alarm.Push.Title')}
          description={t('Alarm.Push.Description')}
          icon={AlertOctagon}
          switcher
          switchValue={config.alarmPush}
          setSwitchValue={setAlarmPush}
        />
        <MenuItemCard
          title={t('System.Message.Title')}
          description={t('System.Message.Description')}
          icon={Bell}
          switcher
          switchValue={config.systemMessage}
          setSwitchValue={setSystemMessage}
        />
        <MenuItemCard
          title={t('Service.Info.Title')}
          description={t('Service.Info.Description')}
          icon={Wrench}
          switcher
          switchValue={config.serviceInfo}
          setSwitchValue={setServiceInfo}
        />
        <MenuItemCard
          title={t('Activity.Message.Title')}
          description={t('Activity.Message.Description')}
          icon={MessageCircle}
          switcher
          switchValue={config.activityMessage}
          setSwitchValue={setActivityMessage}
        />
      </YStack>
    </ScrollView>
  )
}

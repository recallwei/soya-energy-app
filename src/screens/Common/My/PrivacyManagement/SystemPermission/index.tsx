import { Bluetooth, Camera, MapPin } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { DeviceUtils } from '@/utils'

export default function Screen() {
  const { t } = useTranslation(['Common.My.Privacy_Management', 'Global'])

  const openSettings = () => DeviceUtils.openSettings()

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title={t('Location.Title')}
          description={t('Location.Description')}
          icon={MapPin}
          onPress={openSettings}
        />
        <MenuItemCard
          title={t('Camera.Title')}
          description={t('Camera.Description')}
          icon={Camera}
          onPress={openSettings}
        />
        <MenuItemCard
          title={t('Bluetooth.Title')}
          description={t('Bluetooth.Description')}
          icon={Bluetooth}
          onPress={openSettings}
        />
      </YStack>
    </ScrollView>
  )
}

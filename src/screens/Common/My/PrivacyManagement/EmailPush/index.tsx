import { Send } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function Screen() {
  const { t } = useTranslation('Common.My.Privacy_Management')
  const [canPush, setCanPush] = useState(false)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        padding="$4"
        space="$2"
      >
        <MenuItemCard
          title={t('Permission.To.Push.Email.Title')}
          description={t('Permission.To.Push.Email.Description')}
          icon={Send}
          switcher
          switchValue={canPush}
          setSwitchValue={setCanPush}
        />
      </YStack>
    </ScrollView>
  )
}

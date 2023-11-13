import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function ServicesScreen() {
  const { t } = useTranslation('Services')

  const handleStorageIncentive = () => {}

  return (
    <YStack
      padding="$4"
      space="$3"
      marginBottom="$10"
    >
      <MenuItemCard
        title={t('StorageIncentive')}
        description={t('StorageIncentiveDescription')}
        onPress={handleStorageIncentive}
      />
    </YStack>
  )
}

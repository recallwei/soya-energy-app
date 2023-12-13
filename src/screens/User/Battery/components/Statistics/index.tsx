import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack, YStack } from 'tamagui'

import CardItem from './CardItem'

const Statistics = memo(() => {
  const { t } = useTranslation('User.Battery')

  return (
    <YStack space="$2">
      <XStack justifyContent="space-between">
        <CardItem
          title={t('Battery.Power')}
          value="0.0 W"
        />
        <CardItem
          title={t('Design.Capacity')}
          value="5.12 kWh"
        />
      </XStack>

      <XStack justifyContent="space-between">
        <CardItem
          title={t('Battery.Voltage')}
          value="50.80 V"
        />
        <CardItem
          title={t('Battery.Current')}
          value="0.00 A"
        />
      </XStack>

      <XStack justifyContent="space-between">
        <CardItem
          title={t('Battery.Temperature')}
          value="23.0 ℃"
        />
        <CardItem
          title={t('SOH')}
          value={t('Good')}
        />
      </XStack>
    </YStack>
  )
})
export default Statistics

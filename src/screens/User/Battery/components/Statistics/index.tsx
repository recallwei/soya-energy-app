import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack, YStack } from 'tamagui'

import { HealthStatus } from '@/enums'
import type { BatteryAnalysis } from '@/types'

import CardItem from './CardItem'

interface Props {
  data?: BatteryAnalysis
}

const Statistics = memo((props: Props) => {
  const { t } = useTranslation('User.Battery')

  const getHealthStatus = () => {
    switch (props.data?.healthStatus?.toString()) {
      case HealthStatus.Excellent:
        return t('Excellent')
      case HealthStatus.Good:
        return t('Good')
      case HealthStatus.Normal:
        return t('Normal')
      case HealthStatus.Poor:
        return t('Poor')
      default:
        return props.data?.healthStatus ?? '--'
    }
  }

  return (
    <YStack space="$2">
      <XStack justifyContent="space-between">
        <CardItem
          title={t('Battery.Power')}
          value={`${props.data?.power || '--'} W`}
        />
        <CardItem
          title={t('Design.Capacity')}
          value={`${props.data?.designCapacity || '--'} kWh`}
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
          value={`${props.data?.temperature || '--'} ℃`}
        />
        <CardItem
          title={t('SOH')}
          value={getHealthStatus()}
        />
      </XStack>
    </YStack>
  )
})
export default Statistics

import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, YStack } from 'tamagui'

import { GaugeChart } from '@/charts'

import ProgressRing from './ProgressRing'

const HeaderArea = memo(() => {
  const { t } = useTranslation('User.Battery')

  const [percentage, setPercentage] = useState(90)

  useEffect(() => {
    const i = setInterval(() => {
      setPercentage(Math.random() * 100)
    }, 10000)
    return () => {
      clearInterval(i)
    }
  }, [])

  return (
    <YStack alignItems="center">
      <ProgressRing percentage={percentage} />

      <GaugeChart />

      <SizableText>{t('On.Standby')}</SizableText>
      <SizableText
        fontSize="$8"
        lineHeight="$8"
        fontWeight="$bold"
      >
        0.7kWh
      </SizableText>
    </YStack>
  )
})
export default HeaderArea

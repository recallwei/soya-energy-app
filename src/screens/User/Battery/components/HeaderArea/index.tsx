import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, YStack } from 'tamagui'

import ProgressRing from './ProgressRing'

const HeaderArea = memo(() => {
  const { t } = useTranslation('User.Battery')

  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const i = setInterval(() => {
      setPercentage(Math.random() * 100)
    }, 2000)
    return () => {
      clearInterval(i)
    }
  }, [])

  return (
    <YStack alignItems="center">
      <ProgressRing percentage={percentage} />

      <SizableText>{t('On.Standby')}</SizableText>
      <SizableText
        fontSize="$9"
        lineHeight="$9"
        fontWeight="$bold"
      >
        0.7kWh
      </SizableText>
    </YStack>
  )
})
export default HeaderArea

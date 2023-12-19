import { Zap } from '@tamagui/lucide-icons'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, View, XStack, YStack } from 'tamagui'

import { AnimationNumber } from '@/components'
import { globalStyles } from '@/constants'

import ProgressRing from './ProgressRing'

const HeaderArea = memo(() => {
  const { t } = useTranslation('User.Battery')

  const [percentage, setPercentage] = useState(90)

  useEffect(() => {
    const i = setInterval(() => {
      setPercentage(Math.random() * 100)
    }, 10000)
    return () => clearInterval(i)
  }, [])

  return (
    <YStack
      alignItems="center"
      space="$3"
      mb="$3"
    >
      <View position="relative">
        <ProgressRing percentage={percentage} />
        <YStack
          space="$2"
          alignItems="center"
          position="absolute"
          left={0}
          top={0}
          right={0}
          bottom={0}
          justifyContent="center"
        >
          <Zap
            size="$1.5"
            color={globalStyles.successColor}
            fill={globalStyles.successColor}
          />
          <XStack alignItems="center">
            <AnimationNumber
              size="$11"
              value={Number(percentage.toFixed(0))}
              duration={1000}
            />
            <SizableText size="$6">%</SizableText>
          </XStack>
        </YStack>
      </View>

      <SizableText size="$7">{t('On.Standby')}</SizableText>
      <SizableText
        size="$9"
        lineHeight="$9"
        fontWeight="$bold"
      >
        0.7kWh
      </SizableText>
    </YStack>
  )
})
export default HeaderArea

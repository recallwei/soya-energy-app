import { Zap } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, View, XStack, YStack } from 'tamagui'

import { AnimationNumber } from '@/components'
import { globalStyles } from '@/constants'
import type { BatteryAnalysis } from '@/types'

import ProgressRing from './ProgressRing'

interface Props {
  data?: BatteryAnalysis
}

const HeaderArea = memo((props: Props) => {
  const { t } = useTranslation('User.Battery')

  const getPercentage = () => {
    if (!props.data?.soc) return 0
    return Number(Number(props.data.soc).toFixed(0))
  }

  return (
    <YStack
      alignItems="center"
      space="$3"
      mb="$3"
    >
      <View position="relative">
        <ProgressRing percentage={getPercentage()} />
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
              value={getPercentage()}
              duration={1000}
            />
            <SizableText size="$6">%</SizableText>
          </XStack>
        </YStack>
      </View>

      <SizableText size="$7">{t('On.Standby')}</SizableText>
      <AnimationNumber
        size="$9"
        lineHeight="$9"
        fontWeight="$bold"
        value={Number(props.data?.capacity)}
        suffix="kWh"
      />
    </YStack>
  )
})
export default HeaderArea

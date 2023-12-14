import { Zap } from '@tamagui/lucide-icons'
import React, { memo } from 'react'
import Svg, { Circle } from 'react-native-svg'
import { SizableText, View, XStack, YStack } from 'tamagui'

import { globalStyles } from '@/constants'

interface Props {
  percentage: number
}

function CircleComponent({ color, percentage = 100 }: { color: string; percentage?: number }) {
  const r = 90
  const circ = 2 * Math.PI * r
  const strokePct = ((100 - percentage) * circ) / 100
  return (
    <Svg
      style={{ position: 'absolute' }}
      width="100%"
      height="100%"
    >
      <Circle
        r={r}
        cx={125}
        cy={125}
        fill="transparent"
        stroke={strokePct !== circ ? color : ''}
        strokeWidth={12}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
      />
    </Svg>
  )
}

const ProgressRing = memo((props: Props) => {
  const { percentage } = props

  function cleanPercentage(p: number) {
    const isNegativeOrNaN = !Number.isFinite(+p) || p < 0
    const isTooHigh = p > 100
    // eslint-disable-next-line no-nested-ternary
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +p
  }

  return (
    <View
      alignItems="center"
      justifyContent="center"
      width={250}
      height={250}
    >
      <CircleComponent color="lightgrey" />
      <CircleComponent
        color={globalStyles.successColor}
        percentage={cleanPercentage(percentage)}
      />
      <YStack
        space="$2"
        alignItems="center"
      >
        <Zap
          size="$1.5"
          color={globalStyles.successColor}
          fill={globalStyles.successColor}
        />
        <XStack alignItems="center">
          <SizableText size="$11">{percentage.toFixed(0)}</SizableText>
          <SizableText size="$6">%</SizableText>
        </XStack>
      </YStack>
    </View>
  )
})
export default ProgressRing

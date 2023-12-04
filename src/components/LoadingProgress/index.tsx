import { memo } from 'react'
import { Progress, Spinner } from 'tamagui'

import { useThemeStore } from '@/store'
import { DeviceUtils } from '@/utils'

interface Props {
  value?: number
  width?: number
  progressOpacity?: number
}

const LoadingProgress = memo((props: Props) => {
  const themeStore = useThemeStore()
  const { value, width = DeviceUtils.SCREEN_WIDTH * 0.8, progressOpacity } = props
  return (
    <>
      <Spinner
        color={themeStore.getTextColor()}
        size="large"
      />
      <Progress
        size="$2"
        value={value}
        width={width}
        alignSelf="center"
        marginTop="$4"
        opacity={progressOpacity}
      >
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </>
  )
})
export default LoadingProgress

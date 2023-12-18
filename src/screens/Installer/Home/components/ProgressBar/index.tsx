import { memo } from 'react'
import { View } from 'tamagui'

import { globalStyles } from '@/constants'

interface Props {
  normal?: number
  offline?: number
  alarm?: number
  notMonitored?: number
}

const ProgressBar = memo((props: Props) => (
  <View
    flexDirection="row"
    height={6}
    width="100%"
    borderRadius={5}
    overflow="hidden"
  >
    <View
      flex={Number(props.normal) || 0}
      backgroundColor={globalStyles.successColor}
    />
    <View
      flex={Number(props.alarm) || 0}
      backgroundColor={globalStyles.errorColor}
    />
    <View
      flex={Number(props.offline) || 0}
      backgroundColor={globalStyles.warningColor}
    />
    <View
      flex={Number(props.notMonitored) || 0}
      backgroundColor={globalStyles.muteColor}
    />
  </View>
))
export default ProgressBar

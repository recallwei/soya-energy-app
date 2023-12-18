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
      flex={parseInt(props.normal, 10) || 0}
      backgroundColor={globalStyles.successColor}
    />
    <View
      flex={parseInt(props.alarm, 10) || 0}
      backgroundColor={globalStyles.errorColor}
    />
    <View
      flex={parseInt(props.offline, 10) || 0}
      backgroundColor={globalStyles.warningColor}
    />
    <View
      flex={parseInt(props.notMonitored, 10) || 0}
      backgroundColor={globalStyles.muteColor}
    />
  </View>
))
export default ProgressBar

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
      flex={props.normal}
      backgroundColor={globalStyles.successColor}
    />
    <View
      flex={props.alarm}
      backgroundColor={globalStyles.errorColor}
    />
    <View
      flex={props.offline}
      backgroundColor={globalStyles.warningColor}
    />
    <View
      flex={props.notMonitored}
      backgroundColor={globalStyles.muteColor}
    />
  </View>
))
export default ProgressBar

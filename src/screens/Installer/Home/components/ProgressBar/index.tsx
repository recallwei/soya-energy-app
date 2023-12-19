import { isNumber } from 'lodash'
import { memo } from 'react'
import { View } from 'tamagui'

import { globalStyles } from '@/constants'

interface Props {
  normal?: number
  offline?: number
  alarm?: number
  notMonitored?: number
}

const ProgressBar = memo((props: Props) => {
  const getFlex = (value?: number) => {
    if (isNumber(value)) {
      return value
    }
    return 0
  }

  return (
    <View
      flexDirection="row"
      height={6}
      width="100%"
      borderRadius={5}
      overflow="hidden"
    >
      <View
        flex={getFlex(props.normal)}
        backgroundColor={globalStyles.successColor}
      />
      <View
        flex={getFlex(props.alarm)}
        backgroundColor={globalStyles.errorColor}
      />
      <View
        flex={getFlex(props.offline)}
        backgroundColor={globalStyles.warningColor}
      />
      <View
        flex={getFlex(props.notMonitored)}
        backgroundColor={globalStyles.muteColor}
      />
    </View>
  )
})
export default ProgressBar

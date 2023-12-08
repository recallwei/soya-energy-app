import { Circle } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { SizableText, XStack } from 'tamagui'

import type { ManagementTab } from '../../../../enums'
import { getStatusMeta } from '../../../../utils'

interface Props {
  status?: string
  type: ManagementTab
}

const StatusBadge = memo((props: Props) => {
  if (!props.status) {
    return null
  }

  const { color, text } = getStatusMeta(props.status, props.type)

  return (
    <XStack
      alignItems="center"
      space="$2"
    >
      {getStatusMeta(props.status, props.type).color && (
        <Circle
          size={16}
          fill={color}
          color={color}
        />
      )}
      <SizableText size="$4">{text?.()}</SizableText>
    </XStack>
  )
})
export default StatusBadge

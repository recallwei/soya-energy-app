import { Circle } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, XStack } from 'tamagui'

import type { ManagementTab } from '../../../../enums'
import { getStatusMeta } from '../../../../utils'

interface Props {
  status?: string
  currentTab: ManagementTab
}

const StatusBadge = memo((props: Props) => {
  const { i18n } = useTranslation()

  if (!props.status?.toString() || props.status?.toString() === '0') {
    return null
  }

  const { color, text } = getStatusMeta(props.status.toString(), props.currentTab)

  return (
    <XStack
      alignItems="center"
      space="$2"
      key={i18n.language}
    >
      {color && (
        <Circle
          size={16}
          fill={color}
          color={color}
        />
      )}
      <SizableText size="$4">{text}</SizableText>
    </XStack>
  )
})
export default StatusBadge

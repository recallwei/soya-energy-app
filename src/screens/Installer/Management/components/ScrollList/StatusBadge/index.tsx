import { Circle } from '@tamagui/lucide-icons'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SizableText, XStack } from 'tamagui'

import type { Plant } from '@/types'

import { tabStatusI18nMap } from '../../../maps'
import { getColor } from '../../../utils'

const StatusBadge = memo((props: Plant) => {
  const [statusText, setStatusText] = useState('')
  const { i18n } = useTranslation()

  useEffect(() => {
    if (props.status) {
      setStatusText(tabStatusI18nMap.get(props.status)?.() ?? '')
    }
  }, [props.status, i18n.language])

  if (!props.status) {
    return null
  }

  const color = getColor(props.status)

  return (
    <XStack
      alignItems="center"
      space="$2"
    >
      {color && (
        <Circle
          size={16}
          fill={color}
          color={color}
        />
      )}
      <SizableText size="$4">{statusText}</SizableText>
    </XStack>
  )
})
export default StatusBadge

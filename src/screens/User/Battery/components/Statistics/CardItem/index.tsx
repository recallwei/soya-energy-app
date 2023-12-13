import { memo } from 'react'
import { SizableText, YStack } from 'tamagui'

import { Card } from '@/components'

interface Props {
  title: string
  value: string
}

const CardItem = memo((props: Props) => {
  const { title, value } = props
  return (
    <Card width="48%">
      <YStack
        alignItems="center"
        justifyContent="center"
        space="$2"
      >
        <SizableText fontSize="$4">{title}</SizableText>
        <SizableText
          fontSize="$8"
          fontWeight="$bold"
        >
          {value}
        </SizableText>
      </YStack>
    </Card>
  )
})
export default CardItem

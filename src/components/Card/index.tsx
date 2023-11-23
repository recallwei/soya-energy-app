import { memo, type PropsWithChildren } from 'react'
import type { CardProps } from 'tamagui'
import { Card as TCard } from 'tamagui'

interface Props extends PropsWithChildren<CardProps> {
  width?: string | number
}

const Card = memo((props: Props) => {
  const { width = '100%', children, ...rest } = props
  return (
    <TCard
      size="$4"
      bordered
      animation="bouncy"
      width={width}
      height="auto"
      pressStyle={{ scale: 0.95 }}
      {...rest}
    >
      <TCard.Header padded>{children}</TCard.Header>
    </TCard>
  )
})

export default Card

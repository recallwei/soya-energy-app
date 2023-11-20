import { memo, type PropsWithChildren } from 'react'
import { Card as TCard } from 'tamagui'

interface Props extends PropsWithChildren {
  width?: string | number
}

const Card = memo((props: Props) => {
  const { width = '100%' } = props
  return (
    <TCard
      size="$4"
      bordered
      animation="bouncy"
      width={width}
      height="auto"
      pressStyle={{ scale: 0.95 }}
    >
      <TCard.Header padded>{props.children}</TCard.Header>
    </TCard>
  )
})

export default Card

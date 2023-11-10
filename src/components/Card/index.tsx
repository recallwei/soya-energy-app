import type { PropsWithChildren } from 'react'
import { Card as TCard } from 'tamagui'

export default function Card(props: PropsWithChildren) {
  return (
    <TCard
      size="$4"
      bordered
      animation="bouncy"
      width="100%"
      height="auto"
      pressStyle={{ scale: 0.95 }}
    >
      <TCard.Header padded>{props.children}</TCard.Header>
    </TCard>
  )
}

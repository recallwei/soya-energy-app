import type { PropsWithChildren } from 'react'
import { Card } from 'tamagui'

export default function SCard(props: PropsWithChildren) {
  return (
    <Card
      size="$4"
      bordered
      animation="bouncy"
      width="100%"
      height="auto"
      pressStyle={{ scale: 0.95 }}
    >
      <Card.Header padded>{props.children}</Card.Header>
    </Card>
  )
}

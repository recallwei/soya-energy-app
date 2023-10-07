import type { PropsWithChildren } from 'react'
import { Card } from 'tamagui'

type Props = PropsWithChildren

export default function SCard(props: Props): React.JSX.Element {
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

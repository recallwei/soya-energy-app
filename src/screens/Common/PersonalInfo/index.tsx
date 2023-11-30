import { Card, YStack } from 'tamagui'

import { UserAvatar } from './components'

export default function Screen() {
  return (
    <YStack
      padding="$4"
      space="$1"
    >
      <UserAvatar />
      <Card>
        <Card.Footer />
      </Card>
    </YStack>
  )
}

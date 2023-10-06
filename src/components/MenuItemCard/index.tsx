import { ChevronRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Card, Text, View, XStack, YStack } from 'tamagui'

interface Props {
  title?: string
  description?: string
  icon?: any
  onPress?: () => void
}

export type MenuItemCardProps = Props

export default function MenuItemCard(props: Props) {
  const [isPressing, setIsPressing] = useState(false)
  return (
    <Card
      size="$3"
      bordered
      animation="bouncy"
      width="100%"
      height="auto"
      pressStyle={{ scale: 0.95 }}
      onPress={() => {
        if (typeof props.onPress === 'function') {
          props.onPress()
        }
      }}
      onPressIn={() => setIsPressing(true)}
      onPressOut={() => setIsPressing(false)}
    >
      <Card.Header
        padded
        position="relative"
      >
        <XStack
          alignItems="center"
          space="$3"
        >
          {props.icon && (
            <View>
              <props.icon size="$1" />
            </View>
          )}
          <YStack rowGap="$2">
            <Text fontSize="$5">{props.title}</Text>
            <Text
              fontSize="$2"
              theme="alt2"
            >
              {props.description}
            </Text>
          </YStack>
        </XStack>

        <View
          position="absolute"
          right={10}
          top={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          animation="bouncy"
          style={{
            transform: [
              {
                translateX: isPressing ? -10 : 0
              }
            ]
          }}
        >
          <ChevronRight />
        </View>
      </Card.Header>
    </Card>
  )
}

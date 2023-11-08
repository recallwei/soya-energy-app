import { ChevronRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Card, Label, Switch, View, XStack, YStack } from 'tamagui'

interface Props {
  title?: string
  description?: string
  icon?: any
  onPress?: () => void
  switcher?: boolean
}

export default function MenuItemCard(props: Props) {
  const [isPressing, setIsPressing] = useState(false)
  const [isSwitcherOn, setIsSwitcherOn] = useState(false)
  return (
    <Card
      size="$3"
      bordered
      animation="bouncy"
      width="100%"
      height="auto"
      pressStyle={{ scale: 0.95 }}
      onPress={() => {
        if (props.switcher) {
          setIsSwitcherOn(!isSwitcherOn)
        }
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
          space="$5"
          marginRight="$3"
        >
          {props.icon && (
            <View>
              <props.icon size="$1.5" />
            </View>
          )}
          <YStack rowGap="$1">
            <Label>{props.title}</Label>
            <Label fontSize="$3">{props.description}</Label>
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
          style={
            !props.switcher && {
              transform: [
                {
                  translateX: isPressing ? -10 : 0
                }
              ]
            }
          }
        >
          {props.switcher ? (
            <Switch
              size="$2"
              checked={isSwitcherOn}
            >
              <Switch.Thumb
                animation="quick"
                backgroundColor="#0078d7"
              />
            </Switch>
          ) : (
            <ChevronRight />
          )}
        </View>
      </Card.Header>
    </Card>
  )
}

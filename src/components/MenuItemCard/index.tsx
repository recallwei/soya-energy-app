import { ChevronRight } from '@tamagui/lucide-icons'
import { useCallback, useState } from 'react'
import { Card, SizableText, Switch, View, XStack, YStack } from 'tamagui'

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

  const handlePress = () => {
    if (typeof props.onPress === 'function') {
      props.onPress()
    }
  }

  const handleSwitchPress = () => {
    setIsSwitcherOn(!isSwitcherOn)
    if (typeof props.onPress === 'function') {
      props.onPress()
    }
  }

  const handlePressIn = useCallback(() => setIsPressing(true), [])
  const handlePressOut = useCallback(() => setIsPressing(false), [])

  return (
    <Card
      size="$3"
      bordered
      animation="bouncy"
      width="100%"
      height="auto"
      pressStyle={{ scale: 0.9 }}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Card.Header
        padded
        position="relative"
      >
        <XStack
          alignItems="center"
          space="$5"
          marginHorizontal="$2"
        >
          {props.icon && (
            <View>
              <props.icon size="$1.5" />
            </View>
          )}
          <YStack>
            <SizableText
              fontFamily="$body"
              fontWeight="$medium"
            >
              {props.title}
            </SizableText>
            <SizableText
              fontFamily="$body"
              fontSize="$2"
            >
              {props.description}
            </SizableText>
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
              onPress={handleSwitchPress}
            >
              <Switch.Thumb
                animation="slow"
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

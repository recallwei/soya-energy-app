import { ChevronRight } from '@tamagui/lucide-icons'
import { memo, useState } from 'react'
import { Card, Separator, SizableText, Switch, View, XStack, YStack } from 'tamagui'

import { globalStyles } from '@/constants'

interface Props {
  title?: string
  description?: string
  icon?: any
  onPress?: () => void
  switcher?: boolean
  onSwitch?: (value: boolean) => void
  switchValue?: boolean
  setSwitchValue?: (value: boolean) => void
  header?: boolean
  headerLeftText?: string
  headerRightText?: string
  descriptionLines?: number
  hideAction?: boolean
}

export const MenuItemCard = memo((props: Props) => {
  const [isPressing, setIsPressing] = useState(false)

  const handleSwitchPress = () => {
    const switchValue = !props.switchValue
    if (typeof props.setSwitchValue === 'function') {
      props.setSwitchValue(switchValue)
    }
    if (typeof props.onSwitch === 'function') {
      props.onSwitch(switchValue)
    }
    if (typeof props.onPress === 'function') {
      props.onPress()
    }
  }

  const handlePress = () => {
    if (props.switcher) {
      handleSwitchPress()
    } else if (typeof props.onPress === 'function') {
      props.onPress()
    }
  }

  const handlePressIn = () => setIsPressing(true)
  const handlePressOut = () => setIsPressing(false)

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
      {props.header && (
        <Card.Header padded>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            marginHorizontal="$2"
          >
            <SizableText
              size="$4"
              opacity={props.headerLeftText ? 1 : 0}
            >
              {props.headerLeftText}
            </SizableText>
            <SizableText
              size="$4"
              opacity={props.headerRightText ? 1 : 0}
            >
              {props.headerRightText}
            </SizableText>
          </XStack>
        </Card.Header>
      )}
      {props.header && <Separator />}
      <Card.Footer
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
          {/* eslint-disable-next-line no-nested-ternary */}
          <YStack marginRight={props.hideAction ? undefined : props.switcher ? 75 : 60}>
            {props.title && (
              <SizableText
                fontFamily="$body"
                fontWeight="$medium"
              >
                {props.title}
              </SizableText>
            )}
            {props.description && (
              <SizableText
                fontFamily="$body"
                fontSize="$2"
                numberOfLines={props.descriptionLines}
                ellipsizeMode={props.descriptionLines ? 'tail' : undefined}
              >
                {props.description}
              </SizableText>
            )}
          </YStack>
        </XStack>

        {!props.hideAction && (
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
                checked={props.switchValue}
                onPress={handleSwitchPress}
              >
                <Switch.Thumb
                  animation="medium"
                  backgroundColor={globalStyles.primaryColor}
                />
              </Switch>
            ) : (
              <ChevronRight />
            )}
          </View>
        )}
      </Card.Footer>
    </Card>
  )
})

export default MenuItemCard

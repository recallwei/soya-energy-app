import { memo } from 'react'
import { Card, SizableText, YStack } from 'tamagui'

interface Props {
  icon?: React.ReactNode
  text?: string
  onPress?: () => void
}

const ServiceItem = memo((props: Props) => {
  const handlePress = () => {
    if (typeof props.onPress === 'function') {
      props.onPress()
    }
  }

  return (
    <Card
      flex={1}
      padding="$2"
      animation="bouncy"
      onPress={handlePress}
      pressStyle={{ scale: 0.9 }}
    >
      <YStack
        alignItems="center"
        space="$2.5"
      >
        {props.icon}
        <SizableText
          fontSize="$3"
          textAlign="center"
          lineHeight="$1"
        >
          {props.text}
        </SizableText>
      </YStack>
    </Card>
  )
})

export default ServiceItem

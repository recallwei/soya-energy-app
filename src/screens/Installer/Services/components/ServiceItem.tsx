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
      padding="$3"
      animation="bouncy"
      onPress={handlePress}
      pressStyle={{ scale: 0.9 }}
    >
      <YStack
        alignItems="center"
        space="$2"
      >
        {props.icon}
        <SizableText
          size="$3"
          textAlign="center"
          lineHeight="$1"
          fontWeight="$medium"
        >
          {props.text}
        </SizableText>
      </YStack>
    </Card>
  )
})
export default ServiceItem

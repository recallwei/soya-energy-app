import { SizableText, View, YStack } from 'tamagui'

interface Props {
  textPosition?: 'bottom' | 'right'
  icon?: React.ReactNode
  text?: string
}

export default function OutputCardStatisticItem({
  textPosition = 'bottom',
  icon,
  text = ''
}: Props) {
  if (textPosition === 'bottom') {
    return (
      <YStack
        alignItems="center"
        rowGap="$2"
      >
        {icon}
        <SizableText
          size="$4"
          fontWeight="$bold"
        >
          {text}
        </SizableText>
      </YStack>
    )
  }
  return (
    <View
      alignItems="center"
      justifyContent="center"
      columnGap="$2"
      position="relative"
    >
      {icon}
      <SizableText
        size="$4"
        fontWeight="$bold"
        position="absolute"
        right={-80}
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
      >
        {text}
      </SizableText>
    </View>
  )
}

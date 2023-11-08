import { Text, View, YStack } from 'tamagui'

interface Props {
  textPosition?: 'bottom' | 'right'
  icon?: React.ReactNode
  text?: string
}

export default function OutputCardStatisticItem({
  textPosition = 'bottom',
  icon,
  text = ''
}: Props): React.JSX.Element {
  if (textPosition === 'bottom') {
    return (
      <YStack
        alignItems="center"
        rowGap="$2"
      >
        {icon}
        <Text
          fontFamily="$body"
          fontWeight="bold"
        >
          {text}
        </Text>
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
      <Text
        fontFamily="$body"
        position="absolute"
        right={-80}
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        fontWeight="bold"
      >
        {text}
      </Text>
    </View>
  )
}

import { Text, YStack } from 'tamagui'

interface Props {
  size?: 'default' | 'large'
  borderColor?: string
  icon?: React.ReactNode
  iconText?: string
}

export default function BatteryStatus({
  size = 'default',
  borderColor,
  icon,
  iconText = ''
}: Props): React.JSX.Element {
  return (
    <YStack
      alignItems="center"
      rowGap="$2"
    >
      <YStack
        justifyContent="center"
        alignItems="center"
        borderColor={borderColor ?? '#333333'}
        borderWidth={size === 'large' ? 4 : 2}
        borderRadius={9999}
        width={size === 'large' ? '$9' : '$8'}
        height={size === 'large' ? '$9' : '$8'}
        rowGap="$1"
      >
        {icon}
        <Text
          fontFamily="$body"
          fontWeight="bold"
        >
          {iconText}
        </Text>
      </YStack>
    </YStack>
  )
}

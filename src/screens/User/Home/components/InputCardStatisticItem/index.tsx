import { SizableText, YStack } from 'tamagui'

interface Props {
  size?: 'default' | 'large'
  borderColor?: string
  icon?: React.ReactNode
  iconText?: string
  bottomText?: string
}

export default function InputCardStatisticItem({
  size = 'default',
  borderColor,
  icon,
  iconText = '',
  bottomText = ''
}: Props) {
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
        width={size === 'large' ? '$10' : '$8'}
        height={size === 'large' ? '$10' : '$8'}
        rowGap="$1"
      >
        {icon}
        <SizableText>{iconText}</SizableText>
      </YStack>
      <SizableText>{bottomText}</SizableText>
    </YStack>
  )
}

import { memo } from 'react'
import { SizableText, XStack } from 'tamagui'

interface Props {
  leftText?: string
  rightText?: string
  customRight?: React.ReactNode
  stripe?: boolean
}
const FieldRow = memo((props: Props) => (
  <XStack
    alignItems="center"
    justifyContent="space-between"
    padding="$2"
    backgroundColor="$gray2"
    borderRadius="$2"
    {...(props.stripe && {
      backgroundColor: '$gray2',
      borderRadius: '$2'
    })}
  >
    <SizableText>{props.leftText}</SizableText>
    {props.customRight ? (
      props.customRight
    ) : (
      <SizableText fontWeight="$bold">{props.rightText ?? '--'}</SizableText>
    )}
  </XStack>
))
export default FieldRow

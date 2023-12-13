import { memo } from 'react'
import type { XStackProps } from 'tamagui'
import { SizableText, XStack } from 'tamagui'

interface Props extends XStackProps {
  leftText?: string
  rightText?: string | number
  customRight?: React.ReactNode
  stripe?: boolean
}
const FieldRow = memo((props: Props) => {
  const { leftText, rightText, customRight, stripe, ...rest } = props
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      padding="$2"
      {...(stripe && {
        backgroundColor: '$gray2',
        borderRadius: '$2'
      })}
      {...rest}
    >
      <SizableText fontSize="$4">{leftText}</SizableText>
      {customRight || (
        <SizableText
          fontSize="$4"
          fontWeight="$bold"
        >
          {rightText ?? '--'}
        </SizableText>
      )}
    </XStack>
  )
})
export default FieldRow

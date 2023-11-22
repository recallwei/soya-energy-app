import { Check } from '@tamagui/lucide-icons'
import { memo } from 'react'
import type { CheckedState, XStackProps } from 'tamagui'
import { Checkbox as TCheckbox, Label, XStack } from 'tamagui'

interface Props extends XStackProps {
  label?: string
  checked?: CheckedState
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = memo((props: Props) => {
  const { label, checked, disabled, onCheckedChange, ...rest } = props
  return (
    <XStack
      space="$2"
      alignItems="flex-start"
      {...rest}
    >
      <TCheckbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <TCheckbox.Indicator>
          <Check />
        </TCheckbox.Indicator>
      </TCheckbox>

      <Label
        lineHeight={21}
        onPress={() => onCheckedChange && onCheckedChange(!props.checked)}
      >
        {label}
      </Label>
    </XStack>
  )
})

export default Checkbox

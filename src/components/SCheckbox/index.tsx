import { Check } from '@tamagui/lucide-icons'
import type { DimensionValue } from 'react-native'
import type { CheckedState } from 'tamagui'
import { Checkbox, Label, XStack } from 'tamagui'

interface Props {
  label?: string
  width?: DimensionValue
  checked?: CheckedState
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export default function SCheckbox(props: Props) {
  return (
    <XStack
      width={props.width}
      space="$2"
      alignItems="flex-start"
    >
      <Checkbox
        checked={props.checked}
        onCheckedChange={props.onCheckedChange}
        disabled={props.disabled}
      >
        <Checkbox.Indicator>
          <Check />
        </Checkbox.Indicator>
      </Checkbox>

      <Label lineHeight={21}>{props.label}</Label>
    </XStack>
  )
}

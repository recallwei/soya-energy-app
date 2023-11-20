import { Check } from '@tamagui/lucide-icons'
import type { DimensionValue } from 'react-native'
import type { CheckedState } from 'tamagui'
import { Checkbox as TCheckbox, Label, XStack } from 'tamagui'

interface Props {
  label?: string
  width?: DimensionValue
  checked?: CheckedState
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export default function Checkbox(props: Props) {
  return (
    <XStack
      width={props.width}
      space="$2"
      alignItems="flex-start"
    >
      <TCheckbox
        checked={props.checked}
        onCheckedChange={props.onCheckedChange}
        disabled={props.disabled}
      >
        <TCheckbox.Indicator>
          <Check />
        </TCheckbox.Indicator>
      </TCheckbox>

      <Label
        lineHeight={21}
        onPress={() => props.onCheckedChange && props.onCheckedChange(!props.checked)}
      >
        {props.label}
      </Label>
    </XStack>
  )
}

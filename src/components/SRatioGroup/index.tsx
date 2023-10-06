import type { SizeTokens } from 'tamagui'
import { Label, RadioGroup, XStack } from 'tamagui'

interface GroupItem {
  label: string
  value: string
}

interface Props {
  value?: string
  data?: GroupItem[]
  size?: SizeTokens
  onValueChange?: (value: string) => void
}

export default function RatioGroup(props: Props) {
  return (
    <RadioGroup
      value={props.value}
      space="$2"
      onValueChange={props.onValueChange}
    >
      {props.data?.map((groupItem, groupIndex) => (
        <XStack
          space="$2"
          key={groupIndex}
        >
          <RadioGroup.Item
            value={groupItem.value}
            size={props.size}
          >
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          <Label
            lineHeight={26}
            size={props.size}
          >
            {groupItem.label}
          </Label>
        </XStack>
      ))}
    </RadioGroup>
  )
}

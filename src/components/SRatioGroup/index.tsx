import type { SizeTokens } from 'tamagui'
import { Label, Paragraph, RadioGroup, XStack, YStack } from 'tamagui'

interface GroupItem {
  label: string
  description?: string
  value: string
}

interface Props {
  value?: string
  data?: GroupItem[]
  size?: SizeTokens
  onValueChange?: (value: string) => void
  description?: boolean
}

export default function RatioGroup(props: Props) {
  if (props.description) {
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
            alignItems="center"
          >
            <RadioGroup.Item
              value={groupItem.value}
              size={props.size}
            >
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <YStack>
              <Label
                lineHeight={26}
                size={props.size}
              >
                {groupItem.label}
              </Label>
              <Paragraph>{groupItem.description}</Paragraph>
            </YStack>
          </XStack>
        ))}
      </RadioGroup>
    )
  }
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

import type { SizeTokens } from 'tamagui'
import { Label, Paragraph, RadioGroup as TRadioGroup, XStack, YStack } from 'tamagui'

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

export default function RadioGroup(props: Props) {
  if (props.description) {
    return (
      <TRadioGroup
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
            <TRadioGroup.Item
              value={groupItem.value}
              size={props.size}
            >
              <TRadioGroup.Indicator />
            </TRadioGroup.Item>
            <YStack>
              <Label
                lineHeight={21}
                size={props.size}
              >
                {groupItem.label}
              </Label>
              <Paragraph>{groupItem.description}</Paragraph>
            </YStack>
          </XStack>
        ))}
      </TRadioGroup>
    )
  }
  return (
    <TRadioGroup
      value={props.value}
      space="$2"
      onValueChange={props.onValueChange}
    >
      {props.data?.map((groupItem, groupIndex) => (
        <XStack
          space="$2"
          key={groupIndex}
        >
          <TRadioGroup.Item
            value={groupItem.value}
            size={props.size}
          >
            <TRadioGroup.Indicator />
          </TRadioGroup.Item>
          <Label
            lineHeight={20}
            size={props.size}
          >
            {groupItem.label}
          </Label>
        </XStack>
      ))}
    </TRadioGroup>
  )
}

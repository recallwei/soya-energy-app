import { ChevronDown } from '@tamagui/lucide-icons'
import {
  Accordion,
  Label,
  RadioGroup,
  Separator,
  Square,
  Text,
  XStack,
  YStack
} from 'tamagui'

interface Data {
  title: string
  mode: string
  children: CollapseItem[]
}

interface CollapseItem {
  mode: string
  textList: string[]
}

interface Props {
  data: Data
}

export default function CollapseArea(props: Props): React.JSX.Element {
  return (
    <Accordion
      overflow="hidden"
      width="100%"
      type="multiple"
    >
      <Accordion.Item value={props.data.title}>
        <Accordion.Trigger>
          {({ open }: any) => (
            <XStack
              justifyContent="space-between"
              alignItems="center"
            >
              <XStack alignContent="center">
                <Text width="40%">{props.data.title}</Text>
                <Text width="50%">Mode: {props.data.mode}</Text>
              </XStack>
              <Square
                animation="quick"
                rotate={open ? '180deg' : '0deg'}
              >
                <ChevronDown size="$1" />
              </Square>
            </XStack>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <RadioGroup>
            <YStack space="$2">
              {props.data.children.map((collapseItem, collapseItemIndex) => (
                <XStack
                  key={collapseItemIndex}
                  width={300}
                  space="$4"
                >
                  <RadioGroup.Item value={collapseItem.mode}>
                    <RadioGroup.Indicator />
                  </RadioGroup.Item>

                  <YStack space="$1">
                    <Label>{collapseItem.mode}</Label>
                    <Separator />
                    <YStack space="$1">
                      {collapseItem.textList.map((text, textIndex) => (
                        <Text
                          key={textIndex}
                          fontSize="$2"
                        >
                          {text}
                        </Text>
                      ))}
                    </YStack>
                  </YStack>
                </XStack>
              ))}
            </YStack>
          </RadioGroup>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )
}

import { Check, ChevronDown } from '@tamagui/lucide-icons'
import { Accordion, Checkbox, Separator, Square, Text, View, XStack, YStack } from 'tamagui'

interface MainItem {
  title: string
  children: CollapseItem[]
}

interface CollapseItem {
  title: string
  description: string
}

interface Props {
  data: MainItem[]
}

export default function CollapseArea(props: Props): React.JSX.Element {
  return (
    <Accordion
      overflow="hidden"
      width="100%"
      type="multiple"
    >
      {props.data.map((mainItem, mainItemIndex) => (
        <Accordion.Item
          key={mainItemIndex}
          value={mainItemIndex.toString()}
        >
          <Accordion.Trigger>
            {({ open }: any) => (
              <XStack>
                <XStack
                  width="40%"
                  gap="$3"
                >
                  <Square
                    animation="quick"
                    rotate={open ? '180deg' : '0deg'}
                  >
                    <ChevronDown size="$1" />
                  </Square>
                  <Text fontFamily="$body">{mainItem.title}</Text>
                </XStack>
                <View
                  width="22%"
                  alignItems="center"
                >
                  <Checkbox>
                    <Checkbox.Indicator>
                      <Check />
                    </Checkbox.Indicator>
                  </Checkbox>
                </View>
                <View
                  width="22%"
                  alignItems="center"
                >
                  <Checkbox>
                    <Checkbox.Indicator>
                      <Check />
                    </Checkbox.Indicator>
                  </Checkbox>
                </View>
                <View
                  width="22%"
                  alignItems="center"
                >
                  <Checkbox>
                    <Checkbox.Indicator>
                      <Check />
                    </Checkbox.Indicator>
                  </Checkbox>
                </View>
              </XStack>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <YStack gap="$4">
              {mainItem.children.map((collapseItem, collapseItemIndex) => (
                <YStack
                  space="$2"
                  key={collapseItemIndex}
                >
                  <YStack
                    space="$1"
                    gap="$1"
                  >
                    <XStack>
                      <Text
                        fontFamily="$body"
                        width="40%"
                      >
                        {collapseItem.title}
                      </Text>
                      <View
                        width="22%"
                        alignItems="center"
                      >
                        <Checkbox>
                          <Checkbox.Indicator>
                            <Check />
                          </Checkbox.Indicator>
                        </Checkbox>
                      </View>
                      <View
                        width="22%"
                        alignItems="center"
                      >
                        <Checkbox>
                          <Checkbox.Indicator>
                            <Check />
                          </Checkbox.Indicator>
                        </Checkbox>
                      </View>
                      <View
                        width="22%"
                        alignItems="center"
                      >
                        <Checkbox>
                          <Checkbox.Indicator>
                            <Check />
                          </Checkbox.Indicator>
                        </Checkbox>
                      </View>
                    </XStack>

                    <Text fontFamily="$body">{collapseItem.description}</Text>
                  </YStack>

                  {collapseItemIndex < mainItem.children.length - 1 && <Separator />}
                </YStack>
              ))}
            </YStack>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

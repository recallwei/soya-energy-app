import { ChevronDown } from '@tamagui/lucide-icons'
import { type PropsWithChildren, useState } from 'react'
import { Accordion, Button, Paragraph, Square, Text, XStack, YStack } from 'tamagui'

interface Props extends PropsWithChildren {
  title: string
  description?: string
}

export default function CollapseArea(props: Props): React.JSX.Element {
  const [isActive, setIsActive] = useState(false)

  const handleActive = () => {
    setIsActive(!isActive)
  }
  return (
    <Accordion
      overflow="hidden"
      width="100%"
      type="multiple"
    >
      <Accordion.Item value={props.title}>
        <Accordion.Trigger>
          {({ open }: any) => (
            <YStack space="$2">
              <XStack
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  fontFamily="$body"
                  fontWeight="500"
                >
                  {isActive ? `✅ ${props.title}` : props.title}
                </Text>
                <Square
                  animation="quick"
                  rotate={open ? '180deg' : '0deg'}
                >
                  <ChevronDown size="$1" />
                </Square>
              </XStack>

              <Paragraph>{props.description}</Paragraph>
            </YStack>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <YStack gap="$3">{props.children}</YStack>
          <Button
            marginTop="$3"
            onPress={handleActive}
          >
            {isActive ? 'Inactive' : 'Active'}
          </Button>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )
}

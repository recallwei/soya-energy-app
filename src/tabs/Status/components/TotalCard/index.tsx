import { XStack, Text, Card, Separator } from 'tamagui'

import { SVG } from '@/svg'

export default function TotalCard(): React.JSX.Element {
  return (
    <Card
      size="$4"
      bordered
      animation="bouncy"
      width="100%"
      height="auto"
      pressStyle={{ scale: 0.95 }}
    >
      <Card.Header padded>
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack
            alignItems="center"
            columnGap="$2"
          >
            <SVG.Lightning color="#f7d94b" />
            <Text
              fontWeight="bold"
              fontSize="$5"
            >
              38.40
            </Text>
            <Text>kWh</Text>
          </XStack>

          <Separator
            alignSelf="stretch"
            vertical
            marginHorizontal={15}
          />

          <XStack
            alignItems="center"
            columnGap="$2"
          >
            <SVG.Leaf color="green" />
            <Text
              fontWeight="bold"
              fontSize="$5"
            >
              25.60
            </Text>
            <Text>kg CO₂</Text>
          </XStack>
        </XStack>
      </Card.Header>
    </Card>
  )
}

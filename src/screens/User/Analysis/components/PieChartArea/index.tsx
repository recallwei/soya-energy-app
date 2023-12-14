import { Card, Text, View, XStack, YStack } from 'tamagui'

import { PieChart } from '@/charts'

interface ChartItem {
  value: number
  label?: string
  frontColor?: string
  color?: string
  percentage?: number
  text?: string
}

interface Props {
  data?: ChartItem[]
  unit?: string
}

export default function PieChartArea(props: Props) {
  if (!props.data || props.data.length === 0) return null

  return (
    <View
      position="relative"
      paddingVertical="$5"
    >
      <Card
        size="$4"
        bordered
        animation="bouncy"
        width="100%"
        pressStyle={{ scale: 0.95 }}
      >
        <Card.Header padded>
          <XStack
            justifyContent="space-between"
            alignItems="center"
          >
            <YStack space="$2">
              <Text
                fontFamily="$body"
                color={props.data[0].color}
                fontWeight="bold"
              >
                {`${props.data[0].value} ${props.unit}`}
              </Text>
              <Text fontFamily="$body">{props.data[0].label}</Text>
              <Text fontFamily="$body">{props.data[0].percentage}</Text>
            </YStack>
            <YStack space="$2">
              <Text
                fontFamily="$body"
                color={props.data[1].color}
                fontWeight="bold"
              >
                {`${props.data[1].value} ${props.unit}`}
              </Text>
              <Text fontFamily="$body">{props.data[1].label}</Text>
              <Text fontFamily="$body">{props.data[1].percentage}</Text>
            </YStack>
          </XStack>
        </Card.Header>
        <PieChart
          title="123"
          subtext="123"
          data={[
            {
              name: '123',
              value: 20
            },
            {
              name: '123',
              value: 20
            }
          ]}
        />
      </Card>
    </View>
  )
}

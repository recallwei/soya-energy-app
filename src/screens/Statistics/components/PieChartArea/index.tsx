import { PieChart } from 'react-native-gifted-charts'
import { Card, Square, Text, View, XStack, YStack } from 'tamagui'

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

export default function PieChartArea(props: Props): React.JSX.Element | null {
  if (!props.data || props.data.length === 0) return null

  const getTotal = () => props.data?.reduce((acc, cur) => acc + cur.value, 0).toFixed(2)
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
      </Card>
      <Square
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        zIndex={1}
      >
        <PieChart
          strokeWidth={2}
          strokeColor="white"
          data={props.data}
          donut
          radius={70}
          textColor="black"
          innerRadius={0}
          showTextBackground
          showValuesAsLabels
          showGradient={false}
          focusOnPress
          sectionAutoFocus
          centerLabelComponent={() => (
            <YStack alignItems="center">
              <Text fontFamily="$body">{getTotal()}</Text>
              <Text fontFamily="$body">{props.unit}</Text>
            </YStack>
          )}
        />
      </Square>
    </View>
  )
}

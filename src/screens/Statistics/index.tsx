import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { ScrollView, Text, View, YStack } from 'tamagui'

interface ChartItem {
  value: number
  label?: string
  frontColor?: string
  color?: string
  percentage?: number
  text?: string
}

export default function StatisticsScreen(): React.JSX.Element {
  const [producedData] = useState<ChartItem[]>([
    {
      label: 'Spontaneous self use',
      value: 5.31,
      percentage: 27.08,
      color: '#4a7903'
    },
    {
      label: 'On-grid',
      value: 14.3,
      percentage: 72.92,
      color: '#0078d7'
    }
  ])
  // const [consumedData, setConsumedData] = useState<ChartItem[]>([
  //   {
  //     label: 'Self use',
  //     value: 27.08,
  //     percentage: 27.08,
  //     color: 'f59a23'
  //   },
  //   {
  //     label: 'Purchase',
  //     value: 72.92,
  //     percentage: 72.92,
  //     color: 'ffff80'
  //   }
  // ])

  const renderDot = (color: string) => (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10
      }}
    />
  )

  const renderLegendComponent = (data: ChartItem[]) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        flexWrap: 'wrap',
        columnGap: 4
      }}
    >
      {data.map((item) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
            minWidth: '40%'
          }}
          key={item.label}
        >
          {renderDot(item.color!)}
          <Text>
            {item.label}: {item.text ?? ''}
          </Text>
        </View>
      ))}
    </View>
  )

  return (
    <SafeAreaView>
      <ScrollView height="100%">
        <YStack>
          <Text>Produced</Text>
          <View
            alignItems="center"
            padding="$1"
            width="100%"
          >
            <PieChart
              data={producedData}
              donut
              showText
              textColor="black"
              innerRadius={0}
              showTextBackground
              showValuesAsLabels
              showGradient={false}
              textBackgroundColor="#ffffff"
              textBackgroundRadius={16}
              textSize={10}
              focusOnPress
              sectionAutoFocus
              centerLabelComponent={() => (
                <YStack
                  rowGap="$1"
                  alignItems="center"
                >
                  <Text>19.61</Text>
                  <Text>kWh</Text>
                </YStack>
              )}
            />
            {renderLegendComponent(producedData)}
          </View>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

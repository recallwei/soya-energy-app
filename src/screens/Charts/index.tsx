import { useCallback, useState } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { BarChart, PieChart, LineChart } from 'react-native-gifted-charts'

import { TextStyles } from '@/styles'

import {
  getMockBarChartData,
  getMockLineChartData,
  getMockPieChartData
} from './mock'

interface ChartItem {
  value: number
  label?: string
  frontColor?: string
  color?: string
  percentage?: number
  text?: string
}

export default function ChartsScreen(): React.JSX.Element {
  const [barData, setBarData] = useState<ChartItem[]>([])
  const [lineData, setLineData] = useState<ChartItem[]>([])
  const [pieData, setPieData] = useState<ChartItem[]>([])

  const changeChartData = () => {
    setBarData(getMockBarChartData())
    setLineData(getMockLineChartData())
    setPieData(getMockPieChartData())
  }

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => changeChartData(), 1000)
    }, [])
  )

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
    <ScrollView>
      <Text
        style={{
          ...TextStyles.base,
          ...TextStyles.xl,
          ...TextStyles.bold,
          textAlign: 'center',
          marginVertical: 10
        }}
      >
        Based on Gifted Charts
      </Text>
      <Text
        style={{
          ...TextStyles.base,
          textAlign: 'center',
          marginVertical: 10
        }}
        onPress={changeChartData}
      >
        Reset Chart Data
      </Text>

      <Text
        style={[
          TextStyles.base,
          {
            textAlign: 'center',
            marginVertical: 10
          }
        ]}
      >
        Bar Charts
      </Text>
      <View
        style={{
          padding: 20,
          alignItems: 'center',
          marginBottom: 30
        }}
      >
        <BarChart
          data={barData}
          maxValue={100}
          barWidth={30}
          barBorderRadius={4}
          yAxisThickness={0}
          xAxisThickness={0}
          showFractionalValues
          isAnimated
          animationDuration={1000}
        />
      </View>

      <Text
        style={[
          TextStyles.base,
          {
            textAlign: 'center',
            marginVertical: 10
          }
        ]}
      >
        Line Charts
      </Text>
      <View
        style={{
          padding: 20,
          alignItems: 'center',
          marginBottom: 30
        }}
      >
        <LineChart
          data={lineData}
          maxValue={100}
          width={280}
          initialSpacing={20}
          spacing={100}
          hideDataPoints
          showVerticalLines
          verticalLinesUptoDataPoint
          isAnimated
          scrollAnimation
          animationDuration={1000}
          color="#0078d7"
          areaChart
          startFillColor="#0078d7"
          startOpacity={1}
          endOpacity={0.75}
        />
      </View>

      <Text
        style={[
          TextStyles.base,
          {
            textAlign: 'center',
            marginVertical: 10
          }
        ]}
      >
        Pie Charts
      </Text>
      <View
        style={{
          padding: 20,
          alignItems: 'center',
          marginBottom: 30,
          width: '100%'
        }}
      >
        <PieChart
          data={pieData}
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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                47%
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 2
                }}
              >
                Percentage
              </Text>
            </View>
          )}
        />
        {renderLegendComponent(pieData)}
      </View>
    </ScrollView>
  )
}

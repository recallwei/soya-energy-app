import SvgChart from '@wuba/react-native-echarts/svgChart'
import { memo, useEffect, useRef } from 'react'
import { View } from 'tamagui'

import type { BaseChartItem, ECharts } from '@/charts'
import echarts from '@/charts'
import { useThemeStore } from '@/store'

interface Props {
  title: string
  subtext: string
  data?: BaseChartItem[]
  width?: number
  height?: number
}

const PieChart = memo((props: Props) => {
  const { title, subtext, data = [], width = 200, height = 200 } = props
  const svgRef = useRef<any>(null)
  const chart = useRef<ECharts | null>(null)
  const themeStore = useThemeStore()

  useEffect(() => {
    initChart()
    return () => chart.current?.dispose()
  }, [])

  function initChart() {
    chart.current = echarts.init(svgRef.current!, themeStore.theme, {
      renderer: 'svg',
      width,
      height
    })
    getChartData()
  }

  function getChartData() {
    const option = {
      title: {
        text: title,
        subtext,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
        data: data.map((item) => item.name)
      },
      series: {
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    }
    chart.current!.setOption(option)
  }

  return (
    <View>
      <SvgChart ref={svgRef} />
    </View>
  )
})
export default PieChart

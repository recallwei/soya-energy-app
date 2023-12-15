import SvgChart from '@wuba/react-native-echarts/svgChart'
import { memo, useEffect, useRef } from 'react'
import type { StackProps } from 'tamagui'
import { Stack } from 'tamagui'

import type { BaseChartItem, ECharts, ECOption } from '@/charts'
import { useLangStore, useThemeStore } from '@/store'

import echarts from '../charts'

interface Props extends StackProps {
  title?: string
  data?: BaseChartItem[]
  width?: number | string
  height?: number | string
}

const PieChart = memo((props: Props) => {
  const { title, data = [], width = 200, height = 200, ...rest } = props
  const svgRef = useRef<any>(null)
  const chart = useRef<ECharts | null>(null)
  const themeStore = useThemeStore()
  const langStore = useLangStore()

  useEffect(() => {
    initChart()
    return () => chart.current?.dispose()
  }, [])

  function initChart() {
    chart.current = echarts.init(svgRef.current!, themeStore.theme, {
      renderer: 'svg',
      width,
      height,
      locale: langStore.lang
    })
    getChartData()
  }

  function getChartData() {
    const option: ECOption = {
      title: {
        text: title,
        left: 'center'
      },
      tooltip: {
        confine: true,
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        bottom: 'bottom',
        data: data.map((item) => item.name)
      },
      series: {
        radius: ['40%', '70%'],
        type: 'pie',
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
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

  useEffect(() => {
    getChartData()
  }, [data, title, themeStore.theme])

  return (
    <Stack {...rest}>
      <SvgChart ref={svgRef} />
    </Stack>
  )
})
export default PieChart

import SvgChart from '@wuba/react-native-echarts/svgChart'
import { memo, useEffect, useRef } from 'react'
import type { StackProps } from 'tamagui'
import { Stack } from 'tamagui'

import type { ECharts, ECOption } from '@/charts'
import echarts from '@/charts/charts'
import { useLangStore, useThemeStore } from '@/store'

interface Props extends StackProps {
  title?: string
  data?: any[]
  xAxis?: (number | string)[]
  series?: any
  width?: number | string
  height?: number | string
}

const BarChart = memo((props: Props) => {
  const { title, data = [], width = 200, height = 200, ...rest } = props
  const svgRef = useRef<any>(null)
  const chart = useRef<ECharts | null>(null)
  const themeStore = useThemeStore()
  const langStore = useLangStore()

  useEffect(() => {
    initChart()
    return () => chart.current?.dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: props.xAxis
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: props.series
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
export default BarChart

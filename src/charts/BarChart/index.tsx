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

const BarChart = memo((props: Props) => {
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
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28'
          ]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Email',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [
            120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134,
            90, 230, 210, 120, 132, 101, 134, 90, 230, 210
          ]
        },
        {
          name: 'Union Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [
            220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191,
            234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310
          ]
        },
        {
          name: 'Video Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [
            -150, -232, -201, -154, -190, 330, 410, 220, 182, 191, 234, 290, 330, 310, 220, 182,
            191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310
          ]
        },
        {
          name: 'Email',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          color: '#343434',
          data: [
            -120, -132, -101, -134, -90, -230, -210, 220, 182, 191, 234, 290, 330, 310, 220, 182,
            191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310
          ]
        }
      ]
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

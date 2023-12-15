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

const GaugeChart = memo((props: Props) => {
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
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 40
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [
            {
              value: 20,
              name: 'Perfect',
              title: {
                offsetCenter: ['0%', '-30%']
              },
              detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '-20%']
              }
            }
          ],
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
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
export default GaugeChart

import SvgChart from '@wuba/react-native-echarts/svgChart'
import { memo, useEffect, useRef } from 'react'
import type { StackProps } from 'tamagui'
import { Stack } from 'tamagui'

import type { ECharts, ECOption } from '@/charts'
import echarts from '@/charts/charts'
import { globalStyles } from '@/constants'
import { useLangStore, useThemeStore } from '@/store'

interface Props extends StackProps {
  percentage?: number
}

const ProgressRing = memo((props: Props) => {
  const { percentage, ...rest } = props
  const svgRef = useRef<any>(null)
  const chart = useRef<ECharts | null>(null)
  const themeStore = useThemeStore()
  const langStore = useLangStore()

  useEffect(() => {
    initChart()
    return () => chart.current?.dispose()
  }, [])

  useEffect(() => {
    getChartData()
  }, [percentage, themeStore.theme])

  function initChart() {
    chart.current = echarts.init(svgRef.current!, themeStore.theme, {
      renderer: 'svg',
      width: 200,
      height: 250,
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
          radius: '100%',
          pointer: {
            show: false
          },
          animationDurationUpdate: 2000,
          animationDuration: 2000,
          color: globalStyles.successColor,
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1
            }
          },
          axisLine: {
            lineStyle: {
              width: 20
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          data: [
            {
              value: percentage
            }
          ],
          title: {
            show: false
          },
          detail: {
            show: false
          }
        }
      ]
    }
    chart.current!.setOption(option)
  }

  return (
    <Stack {...rest}>
      <SvgChart ref={svgRef} />
    </Stack>
  )
})
export default ProgressRing

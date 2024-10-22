import { SVGRenderer } from '@wuba/react-native-echarts/svgChart'
import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  PieSeriesOption
} from 'echarts/charts'
import { BarChart, GaugeChart, LineChart, PieChart } from 'echarts/charts'
import type {
  AxisPointerComponentOption,
  DatasetComponentOption,
  DataZoomComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from 'echarts/components'
import {
  AxisPointerComponent,
  DatasetComponent,
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'

import darkTheme from './dark.json'
import lightTheme from './light.json'

export interface BaseChartItem {
  name: string
  value: number
}

// 通过 ComposeOption 来组合组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | AxisPointerComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | DataZoomComponentOption
>

export type ECharts = echarts.ECharts

echarts.use([
  SVGRenderer,
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  AxisPointerComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent,
  GraphicComponent,
  LabelLayout,
  UniversalTransition
])
echarts.registerTheme('light', lightTheme)
echarts.registerTheme('dark', darkTheme)
export default echarts

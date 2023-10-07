import { BarChart } from 'react-native-gifted-charts'
import type { stackItemType } from 'react-native-gifted-charts/src/BarChart/RenderStackBars'

interface Props {
  data?: stackItemType[]
}

export default function StackChartArea(props: Props): React.JSX.Element | null {
  if (!props.data || props.data.length === 0) return null
  return (
    <BarChart
      stackData={props.data}
      maxValue={25}
      mostNegativeValue={-10}
      height={120}
      barWidth={5}
      spacing={2}
      barBorderRadius={4}
      yAxisThickness={0}
      xAxisThickness={0}
      showFractionalValues
      isAnimated
      animationDuration={1000}
    />
  )
}

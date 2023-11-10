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
      maxValue={36}
      noOfSections={6}
      height={120}
      stepValue={6}
      barWidth={6}
      spacing={5}
      barBorderRadius={2}
      yAxisThickness={0}
      xAxisThickness={0}
      showFractionalValues
      isAnimated={false}
      animationDuration={300}
    />
  )
}

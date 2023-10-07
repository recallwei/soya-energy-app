import Svg, { Circle, Path } from 'react-native-svg'
import { Square } from 'tamagui'

function Item1() {
  return (
    <Square
      height={160}
      width={160}
    >
      <Svg
        width="100%"
        height="100%"
      >
        <Path
          d="M80 0 V70"
          stroke="#578e31"
          strokeWidth="2"
        />
        <Path
          d="M80 70 L150 70 M140 65 L150 70 L140 75"
          stroke="#578e31"
          strokeWidth="2"
          fill="none"
        />
        <Circle
          cx={80}
          cy={70}
          r={6}
          fill="#f49a23"
        />
      </Svg>
    </Square>
  )
}

const LineSVG = {
  Item1
}

export default LineSVG

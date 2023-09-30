import { Dimensions } from 'react-native'
import { Svg, Path } from 'react-native-svg'

function Item1() {
  const width = (Dimensions.get('window').width / 8) * 2.5
  return (
    <Svg
      width={width}
      height="60"
    >
      <Path
        d={`M${width / 4} 0 V30`}
        stroke="#333333"
        strokeWidth="2"
      />
      <Path
        d={`M${width / 4} 30 H${width - 10}`}
        stroke="#333333"
        strokeWidth="2"
      />
      <Path
        d={`M${width - 10} 30 V60`}
        stroke="#333333"
        strokeWidth="2"
      />
      <Path
        d={`M${width - 10} 60 L${width - 15} 50 M${width - 10} 60 L${
          width - 5
        } 50`}
        stroke="#333333"
        strokeWidth="2"
      />
    </Svg>
  )
}

function Item2() {
  const width = Dimensions.get('window').width / 8
  return (
    <Svg
      width={width}
      height="60"
    >
      <Path
        d={`M${width / 2} 0 V60`}
        stroke="#578e31"
        strokeWidth="2"
      />
      <Path
        d={`M${width / 2} 60 L${width / 2 - 5} 50 M${width / 2} 60 L${
          width / 2 + 5
        } 50`}
        stroke="#578e31"
        strokeWidth="2"
      />
    </Svg>
  )
}

function Item3() {
  const width = (Dimensions.get('window').width / 8) * 2.5
  return (
    <Svg
      width={width}
      height="60"
    >
      <Path
        d={`M${(width / 4) * 3} 0 V30`}
        stroke="#946121"
        strokeWidth="2"
      />
      <Path
        d={`M${(width / 4) * 3} 30 H10`}
        stroke="#946121"
        strokeWidth="2"
      />
      <Path
        d="M10 30 V60"
        stroke="#946121"
        strokeWidth="2"
      />
      <Path
        d="M10 60 L5 50 M10 60 L15 50"
        stroke="#946121"
        strokeWidth="2"
      />
    </Svg>
  )
}

function Item4() {
  const width = (Dimensions.get('window').width / 8) * 2.5

  return (
    <Svg
      width={width}
      height="50"
    >
      <Path
        d={`M${width - 2} 0 V25`}
        stroke="#578e31"
        strokeWidth="2"
      />
      <Path
        d={`M${width - 2} 25 H20`}
        stroke="#578e31"
        strokeWidth="2"
      />
      <Path
        d="M20 25 V50"
        stroke="#578e31"
        strokeWidth="2"
      />
      <Path
        d="M20 50 L15 40 M20 50 L25 40"
        stroke="#578e31"
        strokeWidth="2"
      />
    </Svg>
  )
}

function Item5() {
  const width = Dimensions.get('window').width / 20
  return (
    <Svg
      width={width}
      height="50"
    >
      <Path
        d={`M${width / 2} 0 V50`}
        stroke="#578e31"
        strokeWidth="2"
      />
      <Path
        d={`M${width / 2} 50 L${width / 2 - 5} 40 M${width / 2} 50 L${
          width / 2 + 5
        } 40`}
        stroke="#578e31"
        strokeWidth="2"
      />
    </Svg>
  )
}

function Item6() {
  const width = (Dimensions.get('window').width / 8) * 2.5
  return (
    <Svg
      width={width}
      height="50"
    >
      <Path
        d="M2 0 V25"
        stroke="#578e31"
        strokeWidth="2"
      />
      <Path
        d={`M2 25 H${width - 20}`}
        stroke="#578e31"
        strokeWidth="2"
      />
      <Path
        d={`M${width - 20} 25 V50`}
        stroke="#578e31"
        strokeWidth="2"
      />
      <Path
        d={`M${width - 20} 50 L${width - 25} 40 M${width - 20} 50 L${
          width - 15
        } 40`}
        stroke="#578e31"
        strokeWidth="2"
      />
    </Svg>
  )
}

export const LineArrowSVG = {
  Item1,
  Item2,
  Item3,
  Item4,
  Item5,
  Item6
}

import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

export default function SVGComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M3 6h3V3H3v3m5-3v3h3V3H8m5 0v3h3V3h-3m5 0v3h3V3h-3m3 5h-3v3h3V8m0 5h-3v3h3v-3m-5 3v-3h-3v3h3m-5 0v-3H8v3h3m-5 0v-3H3v3h3m-3-5h3V8H3v3m10-3v3h3V8h-3M8 8v3h3V8H8M3 1h18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-6v3h3v2h-5v-5h-2v5H6v-2h3v-3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Z"
      />
    </Svg>
  )
}

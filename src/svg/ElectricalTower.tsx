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
        d="m8.28 5.45-1.78-.9L7.76 2h8.47l1.27 2.55-1.78.89L15 4H9l-.72 1.45M18.62 8h-4.53l-.79-3h-2.6l-.79 3H5.38L4.1 10.55l1.79.89.73-1.44h10.76l.72 1.45 1.79-.89L18.62 8m-.85 14H15.7l-.24-.9L12 15.9l-3.47 5.2-.23.9H6.23l2.89-11h2.07l-.36 1.35L12 14.1l1.16-1.75-.35-1.35h2.07l2.89 11m-6.37-7-.9-1.35-1.18 4.48L11.4 15m3.28 3.12-1.18-4.48-.9 1.36 2.08 3.12Z"
      />
    </Svg>
  )
}

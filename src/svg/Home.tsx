import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

export default function SVGComponent(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M240 208h-16v-92.45a16 16 0 0 0-5.17-11.78l-80-75.48a1.14 1.14 0 0 1-.11-.11 16 16 0 0 0-21.53 0l-.11.11-79.91 75.48A16 16 0 0 0 32 115.55V208H16a8 8 0 0 0 0 16h224a8 8 0 0 0 0-16ZM48 115.55l.11-.1L128 40l79.9 75.43.11.1V208H160v-48a16 16 0 0 0-16-16h-32a16 16 0 0 0-16 16v48H48ZM144 208h-32v-48h32Z"
      />
    </Svg>
  )
}

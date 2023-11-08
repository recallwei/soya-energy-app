import type { PropsWithChildren } from 'react'
import { Text, View, XStack } from 'tamagui'

function Cell({
  children,
  width,
  height
}: PropsWithChildren<{ width: string; height: number | string }>) {
  return (
    <View
      width={width}
      height={height}
      backgroundColor="#dddddd"
      justifyContent="center"
      alignItems="center"
      borderWidth={0.2}
      borderColor="#333333"
    >
      <Text fontFamily="$body">{children}</Text>
    </View>
  )
}

interface Props {
  data?: string[][]
  height?: number
}

export default function Table(props: Props): React.JSX.Element | null {
  if (!props.data || props.data.length === 0) return null
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      {props.data?.map((row, rowIndex) => (
        <XStack key={rowIndex}>
          {row?.map((item, itemIndex) => (
            <Cell
              key={itemIndex}
              width={`${100 / row.length}%`}
              height={props.height ?? 40}
            >
              {item}
            </Cell>
          ))}
        </XStack>
      ))}
    </View>
  )
}

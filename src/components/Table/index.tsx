import { memo, type PropsWithChildren } from 'react'
import { Label, View, XStack } from 'tamagui'

const Cell = memo(
  ({ children, width, height }: PropsWithChildren<{ width: string; height: number | string }>) => (
    <View
      width={width}
      height={height}
      backgroundColor="#dddddd"
      justifyContent="center"
      alignItems="center"
      borderWidth={0.2}
      borderColor="#333333"
    >
      <Label>{children}</Label>
    </View>
  )
)

interface Props {
  data?: string[][]
  height?: number
}

const Table = memo((props: Props) => {
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
})

export default Table

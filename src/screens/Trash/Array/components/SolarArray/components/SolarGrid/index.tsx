import type { PropsWithChildren } from 'react'
import { Label, View } from 'tamagui'

interface Props {
  width?: string | number
  height?: string | number
  text?: string
}

function Row(props: PropsWithChildren) {
  return (
    <View
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      width="auto"
      space={1}
    >
      {props.children}
    </View>
  )
}

function Box({ height }: { height: string | number | undefined }) {
  return (
    <View
      backgroundColor="#0078d7"
      width="19%"
      height={height}
      opacity={0.75}
    />
  )
}

export default function SolarGrid(props: PropsWithChildren<Props>) {
  return (
    <View
      opacity={0.75}
      backgroundColor="#dddddd"
      width={props.width}
      animation="bouncy"
      position="relative"
      gap={1}
      borderRadius={4}
      overflow="hidden"
      pressStyle={{ scale: 1.1, opacity: 1 }}
    >
      <Row>
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
      </Row>
      <Row>
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
      </Row>
      <Row>
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
      </Row>
      <Row>
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
        <Box height={props.height} />
      </Row>
      <View
        position="absolute"
        opacity={1}
        left={0}
        top={0}
        bottom={0}
        right={0}
        justifyContent="center"
        alignItems="center"
      >
        <Label color="white">{props.text}</Label>
      </View>
    </View>
  )
}

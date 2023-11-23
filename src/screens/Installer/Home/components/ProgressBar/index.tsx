import { View } from 'tamagui'

export default function ProgressBar() {
  return (
    <View
      flexDirection="row"
      height={6}
      width="100%"
      borderRadius={5}
      overflow="hidden"
    >
      <View
        flex={30}
        backgroundColor="green"
      />
      <View
        flex={20}
        backgroundColor="red"
      />
      <View
        flex={20}
        backgroundColor="orange"
      />
      <View
        flex={20}
        backgroundColor="gray"
      />
    </View>
  )
}

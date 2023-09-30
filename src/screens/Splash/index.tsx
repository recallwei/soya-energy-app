import { SafeAreaView } from 'react-native'
import { YStack, Spinner } from 'tamagui'

export default function SplashScreen(): React.JSX.Element {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff'
      }}
    >
      <YStack
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          color="#333333"
          size="large"
        />
      </YStack>
    </SafeAreaView>
  )
}

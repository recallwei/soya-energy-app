import { Dimensions, SafeAreaView } from 'react-native'
import { Image, Spinner, View, YStack } from 'tamagui'

export default function SplashScreen(): React.JSX.Element {
  const { width } = Dimensions.get('screen')

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
        <View
          width="100%"
          justifyContent="center"
        >
          <Spinner
            color="#333333"
            size="large"
          />
          <Image
            source={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, global-require
              uri: require('../../../assets/images/soya-logo.png')
            }}
            width={width * 0.8}
            height={100}
            position="absolute"
            top={-140}
            alignSelf="center"
          />
        </View>
      </YStack>
    </SafeAreaView>
  )
}

import { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StatusBar } from 'react-native'
import { Image, Progress, Spinner, View, YStack } from 'tamagui'

import { useThemeStore } from '@/store'

export default function SplashScreen(): React.JSX.Element {
  const { width } = Dimensions.get('screen')
  const themeStore = useThemeStore()

  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent === 100) {
          clearInterval(timer)
          return prevPercent
        }

        return prevPercent + 2
      })
    }, 100)

    const timeout = setTimeout(() => {
      setPercent(100)
      clearInterval(timer)
    }, 1200)

    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <SafeAreaView
      style={{
        backgroundColor: themeStore.isDark() ? '#333333' : '#ffffff'
      }}
    >
      <StatusBar
        animated
        backgroundColor={themeStore.isDark() ? '#333333' : '#ffffff'}
      />
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
            color={themeStore.isDark() ? '#ffffff' : '#333333'}
            size="large"
          />
          <Image
            source={{
              uri: themeStore.isDark()
                ? require('../../../assets/images/soya-logo-dark.png')
                : require('../../../assets/images/soya-logo-light.png'),
              cache: 'force-cache'
            }}
            width={width * 0.618}
            height={100}
            position="absolute"
            top={-140}
            alignSelf="center"
            resizeMode="contain"
          />
          <Progress
            size="$2"
            value={percent}
            width={width * 0.8}
            alignSelf="center"
            marginTop="$7"
          >
            <Progress.Indicator animation="bouncy" />
          </Progress>
        </View>
      </YStack>
    </SafeAreaView>
  )
}

import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { Image, Progress, Spinner, YStack } from 'tamagui'

import { useThemeStore } from '@/store'

export default function Screen() {
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
    <YStack
      backgroundColor={themeStore.getBgColor()}
      position="absolute"
      alignItems="center"
      justifyContent="center"
      top={0}
      bottom={0}
      left={0}
      right={0}
    >
      <Image
        source={{
          uri: themeStore.isDark()
            ? require('../../../../assets/images/soya-logo-dark.png')
            : require('../../../../assets/images/soya-logo-light.png'),
          cache: 'force-cache'
        }}
        width={width * 0.618}
        height={110}
        resizeMode="contain"
      />
      <Spinner
        color={themeStore.getTextColor()}
        size="large"
      />
      <Progress
        size="$2"
        value={percent}
        width={width * 0.8}
        alignSelf="center"
        marginTop="$7"
        marginBottom="$11"
      >
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </YStack>
  )
}

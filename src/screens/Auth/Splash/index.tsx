import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image, YStack } from 'tamagui'

import { LoadingProgress } from '@/components'
import { useAuthStore, useThemeStore } from '@/store'
import { DeviceUtils } from '@/utils'

export default function Screen() {
  const themeStore = useThemeStore()
  const authStore = useAuthStore()
  const insets = useSafeAreaInsets()

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
      paddingBottom={insets.bottom}
      paddingTop={insets.top}
      paddingRight={insets.right}
      paddingLeft={insets.left}
      marginBottom="28%"
    >
      <Image
        source={{
          uri: themeStore.isDark()
            ? require('../../../../assets/images/soya-logo-dark.png')
            : require('../../../../assets/images/soya-logo-light.png'),
          cache: 'force-cache'
        }}
        width={DeviceUtils.SCREEN_WIDTH * 0.618}
        height={110}
        resizeMode="contain"
      />
      <LoadingProgress
        value={authStore.downloadProgress}
        progressOpacity={authStore.downloadProgress > 0 ? 1 : 0}
      />
    </YStack>
  )
}

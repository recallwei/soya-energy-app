import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image, SizableText, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { globalEnvConfig } from '@/env'
import { useThemeStore } from '@/store'
import { CodePushUtils, DeviceUtils } from '@/utils'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const themeStore = useThemeStore()

  const handleUpgrade = () => CodePushUtils.syncCode()

  return (
    <YStack
      padding="$4"
      space="$2"
      paddingBottom={insets.bottom}
      height="100%"
    >
      <Image
        source={{
          uri: themeStore.isDark()
            ? require('../../../../../assets/images/soya-logo-dark.png')
            : require('../../../../../assets/images/soya-logo-light.png'),
          cache: 'force-cache'
        }}
        width={DeviceUtils.SCREEN_WIDTH * 0.618}
        height={110}
        resizeMode="contain"
        alignSelf="center"
      />

      <SizableText
        textAlign="center"
        size="$3"
        fontWeight="$semiBold"
        marginBottom="$3"
      >
        {`${globalEnvConfig.APP_ENVIRONMENT} - ${globalEnvConfig.APP_VERSION}`}
      </SizableText>

      <MenuItemCard title="Platform Usage Agreement" />
      <MenuItemCard title="Enterprise and other third-party privacy agreement" />
      <MenuItemCard title="Summary of Privacy Agreement" />
      <MenuItemCard
        title="Version update"
        onPress={handleUpgrade}
      />

      <SizableText
        position="absolute"
        alignSelf="center"
        textAlign="center"
        bottom={insets.bottom}
        size="$3"
      >
        Copyright All rights reserved Soya Energy，Ltd.
      </SizableText>
    </YStack>
  )
}

import { CacheManager } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { Image, Layers, PanelTop } from '@tamagui/lucide-icons'
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function Screen() {
  const insets = useSafeAreaInsets()
  const { navigate } = useNavigation()

  useEffect(() => {
    CacheManager.prefetch([
      'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-light.png',
      'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-dark.png'
    ])
  })

  return (
    <View
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack
        padding="$4"
        space="$3"
      >
        <MenuItemCard
          title="Demo"
          description="Page just for dev testing"
          icon={Layers}
          onPress={() => navigate('Demo')}
        />
        <MenuItemCard
          title="WebView Demo"
          description="WebView Demo for events page"
          icon={PanelTop}
          onPress={() => navigate('WebViewDemo')}
        />
        <MenuItemCard
          title="Image Cache Test"
          description="Test image cache"
          icon={Image}
          onPress={() => navigate('ImageCacheTest')}
        />
      </YStack>
    </View>
  )
}

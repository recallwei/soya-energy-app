import { CacheManager } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { Image, Layers, PanelTop } from '@tamagui/lucide-icons'
import { useEffect } from 'react'
import { YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function Screen() {
  const { navigate } = useNavigation()

  useEffect(() => {
    CacheManager.prefetch([
      'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-light.png',
      'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-dark.png'
    ])
  })

  return (
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
  )
}

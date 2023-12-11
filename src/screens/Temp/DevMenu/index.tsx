import { CacheManager } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { Image, ImagePlus, Layers, PanelTop } from '@tamagui/lucide-icons'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { MenuItemCard } from '@/components'

export default function Screen() {
  const { t } = useTranslation('Temp')
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
      space="$2"
    >
      <MenuItemCard
        title={t('Demo.Title')}
        description={t('Demo.Description')}
        icon={Layers}
        onPress={() => navigate('Temp.Demo')}
      />
      <MenuItemCard
        title={t('WebView.Demo.Title')}
        description={t('WebView.Demo.Description')}
        icon={PanelTop}
        onPress={() => navigate('Temp.WebView_Demo')}
      />
      <MenuItemCard
        title={t('Image.Cache.Test.Title')}
        description={t('Image.Cache.Test.Description')}
        icon={Image}
        onPress={() => navigate('Temp.Image_Cache_Test')}
      />
      <MenuItemCard
        title={t('Image.Picker.Title')}
        description={t('Image.Picker.Description')}
        icon={ImagePlus}
        onPress={() => navigate('Temp.Image_Picker')}
      />
    </YStack>
  )
}

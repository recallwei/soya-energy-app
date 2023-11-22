import { CacheManager } from '@georstat/react-native-image-cache'
import { useNavigation } from '@react-navigation/native'
import { Crown, Image, ImagePlus, Layers, PanelTop } from '@tamagui/lucide-icons'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { MenuItemCard } from '@/components'
import { UserRole } from '@/enums'
import { useAuthStore } from '@/store'
import { AuthUtils, ToastUtils } from '@/utils'

export default function Screen() {
  const { t } = useTranslation('Temp')
  const { navigate } = useNavigation()
  const authStore = useAuthStore()

  useEffect(() => {
    CacheManager.prefetch([
      'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-light.png',
      'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img/soya-logo-dark.png'
    ])
  })

  const handleChangeRole = () => {
    const targetRole =
      authStore.userRole === UserRole.INSTALLER ? UserRole.USER : UserRole.INSTALLER
    authStore.setUserRole(targetRole)
    AuthUtils.setRole(targetRole)

    ToastUtils.loading({
      message: t('Change.Role.Loading')
    })

    setTimeout(() => {
      if (targetRole === UserRole.INSTALLER) {
        navigate('Installer.Tabs', { screen: 'Installer.Home' })
      } else {
        navigate('User.Tabs', { screen: 'User.Home' })
      }
    }, 500)
  }

  return (
    <YStack
      padding="$4"
      space="$3"
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
      <MenuItemCard
        title={t('Change.Role.Title')}
        description={t('Change.Role.Description')}
        icon={Crown}
        onPress={handleChangeRole}
      />
    </YStack>
  )
}

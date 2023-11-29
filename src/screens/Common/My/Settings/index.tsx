import { useNavigation } from '@react-navigation/native'
import { Contact2, Languages, Palette, Power, Ruler, Trash2, XCircle } from '@tamagui/lucide-icons'
import { useAsyncEffect } from 'ahooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, YStack } from 'tamagui'

import type { SheetMenuListItem } from '@/components'
import { AlertDialog, MenuItemCard, SheetMenu } from '@/components'
import { globalStyles } from '@/constants'
import { useAuthStore, useLangStore, useThemeStore } from '@/store'
import { AuthUtils, CacheUtils, ThemeUtils, ToastUtils } from '@/utils'

export default function Screen() {
  const { t } = useTranslation('Common.My.Settings')
  const authStore = useAuthStore()
  const themeStore = useThemeStore()
  const langStore = useLangStore()

  const { navigate } = useNavigation()

  const [open, setOpen] = useState(false)
  const [cacheMB, setCacheMB] = useState('0B')

  useAsyncEffect(async () => {
    setCacheMB(await getCacheSize())
  }, [])

  const handleChangeLang = (lang: string) => {
    langStore.setLang(lang)
    setOpen(false)
  }

  const langList: SheetMenuListItem<string>[] = [
    {
      value: 'en-US',
      text: 'English',
      onPress: (value) => handleChangeLang(value.value!),
      color: langStore.lang === 'en-US' ? globalStyles.primaryColor : '$color'
    },
    {
      value: 'zh-CN',
      text: '简体中文',
      onPress: (value) => handleChangeLang(value.value!),
      color: langStore.lang === 'zh-CN' ? globalStyles.primaryColor : '$color'
    }
  ]

  function convertToMB(cacheNum: number) {
    if (!cacheNum) return '0 MB'
    if (cacheNum < 1024) return `${cacheNum}B`
    if (cacheNum < 1024 * 1024) return `${(cacheNum / 1024).toFixed(2)}KB`
    return `${(cacheNum / 1024 / 1024).toFixed(2)}M`
  }

  async function getCacheSize() {
    const result = await CacheUtils.getCacheSize()
    return convertToMB(result)
  }

  const handleClearCache = async () => {
    await CacheUtils.clearAll()
    setCacheMB('0B')
    ToastUtils.success({
      title: t('Clear.Cache.Success.Title'),
      message: t('Clear.Cache.Success.Message')
    })
  }

  const handleOpenLangSheet = () => {
    setOpen(true)
  }

  const handleChangeTheme = async () => {
    await ThemeUtils.setTheme(themeStore.isDark() ? 'light' : 'dark')
    themeStore.toggleTheme()
  }

  const logout = () => {
    authStore.logout()
    AuthUtils.removeToken()
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack
          padding="$4"
          space="$3"
        >
          <MenuItemCard
            title={t('Personal.Info.Title')}
            description={t('Personal.Info.Description')}
            icon={Contact2}
            onPress={() => navigate('Common.My.Settings.Personal_Info')}
          />
          <MenuItemCard
            title={t('Language.Title')}
            description={t('Language.Description')}
            icon={Languages}
            onPress={handleOpenLangSheet}
          />
          <MenuItemCard
            title={t('System.Units.Title')}
            description={t('System.Units.Description')}
            icon={Ruler}
            onPress={() => navigate('Common.My.Settings.System_Units')}
          />
          <AlertDialog
            title={t('Clear.Cache.Dialog.Title')}
            description={t('Clear.Cache.Dialog.Description')}
            onConfirm={handleClearCache}
          >
            <MenuItemCard
              title={t('Clear.Cache.Title')}
              description={t('Clear.Cache.Description') + cacheMB}
              icon={Trash2}
            />
          </AlertDialog>
          <MenuItemCard
            title={t('Cancel.Account.Title')}
            description={t('Cancel.Account.Description')}
            icon={XCircle}
            onPress={() => navigate('Common.My.Settings.Cancel_Account')}
          />
          <MenuItemCard
            title={t('Dark.Mode.Title')}
            description={t('Dark.Mode.Description')}
            icon={Palette}
            switcher
            switchValue={themeStore.isDark()}
            onSwitch={handleChangeTheme}
          />
          <MenuItemCard
            title={t('Sign.Out.Title')}
            description={t('Sign.Out.Description')}
            icon={Power}
            onPress={logout}
          />
        </YStack>
      </ScrollView>
      <SheetMenu
        open={open}
        setOpen={setOpen}
        data={langList}
      />
    </>
  )
}

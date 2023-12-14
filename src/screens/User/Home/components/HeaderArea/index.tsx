import { useNavigation } from '@react-navigation/native'
import { Activity, CheckCircle2, CloudSun } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { Button, SizableText, XStack, YStack } from 'tamagui'

import { useThemeStore } from '@/store'
import { SVG } from '@/svg'
import { TimeUtils } from '@/utils'

export default function HeaderArea() {
  const { t } = useTranslation('User.Home')
  const { navigate } = useNavigation()

  const themeStore = useThemeStore()

  const navToLiveStatus = () => navigate('User.Home.Live_Status')
  return (
    <YStack space="$2">
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack
          alignItems="center"
          columnGap="$4"
        >
          <XStack
            alignItems="center"
            columnGap="$1.5"
          >
            <CheckCircle2
              color="green"
              size="$1"
            />
            <SizableText size="$3">Normal</SizableText>
          </XStack>

          <XStack
            alignItems="center"
            columnGap="$1.5"
          >
            <SVG.ElectricalTower
              width={20}
              color={themeStore.isDark() ? '#ffffff' : '#333333'}
            />
            <SizableText size="$3">On grid</SizableText>
          </XStack>
        </XStack>

        <XStack
          alignItems="center"
          columnGap="$1.5"
        >
          <CloudSun
            color={themeStore.isDark() ? '#ffffff' : '#333333'}
            size="$1"
          />
          <SizableText size="$3">26°C</SizableText>
        </XStack>
      </XStack>

      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <SizableText size="$3">
          {`${TimeUtils.formatTime(Date.now(), 'YYYY-MM-DD')} ${t('Time.Updated.Min.Ago', {
            num: '13'
          })}`}
        </SizableText>
        <Button
          size="$2"
          backgroundColor={themeStore.isDark() ? '#dddddd20' : '#dfdfdf80'}
          color={themeStore.isDark() ? '#ffffff' : '#333333'}
          icon={<Activity />}
          onPress={navToLiveStatus}
        >
          {t('Live.Status')}
        </Button>
      </XStack>
    </YStack>
  )
}

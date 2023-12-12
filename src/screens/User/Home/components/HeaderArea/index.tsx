import { useNavigation } from '@react-navigation/native'
import { Activity, CheckCircle2, CloudSun } from '@tamagui/lucide-icons'
import { Button, SizableText, XStack, YStack } from 'tamagui'

import { useThemeStore } from '@/store'
import { SVG } from '@/svg'

export default function HeaderArea() {
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
            <CheckCircle2 color="green" />
            <SizableText>Normal</SizableText>
          </XStack>

          <XStack
            alignItems="center"
            columnGap="$1.5"
          >
            <SVG.ElectricalTower color={themeStore.isDark() ? '#ffffff' : '#333333'} />
            <SizableText>On grid</SizableText>
          </XStack>
        </XStack>

        <XStack
          alignItems="center"
          columnGap="$1.5"
        >
          <CloudSun color={themeStore.isDark() ? '#ffffff' : '#333333'} />
          <SizableText>26°C</SizableText>
        </XStack>
      </XStack>

      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <SizableText>2023-09-20 updated 12min ago</SizableText>
        <Button
          size="$2"
          backgroundColor={themeStore.isDark() ? '#dddddd20' : '#dfdfdf80'}
          color={themeStore.isDark() ? '#ffffff' : '#333333'}
          icon={<Activity />}
          onPress={navToLiveStatus}
        >
          Live Status
        </Button>
      </XStack>
    </YStack>
  )
}

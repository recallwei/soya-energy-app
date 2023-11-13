import { useNavigation } from '@react-navigation/native'
import { Activity, CheckCircle2, CloudSun } from '@tamagui/lucide-icons'
import { Button, Label, XStack, YStack } from 'tamagui'

import { useThemeStore } from '@/store'
import { SVG } from '@/svg'

export default function HeaderArea() {
  const navigation = useNavigation()

  const themeStore = useThemeStore()

  const navToLiveStatus = () => navigation.navigate('LiveStatus')
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
            <Label>Normal</Label>
          </XStack>

          <XStack
            alignItems="center"
            columnGap="$1.5"
          >
            <SVG.ElectricalTower color={themeStore.isDark() ? '#ffffff' : '#333333'} />
            <Label>On grid</Label>
          </XStack>
        </XStack>

        <XStack
          alignItems="center"
          columnGap="$1.5"
        >
          <CloudSun color={themeStore.isDark() ? '#ffffff' : '#333333'} />
          <Label>26°C</Label>
        </XStack>
      </XStack>

      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <Label>2023-09-20 updated 12min ago</Label>
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

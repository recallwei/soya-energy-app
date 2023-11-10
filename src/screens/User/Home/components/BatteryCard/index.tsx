import { useNavigation } from '@react-navigation/native'
import { Cog } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import { Label, Separator, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { useThemeStore } from '@/store'
import { SVG } from '@/svg'

export default function BatteryCard(): React.JSX.Element {
  const { navigate } = useNavigation()
  const themeStore = useThemeStore()
  const [batteryLevel, setBatteryLevel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(Math.floor(Math.random() * 5 + 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getBatteryIconByLevel = () => {
    switch (batteryLevel) {
      case 4:
        return (
          <SVG.BatteryVerticalFull
            color={themeStore.isDark() ? '#ffffff' : '#333333'}
            width={44}
            height={44}
          />
        )
      case 3:
        return (
          <SVG.BatteryVerticalHigh
            color={themeStore.isDark() ? '#ffffff' : '#333333'}
            width={44}
            height={44}
          />
        )
      case 2:
        return (
          <SVG.BatteryVerticalMedium
            color={themeStore.isDark() ? '#ffffff' : '#333333'}
            width={44}
            height={44}
          />
        )
      case 1:
        return (
          <SVG.BatteryVerticalLow
            color={themeStore.isDark() ? '#ffffff' : '#333333'}
            width={44}
            height={44}
          />
        )
      case 0:
      default:
        return (
          <SVG.BatteryVerticalEmpty
            color={themeStore.isDark() ? '#ffffff' : '#333333'}
            width={44}
            height={44}
          />
        )
    }
  }

  return (
    <Card>
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack
          alignItems="center"
          columnGap="$2"
        >
          <Pressable onPress={() => setBatteryLevel(Math.floor(Math.random() * 5 + 0))}>
            {getBatteryIconByLevel()}
          </Pressable>

          <YStack rowGap="$2">
            <Label>Charge</Label>
            <XStack columnGap="$2">
              <Label>88%</Label>
              <Label>(7hr 50min)</Label>
            </XStack>
          </YStack>
        </XStack>

        <Separator
          alignSelf="stretch"
          vertical
        />

        <TouchableOpacity onPress={() => navigate('SettingsBattery')}>
          <XStack>
            <YStack rowGap="$2">
              <XStack
                alignItems="center"
                columnGap="$1.5"
              >
                <Label>Profile</Label>
                <Cog size="$1" />
              </XStack>
              <Label>self-consumption</Label>
            </YStack>
          </XStack>
        </TouchableOpacity>
      </XStack>
    </Card>
  )
}

import { useNavigation } from '@react-navigation/native'
import { Cog } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import { Separator, Text, XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
import { SVG } from '@/svg'

export default function BatteryCard(): React.JSX.Element {
  const { navigate } = useNavigation()
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
            color="#333333"
            width={44}
            height={44}
          />
        )
      case 3:
        return (
          <SVG.BatteryVerticalHigh
            color="#333333"
            width={44}
            height={44}
          />
        )
      case 2:
        return (
          <SVG.BatteryVerticalMedium
            color="#333333"
            width={44}
            height={44}
          />
        )
      case 1:
        return (
          <SVG.BatteryVerticalLow
            color="#333333"
            width={44}
            height={44}
          />
        )
      case 0:
      default:
        return (
          <SVG.BatteryVerticalEmpty
            color="#333333"
            width={44}
            height={44}
          />
        )
    }
  }

  return (
    <SCard>
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
            <Text>Charge</Text>
            <XStack columnGap="$2">
              <Text>88%</Text>
              <Text>(7hr 50min)</Text>
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
                <Text>Profile</Text>
                <Cog size="$1" />
              </XStack>
              <Text>self-consumption</Text>
            </YStack>
          </XStack>
        </TouchableOpacity>
      </XStack>
    </SCard>
  )
}

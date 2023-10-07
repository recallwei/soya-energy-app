import { Cog } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { Card, Separator, Text, XStack, YStack } from 'tamagui'

import { SVG } from '@/svg'

export default function BatteryCard(): React.JSX.Element {
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
    <Card
      size="$4"
      bordered
      animation="bouncy"
      width="100%"
      height="auto"
      pressStyle={{ scale: 0.95 }}
    >
      <Card.Header padded>
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <XStack
            alignItems="center"
            columnGap="$2"
          >
            <Pressable
              onPress={() => setBatteryLevel(Math.floor(Math.random() * 5 + 0))}
            >
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

          <XStack onPress={() => {}}>
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
        </XStack>
      </Card.Header>
    </Card>
  )
}

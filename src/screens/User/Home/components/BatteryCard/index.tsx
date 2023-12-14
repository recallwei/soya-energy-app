import { useNavigation } from '@react-navigation/native'
import { Cog } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, TouchableOpacity } from 'react-native'
import { Separator, SizableText, XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { useThemeStore } from '@/store'
import { SVG } from '@/svg'

export default function BatteryCard() {
  const { t } = useTranslation('User.Home')
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
    const svgProps = {
      color: themeStore.isDark() ? '#ffffff' : '#333333',
      width: 40,
      height: 40
    }
    switch (batteryLevel) {
      case 4:
        return <SVG.BatteryVerticalFull {...svgProps} />
      case 3:
        return <SVG.BatteryVerticalHigh {...svgProps} />
      case 2:
        return <SVG.BatteryVerticalMedium {...svgProps} />
      case 1:
        return <SVG.BatteryVerticalLow {...svgProps} />
      case 0:
      default:
        return <SVG.BatteryVerticalEmpty {...svgProps} />
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

          <YStack rowGap="$1">
            <SizableText size="$3">{t('Charge')}</SizableText>
            <XStack columnGap="$2">
              <SizableText size="$3">88%</SizableText>
              <SizableText size="$3">(7hr 50min)</SizableText>
            </XStack>
          </YStack>
        </XStack>

        <Separator
          alignSelf="stretch"
          vertical
        />

        <TouchableOpacity onPress={() => navigate('User.Battery')}>
          <XStack>
            <YStack rowGap="$1">
              <XStack
                alignItems="center"
                columnGap="$1.5"
              >
                <SizableText size="$3">{t('Profile')}</SizableText>
                <Cog size="$1" />
              </XStack>
              <SizableText size="$3">{t('Self.Consumption')}</SizableText>
            </YStack>
          </XStack>
        </TouchableOpacity>
      </XStack>
    </Card>
  )
}

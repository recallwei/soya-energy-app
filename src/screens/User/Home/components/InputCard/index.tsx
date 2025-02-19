import { BatteryMedium } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'

import { Card } from '@/components'
import { useThemeStore } from '@/store'
import { SVG } from '@/svg'

import InputCardStatisticItem from '../InputCardStatisticItem'
import { LineArrowSVG } from '../SVG'

export default function InputCard() {
  const themeStore = useThemeStore()
  return (
    <Card>
      <YStack rowGap="$3">
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <InputCardStatisticItem
            borderColor={themeStore.isDark() ? '#ffffff' : '#333333'}
            icon={<SVG.ElectricalTower color={themeStore.isDark() ? '#ffffff' : '#333333'} />}
            iconText="3.5 kWh"
            bottomText="Grid"
          />

          <InputCardStatisticItem
            borderColor="#578e31"
            icon={
              <SVG.SolarPanel
                color={themeStore.isDark() ? '#ffffff' : '#333333'}
                width={20}
              />
            }
            iconText="38.4 kWh"
            bottomText="Solar"
          />

          <InputCardStatisticItem
            borderColor="#946121"
            icon={
              <BatteryMedium
                color={themeStore.isDark() ? '#ffffff' : '#333333'}
                size={20}
              />
            }
            iconText="2 kWh"
            bottomText="Battery"
          />
        </XStack>

        <XStack justifyContent="center">
          <LineArrowSVG.Item1 />
          <LineArrowSVG.Item2 />
          <LineArrowSVG.Item3 />
        </XStack>

        <InputCardStatisticItem
          size="large"
          borderColor="#578e31"
          icon={
            <SVG.Home
              color={themeStore.isDark() ? '#ffffff' : '#333333'}
              width={45}
              height={45}
            />
          }
          iconText="29.4 kWh"
          bottomText="Consumed"
        />
      </YStack>
    </Card>
  )
}

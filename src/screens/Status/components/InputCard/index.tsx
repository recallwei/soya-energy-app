import { BatteryMedium } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
import { SVG } from '@/svg'

import InputCardStatisticItem from '../InputCardStatisticItem'
import { LineArrowSVG } from '../SVG'

export default function InputCard(): React.JSX.Element {
  return (
    <SCard>
      <YStack rowGap="$3">
        <XStack
          alignItems="center"
          justifyContent="space-between"
        >
          <InputCardStatisticItem
            icon={<SVG.ElectricalTower color="#333333" />}
            iconText="3.5 kWh"
            bottomText="Grid"
          />

          <InputCardStatisticItem
            borderColor="#578e31"
            icon={
              <SVG.SolarPanel
                color="#333333"
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
                color="#333333"
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
              color="#333333"
              width={45}
              height={45}
            />
          }
          iconText="29.4 kWh"
          bottomText="Consumed"
        />
      </YStack>
    </SCard>
  )
}

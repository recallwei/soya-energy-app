import { BatteryMedium, Home } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'

import { SCard } from '@/components'
import { SVG } from '@/svg'

import OutputCardStatisticItem from '../OutputCardStatisticItem'
import { LineArrowSVG } from '../SVG'

export default function OutputCard(): React.JSX.Element {
  return (
    <SCard>
      <YStack
        alignItems="center"
        rowGap="$3"
      >
        <OutputCardStatisticItem
          textPosition="right"
          icon={
            <SVG.SolarPanel
              color="#333333"
              width={25}
              height={25}
            />
          }
          text="38.4 kWh"
        />

        <XStack justifyContent="center">
          <LineArrowSVG.Item4 />
          <LineArrowSVG.Item5 />
          <LineArrowSVG.Item6 />
        </XStack>

        <XStack
          justifyContent="space-between"
          columnGap="$10"
        >
          <OutputCardStatisticItem
            icon={
              <Home
                color="#333333"
                size={25}
              />
            }
            text="25.9 kWh"
          />

          <OutputCardStatisticItem
            icon={
              <SVG.ElectricalTower
                color="#333333"
                width={25}
                height={25}
              />
            }
            text="0.25 kWh"
          />

          <OutputCardStatisticItem
            icon={
              <BatteryMedium
                color="#333333"
                size={25}
              />
            }
            text="1.32 kWh"
          />
        </XStack>
      </YStack>
    </SCard>
  )
}
import { Label, Separator, XStack } from 'tamagui'

import { SCard } from '@/components'
import { SVG } from '@/svg'

export default function TotalCard(): React.JSX.Element {
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
          <SVG.Lightning color="#f7d94b" />
          <Label>38.40</Label>
          <Label>kWh</Label>
        </XStack>

        <Separator
          alignSelf="stretch"
          vertical
          marginHorizontal={15}
        />

        <XStack
          alignItems="center"
          columnGap="$2"
        >
          <SVG.Leaf color="green" />
          <Label>25.60</Label>
          <Label>kg CO₂</Label>
        </XStack>
      </XStack>
    </SCard>
  )
}

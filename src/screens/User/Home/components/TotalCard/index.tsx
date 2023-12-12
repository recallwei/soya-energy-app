import { Separator, SizableText, XStack } from 'tamagui'

import { Card } from '@/components'
import { SVG } from '@/svg'

export default function TotalCard() {
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
          <SVG.Lightning color="#f7d94b" />
          <SizableText>38.40</SizableText>
          <SizableText>kWh</SizableText>
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
          <SizableText>25.60</SizableText>
          <SizableText>kg CO₂</SizableText>
        </XStack>
      </XStack>
    </Card>
  )
}

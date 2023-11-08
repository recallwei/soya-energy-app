import { Separator, Text, XStack } from 'tamagui'

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
          <Text
            fontFamily="$body"
            fontWeight="bold"
          >
            38.40
          </Text>
          <Text fontFamily="$body">kWh</Text>
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
          <Text
            fontFamily="$body"
            fontWeight="bold"
          >
            25.60
          </Text>
          <Text fontFamily="$body">kg CO₂</Text>
        </XStack>
      </XStack>
    </SCard>
  )
}

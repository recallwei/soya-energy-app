import { useNavigation } from '@react-navigation/native'
import { XStack, Text, Button } from 'tamagui'
import { CheckCircle2, CloudSun, Activity } from '@tamagui/lucide-icons'

import { SVG } from '@/svg'

export default function HeaderArea(): React.JSX.Element {
  const navigation = useNavigation()
  return (
    <>
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack
          alignItems="center"
          columnGap="$4"
        >
          <XStack
            alignItems="center"
            columnGap="$1.5"
          >
            <CheckCircle2 color="green" />
            <Text>Normal</Text>
          </XStack>

          <XStack
            alignItems="center"
            columnGap="$1.5"
          >
            <SVG.ElectricalTower color="#333333" />
            <Text>On grid</Text>
          </XStack>
        </XStack>

        <XStack
          alignItems="center"
          columnGap="$1.5"
        >
          <CloudSun color="#333333" />
          <Text>26°C</Text>
        </XStack>
      </XStack>

      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>2023-09-20 updated 12min ago</Text>
        <Button
          size="$2"
          icon={<Activity />}
          onPress={() => navigation.navigate('LiveStatus')}
        >
          Live Status
        </Button>
      </XStack>
    </>
  )
}

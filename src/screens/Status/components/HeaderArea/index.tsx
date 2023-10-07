import { useNavigation } from '@react-navigation/native'
import { Activity, CheckCircle2, CloudSun } from '@tamagui/lucide-icons'
import { Button, Text, XStack, YStack } from 'tamagui'

import { SVG } from '@/svg'

export default function HeaderArea(): React.JSX.Element {
  const navigation = useNavigation()

  const navToLiveStatus = () => navigation.navigate('LiveStatus')
  return (
    <YStack space="$2">
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
          backgroundColor="#dddddd"
          icon={<Activity />}
          onPress={navToLiveStatus}
        >
          Live Status
        </Button>
      </XStack>
    </YStack>
  )
}

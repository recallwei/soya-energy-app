import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { Button, Text, YStack } from 'tamagui'

import { SRatioGroup } from '@/components'

export default function NEMScreen(): React.JSX.Element {
  const { goBack } = useNavigation()

  return (
    <SafeAreaView>
      <YStack
        padding="$4"
        space="$3"
        justifyContent="space-between"
        height="100%"
      >
        <YStack space="$3">
          <YStack space="$3">
            <Text>Your electricity rate has peak and off-peak charges?</Text>
            <SRatioGroup
              data={[
                { label: 'Yes', value: '1' },
                { label: 'No', value: '0' }
              ]}
            />
          </YStack>
        </YStack>

        <Button
          onPress={() => goBack()}
          marginTop="$2"
        >
          Save
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

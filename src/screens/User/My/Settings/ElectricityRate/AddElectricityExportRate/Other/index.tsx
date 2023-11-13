import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Text, View, YStack } from 'tamagui'

import { RadioGroup } from '@/components'

export default function OtherScreen() {
  const insets = useSafeAreaInsets()
  const { goBack } = useNavigation()

  return (
    <View
      height="100%"
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <YStack
        padding="$4"
        space="$3"
        justifyContent="space-between"
      >
        <YStack space="$3">
          <YStack space="$3">
            <Text fontFamily="$body">
              Your electricity payout rate has peak and off-peak changes?
            </Text>
            <RadioGroup
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
    </View>
  )
}

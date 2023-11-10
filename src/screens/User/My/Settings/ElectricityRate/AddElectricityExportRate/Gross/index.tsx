import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Input, Separator, Text, View, YStack } from 'tamagui'

import { Card } from '@/components'

export default function GrossScreen(): React.JSX.Element {
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
            <Text fontFamily="$body">Electricity Payout Rate Structure: Gross FIT</Text>
            <Text fontFamily="$body">Fixed Electricity payout rate that does not vary</Text>

            <Separator />

            <Card>
              <YStack space="$3">
                <Text
                  fontFamily="$body"
                  fontWeight="500"
                >
                  What is your payout rate per unit of solar energy generated?
                </Text>

                <YStack space="$2">
                  <Text fontFamily="$body">Payout Rate($/kWh)</Text>
                  <Input
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                    placeholder=""
                  />
                </YStack>
              </YStack>
            </Card>
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

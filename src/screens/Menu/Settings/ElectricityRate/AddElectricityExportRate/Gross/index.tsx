import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { Button, Input, Separator, Text, YStack } from 'tamagui'

import { SCard } from '@/components'

export default function GrossScreen(): React.JSX.Element {
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
            <Text>Electricity Payout Rate Structure: Gross FIT</Text>
            <Text fontSize="$4">
              Fixed Electricity payout rate that does not vary
            </Text>

            <Separator />

            <SCard>
              <YStack space="$3">
                <Text
                  fontSize="$4"
                  fontWeight="500"
                >
                  What is your payout rate per unit of solar energy generated?
                </Text>

                <YStack space="$2">
                  <Text>Payout Rate($/kWh)</Text>
                  <Input
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                    placeholder=""
                  />
                </YStack>
              </YStack>
            </SCard>
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

import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { Button, Input, Paragraph, Separator, Text, YStack } from 'tamagui'

export default function AutofillScreen(): React.JSX.Element {
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
          <Text
            fontFamily="$body"
            fontWeight="500"
          >
            Zipcode: 94538
          </Text>

          <Separator />

          <YStack space="$2">
            <Text fontFamily="$body">Utility Name</Text>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
              placeholder=""
            />
          </YStack>

          <YStack space="$2">
            <Text fontFamily="$body">Tariff Name / Code</Text>
            <Input
              autoCapitalize="none"
              clearButtonMode="while-editing"
              placeholder=""
            />
          </YStack>

          <YStack gap="$2">
            <Text fontFamily="$body">Note:</Text>
            <Paragraph>
              In case of difficulty in finding Tariff Name/Code, kindly contact your Utility
              Provider for details.
            </Paragraph>
          </YStack>
        </YStack>

        <Button
          onPress={() => goBack()}
          marginTop="$2"
        >
          Update
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

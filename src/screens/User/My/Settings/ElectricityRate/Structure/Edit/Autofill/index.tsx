import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Input, Paragraph, Separator, Text, View, YStack } from 'tamagui'

export default function AutofillScreen() {
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
    </View>
  )
}

import { RefreshControl, TouchableOpacity } from 'react-native'
import { Paragraph, ScrollView, Separator, Switch, Text, XStack, YStack } from 'tamagui'

import { useRefresh } from '@/hooks'

export default function CurrencyScreen(): React.JSX.Element {
  const { refreshing, onRefresh } = useRefresh()

  return (
    <ScrollView
      minHeight="100%"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <YStack
        padding="$4"
        space="$3"
        marginBottom="$10"
      >
        <XStack
          justifyContent="space-between"
          alignItems="center"
        >
          <YStack space="$2">
            <Text
              fontSize="$5"
              fontWeight="bold"
            >
              Show Currency Equivalent
            </Text>
            <Paragraph>Disable to hide currency equivalent metric</Paragraph>
          </YStack>
          <Switch size="$3">
            <Switch.Thumb
              animation="quick"
              backgroundColor="#0078d7"
            />
          </Switch>
        </XStack>

        <Separator />

        <YStack space="$2">
          <Text
            fontSize="$5"
            fontWeight="bold"
          >
            Currency Conversion Factor
          </Text>
          <Paragraph>
            Energy data is converted to their currency equivalent value by multiplying them with the
            currency conversion factor.
          </Paragraph>
        </YStack>

        <XStack
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <YStack space="$2">
            <Text fontWeight="bold">Conversion Factor</Text>
            <Text color="#0078d7">0.9 $/kWh</Text>
          </YStack>
          <TouchableOpacity onPress={() => {}}>
            <Text color="#0078d7">Edit</Text>
          </TouchableOpacity>
        </XStack>

        <Separator />

        <Paragraph fontSize="$3">
          Note: The reported currency value is indicative and does not include taxes, fixed charges,
          etc.
        </Paragraph>
      </YStack>
    </ScrollView>
  )
}

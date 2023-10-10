import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { RefreshControl, TouchableOpacity } from 'react-native'
import { Button, Input, ScrollView, Separator, Text, YStack } from 'tamagui'

import { SCheckbox, SRatioGroup } from '@/components'
import { useRefresh } from '@/hooks'

export default function MyInfoScreen(): React.JSX.Element {
  const { t } = useTranslation(['Global', 'Auth'])

  const { refreshing, onRefresh } = useRefresh()

  const { goBack } = useNavigation()

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
        <Text
          fontSize="$6"
          fontWeight="bold"
          marginVertical="$2"
        >
          Personal Information
        </Text>
        <YStack space="$2">
          <Text>{t('Auth:SignupScreen.Input.FirstName')}</Text>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder=""
          />
        </YStack>
        <YStack space="$2">
          <Text>{t('Auth:SignupScreen.Input.LastName')}</Text>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder=""
          />
        </YStack>
        <YStack space="$2">
          <Text>{t('Auth:SignupScreen.Input.Country')}</Text>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder=""
          />
        </YStack>
        <YStack space="$2">
          <Text>{t('Auth:SignupScreen.Input.EmailAddress')}</Text>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder=""
          />
        </YStack>
        <YStack
          space="$2"
          marginBottom="$3"
        >
          <Text>{t('Auth:SignupScreen.Input.PhoneNumber')}</Text>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder=""
          />
        </YStack>

        <Separator />

        <TouchableOpacity onPress={() => {}}>
          <Text color="#0078d7">Change Password</Text>
        </TouchableOpacity>

        <Separator />

        <YStack space="$2">
          <Text>Units:</Text>
          <SRatioGroup
            data={[
              { label: 'O Metric(°C)', value: 'O' },
              { label: 'F Imperial(°F)', value: 'F' }
            ]}
            onValueChange={() => {}}
          />
        </YStack>

        <Separator />

        <YStack space="$2">
          <Text>Languages</Text>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder=""
          />
        </YStack>
        <Button>Save Change</Button>

        <Separator />

        <Text
          fontSize="$6"
          fontWeight="bold"
          marginVertical="$2"
        >
          System Information for Demo
        </Text>

        <YStack space="$2">
          <Text>System Weather</Text>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder=""
          />
        </YStack>

        <SCheckbox
          label="Show weather features for this site"
          onCheckedChange={() => {}}
        />

        <Button>Save</Button>

        <Separator />

        <Text
          fontSize="$6"
          fontWeight="bold"
          marginVertical="$2"
        >
          System Preference
        </Text>

        <YStack space="$2">
          <Text>Name</Text>
          <Input
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder=""
          />
        </YStack>

        <Separator />

        <YStack space="$2">
          <Text>Public System Page:</Text>
          <SCheckbox
            label="Create a public page for my system"
            onCheckedChange={() => {}}
          />
          <Text>
            This will enable social sharing features and allow visitors to your
            system.
          </Text>
        </YStack>

        <Separator />

        <YStack space="$2">
          <Text>Display system name as:</Text>
          <SRatioGroup
            data={[
              { label: 'Demo', value: '0' },
              { label: 'Residential System', value: '1' }
            ]}
            onValueChange={() => {}}
          />
        </YStack>

        <Button onPress={() => goBack()}>Save System Preferences</Button>
      </YStack>
    </ScrollView>
  )
}

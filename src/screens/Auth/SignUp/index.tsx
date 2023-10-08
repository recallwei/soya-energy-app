import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, ScrollView, Spinner, Text, YStack } from 'tamagui'

import { SCheckbox, SRatioGroup } from '@/components'
import { useAuthStore } from '@/store'

export default function SignUpScreen(): React.JSX.Element {
  const { t } = useTranslation(['Global', 'Auth'])

  const ratioGroupData = [
    {
      label: t('Auth:SignupScreen.Ratio.ForCompany'),
      value: '0'
    },
    {
      label: t('Auth:SignupScreen.Ratio.ForIndividual'),
      value: '1'
    },
    {
      label: t('Global:Others'),
      value: '2'
    }
  ]

  const authStore = useAuthStore()

  const [formData, setFormData] = useState({
    source: '',
    installation: false,
    privacy: false
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: typeof formData) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data)
        }, 1000)
      }),
    // AuthAPI.signup()
    onSuccess: (data) => {
      console.log(data)
      authStore.login()
    },
    onError: (error) => {
      console.log(error)
      authStore.login()
    }
  })

  const handleRatioGroupChange = (value: string) =>
    setFormData((val) => ({ ...val, source: value }))

  const handleChangeInstallation = (value: boolean) =>
    setFormData((val) => ({ ...val, installation: value }))

  const handleChangePrivacy = (value: boolean) =>
    setFormData((val) => ({ ...val, privacy: value }))

  const handleSignup = () => {
    mutate(formData)
  }

  return (
    <ScrollView>
      <YStack
        padding="$4"
        space="$3"
      >
        <Text
          fontSize="$6"
          fontWeight="bold"
          marginVertical="$2"
        >
          {t('Auth:SignupScreen.PersonalInfo')}
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

        <SRatioGroup
          value={formData.source}
          data={ratioGroupData}
          onValueChange={handleRatioGroupChange}
        />

        {formData.source === '0' && (
          <YStack
            space="$3"
            marginVertical="$3"
          >
            <Text
              fontSize="$6"
              fontWeight="bold"
              marginVertical="$2"
            >
              {t('Auth:SignupScreen.CompanyInfo')}{' '}
            </Text>

            <YStack space="$2">
              <Text>{t('Auth:SignupScreen.Input.CompanyName')}</Text>
              <Input
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholder=""
              />
            </YStack>

            <YStack space="$2">
              <Text>{t('Auth:SignupScreen.Input.StreetAddress')}</Text>
              <Input
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholder=""
              />
            </YStack>

            <YStack space="$2">
              <Text>{t('Auth:SignupScreen.Input.StreetAddressOptional')}</Text>
              <Input
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholder=""
              />
            </YStack>

            <YStack space="$2">
              <Text>{t('Auth:SignupScreen.Input.City')}</Text>
              <Input
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholder=""
              />
            </YStack>
          </YStack>
        )}

        <SCheckbox
          label={t('Auth:SignupScreen.Checkbox.Installation')}
          checked={formData.installation}
          onCheckedChange={handleChangeInstallation}
        />
        <SCheckbox
          label={t('Auth:SignupScreen.Checkbox.Privacy')}
          checked={formData.privacy}
          onCheckedChange={handleChangePrivacy}
        />

        <Button
          marginVertical="$8"
          width="100%"
          onPress={handleSignup}
          disabled={isLoading}
          icon={isLoading ? <Spinner /> : undefined}
        >
          {t('Global:Submit')}
        </Button>
      </YStack>
    </ScrollView>
  )
}

import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Button, Input, Label, YStack } from 'tamagui'

export default function ForgotPasswordScreen() {
  const { t } = useTranslation(['Auth', 'Global'])

  const { navigate } = useNavigation()

  const handleSubmit = () => navigate('Auth.Login')

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <YStack space="$2">
        <Label>{t('Email.Text')}</Label>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Email.Placeholder')}
        />
      </YStack>

      <YStack space="$2">
        <Label>{t('Verification.Code.Text')}</Label>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Verification.Code.Placeholder')}
        />
      </YStack>

      <YStack space="$2">
        <Label>{t('New.Password.Text')}</Label>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('New.Password.Placeholder')}
        />
      </YStack>

      <YStack space="$2">
        <Label>{t('Confirm.Password.Text')}</Label>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Confirm.Password.Placeholder')}
        />
      </YStack>

      <Button
        width="100%"
        marginTop="$4"
        onPress={handleSubmit}
      >
        {t('Global:Submit')}
      </Button>
    </YStack>
  )
}

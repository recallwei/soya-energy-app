import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Button, Input, Label, YStack } from 'tamagui'

export default function ForgotPasswordScreen() {
  const { t } = useTranslation(['Global', 'Auth'])

  const { navigate } = useNavigation()

  const handleSubmit = () => {
    navigate('Auth.Login')
  }

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <YStack space="$2">
        <Label>{t('Auth:Account.Text')}</Label>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder=""
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

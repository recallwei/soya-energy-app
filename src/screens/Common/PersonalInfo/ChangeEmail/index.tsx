import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { Button, Input, SizableText, YStack } from 'tamagui'

export default function ForgotPasswordScreen() {
  const { t } = useTranslation(['Auth', 'Global', 'Validation'])

  const { navigate } = useNavigation()

  const handleSubmit = () => navigate('Common.My.Personal_Info')

  return (
    <YStack
      padding="$4"
      space="$3"
      position="relative"
      height="100%"
    >
      <YStack>
        <SizableText>{t('New.Password')}</SizableText>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Validation:New.Password.Not.Null')}
        />
      </YStack>

      <YStack>
        <SizableText>{t('New.Password')}</SizableText>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Validation:New.Password.Not.Null')}
        />
      </YStack>

      <YStack>
        <SizableText>{t('Confirm.Password')}</SizableText>
        <Input
          autoCapitalize="none"
          clearButtonMode="while-editing"
          placeholder={t('Validation:Confirm.Password.Not.Null')}
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

import { useTranslation } from 'react-i18next'
import { Label } from 'tamagui'

export default function InProgress() {
  const { t } = useTranslation(['Global'])
  return (
    <Label
      textAlign="center"
      paddingVertical="$4"
    >
      {t('Global:StillInDevelopment')}
    </Label>
  )
}

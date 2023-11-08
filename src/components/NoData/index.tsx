import { useTranslation } from 'react-i18next'
import { Label } from 'tamagui'

export default function NoData() {
  const { t } = useTranslation(['Global'])
  return (
    <Label
      textAlign="center"
      paddingVertical="$4"
    >
      {t('Global:NoData')}
    </Label>
  )
}

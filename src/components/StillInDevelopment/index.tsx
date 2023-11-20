import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Label } from 'tamagui'

const InProgress = memo(() => {
  const { t } = useTranslation('Global')
  return (
    <Label
      textAlign="center"
      paddingVertical="$4"
    >
      {t('Still.In.Development')}
    </Label>
  )
})

export default InProgress

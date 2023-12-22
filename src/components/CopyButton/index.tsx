import Clipboard from '@react-native-clipboard/clipboard'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ButtonProps } from 'tamagui'
import { Button } from 'tamagui'

import { ToastUtils } from '@/utils'

interface Props extends ButtonProps {
  copyText?: string
}

const CopyButton = memo((props: Props) => {
  const { t } = useTranslation()
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { onPress, copyText, ...rest } = props

  const copyToClipboard = () => {
    if (!copyText) return
    Clipboard.setString(copyText ?? '')
    ToastUtils.success({ message: t('Copy.Success') })
  }

  return (
    <Button
      size="$2"
      onPress={() => copyToClipboard()}
      {...rest}
    >
      {t('Copy')}
    </Button>
  )
})
export default CopyButton

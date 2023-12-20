import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { EmailAPI } from '@/api'
import type { SendEmailType } from '@/enums'
import { ToastUtils } from '@/utils'

export const useSendEmailCodeMutation = (type: SendEmailType) => {
  const { t } = useTranslation()

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) =>
      EmailAPI.sendCode({
        email,
        type
      }),
    onSuccess: () => ToastUtils.success({ message: t('Send.Success') })
  })

  return {
    handleSendEmailCode: (email: string) => mutate(email),
    isSendEmailCodeLoading: isPending
  }
}

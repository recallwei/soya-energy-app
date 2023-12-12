import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { AuthAPI } from '@/api'
import type { ChangePasswordInputModel } from '@/types'
import { ToastUtils } from '@/utils'

interface Props {
  handleResetForm: () => void
}
export const useChangePasswordMutation = (props: Props) => {
  const { goBack } = useNavigation()
  const { t } = useTranslation()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ChangePasswordInputModel) => AuthAPI.changePassword(data),
    onSuccess: () => {
      goBack()
      ToastUtils.success({ message: t('Operate.Success') })
    },
    onError: () => props.handleResetForm()
  })

  const handleChangePassword = (data: ChangePasswordInputModel) => {
    mutate(data)
  }

  return {
    isPending,
    handleChangePassword
  }
}

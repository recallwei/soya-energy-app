import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import CryptoJS from 'crypto-js'
import { useTranslation } from 'react-i18next'

import { AuthAPI } from '@/api'
import type { ForgotPasswordInputModel } from '@/types'
import { ToastUtils } from '@/utils'

import type { ForgotPasswordForm } from '../types'

export const useForgotPasswordMutation = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPasswordInputModel) =>
      AuthAPI.forgotPassword({
        ...data,
        password: CryptoJS.MD5(data.password).toString()
      }),
    onSuccess: () => {
      navigate('Auth.Login')
      ToastUtils.success({ title: t('Operate.Success') })
    }
  })

  return {
    handleForgotPassword: (data: ForgotPasswordForm) => mutate({ ...data }),
    isForgotPasswordLoading: isPending
  }
}

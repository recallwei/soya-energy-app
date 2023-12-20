import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import CryptoJS from 'crypto-js'
import { useTranslation } from 'react-i18next'

import { AuthAPI } from '@/api'
import { SignupType } from '@/enums'
import { ToastUtils } from '@/utils'

import type { SignUpForm } from '../types'

export const useSignupMutation = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpForm) =>
      AuthAPI.signup({
        ...data,
        password: CryptoJS.MD5(data.password).toString(),
        type: SignupType.Self
      }),
    onSuccess: () => {
      navigate('Auth.Login')
      ToastUtils.success({ title: t('Signup.Success') })
    }
  })

  return {
    handleSignup: (data: SignUpForm) => mutate(data),
    isSignupLoading: isPending
  }
}

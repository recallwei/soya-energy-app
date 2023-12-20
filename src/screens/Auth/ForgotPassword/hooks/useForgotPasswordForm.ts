import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitErrorHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { ToastUtils } from '@/utils'

import { forgotPasswordSchema } from '../constants'
import type { ForgotPasswordForm } from '../types'

export const useForgotPasswordForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      emailCode: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSubmitError: SubmitErrorHandler<ForgotPasswordForm> = (errs) => {
    const message = Object.values(errs).map((item) => item.message)[0]
    if (message) {
      ToastUtils.error({ message })
    }
  }

  return {
    control,
    handleSubmit,
    handleSubmitError,
    getEmail: () => getValues('email'),
    errors
  }
}

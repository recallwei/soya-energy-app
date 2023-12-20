import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitErrorHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { ToastUtils } from '@/utils'

import { signupSchema } from '../constants'
import type { SignUpForm } from '../types'

export const useSignupForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<SignUpForm>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      account: '',
      password: '',
      confirmPassword: '',
      email: '',
      emailCode: '',
      country: '',
      timezone: ''
    }
  })

  const handleSubmitError: SubmitErrorHandler<SignUpForm> = (errs) => {
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

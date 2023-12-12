import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitErrorHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { ToastUtils } from '@/utils'

import { changePasswordSchema } from '../constants'
import type { ChangePasswordForm } from '../types'

export const useChangePasswordForm = () => {
  const { control, handleSubmit, reset } = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const handleResetForm = () => reset()

  const handleSubmitError: SubmitErrorHandler<ChangePasswordForm> = (errs) => {
    const message = Object.values(errs).map((item) => item.message)[0]
    if (message) {
      ToastUtils.error({ message })
    }
  }

  return { control, handleResetForm, handleSubmit, handleSubmitError }
}

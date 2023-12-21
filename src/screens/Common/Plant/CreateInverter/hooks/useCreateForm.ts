import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitErrorHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { ToastUtils } from '@/utils'

import { createInverterSchema } from '../constants'
import type { CreateInverterForm } from '../types'

export const useCreateForm = () => {
  const { control, handleSubmit, reset, getValues } = useForm<CreateInverterForm>({
    resolver: yupResolver(createInverterSchema),
    defaultValues: {
      deviceSN: '',
      deviceAlias: '',
      deviceComponentPower: ''
    }
  })

  const handleResetForm = () => reset()

  const handleSubmitError: SubmitErrorHandler<CreateInverterForm> = (errs) => {
    const message = Object.values(errs).map((item) => item.message)[0]
    if (message) {
      ToastUtils.error({ message })
    }
  }

  return { control, handleResetForm, handleSubmit, handleSubmitError, getValues }
}

import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitErrorHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { ToastUtils } from '@/utils'

import { editInverterSchema } from '../constants'
import type { EditInverterForm } from '../types'

export const useEditForm = () => {
  const { control, handleSubmit, reset } = useForm<EditInverterForm>({
    resolver: yupResolver(editInverterSchema),
    defaultValues: {
      deviceAlias: '',
      deviceComponentPower: ''
    }
  })

  const handleResetForm = () => reset()

  const handleSubmitError: SubmitErrorHandler<EditInverterForm> = (errs) => {
    const message = Object.values(errs).map((item) => item.message)[0]
    if (message) {
      ToastUtils.error({ message })
    }
  }

  return { control, handleResetForm, handleSubmit, handleSubmitError }
}

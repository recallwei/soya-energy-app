import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitErrorHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { ToastUtils } from '@/utils'

import { createPlantSchema } from '../constants'
import type { CreatePlantForm } from '../types'

export const useCreateForm = () => {
  const { control, handleSubmit, reset, getValues } = useForm<CreatePlantForm>({
    resolver: yupResolver(createPlantSchema),
    defaultValues: {
      plantName: '',
      systemPower: '',
      country: '',
      timeZone: '',
      address: '',
      type: '',
      moduleNum: '',
      pvPanelAzimuth: '',
      pvPanelAngle: ''
    }
  })

  const handleResetForm = () => reset()

  const handleSubmitError: SubmitErrorHandler<CreatePlantForm> = (errs) => {
    const message = Object.values(errs).map((item) => item.message)[0]
    if (message) {
      ToastUtils.error({ message })
    }
  }

  return { control, handleResetForm, handleSubmit, handleSubmitError, getValues }
}

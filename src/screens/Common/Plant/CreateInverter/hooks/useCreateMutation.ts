import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { InverterAPI } from '@/api'
import type { InverterCreateModel } from '@/types'
import { ToastUtils } from '@/utils'

export const useCreateMutation = () => {
  const { goBack } = useNavigation()
  const { t } = useTranslation()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: InverterCreateModel) => InverterAPI.create(data),
    onSuccess: () => {
      goBack()
      ToastUtils.success({ message: t('Operate.Success') })
    }
  })

  const handleCreateMutate = (data: InverterCreateModel) => mutate(data)

  return {
    isPending,
    handleCreateMutate
  }
}

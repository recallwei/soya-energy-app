import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { PlantAPI } from '@/api'
import type { CreatePlantModel } from '@/types'
import { ToastUtils } from '@/utils'

export const useCreateMutation = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreatePlantModel) =>
      data.userId ? PlantAPI.createProxy(data) : PlantAPI.create(data),
    onSuccess: () => {
      ToastUtils.success({ message: t('Create.Success') })
      navigate('Installer.Home')
    }
  })

  const handleCreatePlant = (data: CreatePlantModel) => {
    mutate(data)
  }

  return { handleCreatePlant, isCreateLoading: isPending }
}

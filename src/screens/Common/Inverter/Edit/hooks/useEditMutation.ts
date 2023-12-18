import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { InverterAPI } from '@/api'
import type { InverterEditModel } from '@/types'
import { ToastUtils } from '@/utils'

interface Props {
  handleResetForm: () => void
}
export const useEditMutation = (props: Props) => {
  const { goBack } = useNavigation()
  const { t } = useTranslation()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: InverterEditModel) => InverterAPI.edit(data),
    onSuccess: () => {
      goBack()
      ToastUtils.success({ message: t('Operate.Success') })
    },
    onError: () => props.handleResetForm()
  })

  const handleEditMutate = (data: InverterEditModel) => mutate(data)

  return {
    isPending,
    handleEditMutate
  }
}

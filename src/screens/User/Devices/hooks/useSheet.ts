import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { useImmer } from 'use-immer'

import { InverterAPI } from '@/api'
import type { SheetMenuListItem } from '@/components'
import { ToastUtils } from '@/utils'

export const useSheet = () => {
  const { t } = useTranslation(['Installer.Management', 'Global'])
  const { navigate } = useNavigation()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [currentId, setCurrentId] = useImmer<null | string>(null)

  const { mutate } = useMutation({
    mutationFn: () => InverterAPI.remove(currentId!),
    onSuccess: () => ToastUtils.success({ message: t('Global:Delete.Success') })
  })

  const sheetMenuData: SheetMenuListItem[] = [
    {
      text: () => t('Inverter.Menu.Edit'),
      onPress: () => {
        if (currentId) {
          navigate('Common.Inverter.Edit', {
            id: currentId
          })
        }
      }
    },
    {
      text: () => t('Inverter.Menu.Delete'),
      onPress: () => {
        Alert.alert(
          t('Global:Confirm.Dialog.Default.CancelText'),
          t('Global:Confirm.Dialog.Default.Description'),
          [
            {
              text: t('Global:Confirm.Dialog.Default.CancelText'),
              style: 'cancel'
            },
            {
              text: t('Global:Confirm.Dialog.Default.ConfirmText'),
              onPress: () => mutate()
            }
          ]
        )
      }
    }
  ]

  const handleOpenSheet = (id: string) => {
    setCurrentId(id)
    setSheetOpen(true)
  }

  return {
    sheetOpen,
    setSheetOpen,
    sheetMenuData,
    handleOpenSheet
  }
}

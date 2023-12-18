import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'

import type { SheetMenuListItem } from '@/components'

export const useSheet = () => {
  const { t } = useTranslation('Installer.Management')
  const { navigate } = useNavigation()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [currentId, setCurrentId] = useImmer<null | string>(null)

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
    }
    // { text: () => t('Inverter.Menu.Delete'), onPress: () => {} }
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

import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'

import type { SheetMenuListItem } from '@/components'

export const usePlantSheet = () => {
  const { t } = useTranslation('Installer.Management')
  const { navigate } = useNavigation()
  const [plantSheetOpen, setPlantSheetOpen] = useState(false)
  const [currentId, setCurrentId] = useImmer<null | string>(null)

  const plantSheetMenuData: SheetMenuListItem[] = [
    {
      text: () => t('Plant.Menu.Edit'),
      onPress: () => {
        if (currentId) {
          navigate('Common.Plant.Edit', {
            id: currentId
          })
        }
      }
    },
    { text: () => t('Plant.Menu.EV.Charger'), onPress: () => {} },
    { text: () => t('Plant.Menu.Mobile.Storage'), onPress: () => {} },
    { text: () => t('Plant.Menu.Map'), onPress: () => {} },
    { text: () => t('Plant.Menu.Delete'), onPress: () => {} }
  ]

  const handleOpenPlantSheet = (id: string) => {
    setCurrentId(id)
    setPlantSheetOpen(true)
  }

  return {
    plantSheetOpen,
    setPlantSheetOpen,
    plantSheetMenuData,
    handleOpenPlantSheet
  }
}

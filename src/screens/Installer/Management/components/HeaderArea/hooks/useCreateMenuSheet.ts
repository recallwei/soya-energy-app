import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { SheetMenuListItem } from '@/components'

export const useCreateMenuSheet = () => {
  const { t } = useTranslation('Installer.Management')
  const { navigate } = useNavigation()
  const [createSheetOpen, setCreateSheetOpen] = useState(false)

  const createSheetMenuData: SheetMenuListItem[] = [
    {
      text: t('Create.Plant.For.Me'),
      onPress: () => navigate('Common.Plant.Create.Inverter', {})
    },
    {
      text: t('Create.Plant.For.Owner'),
      onPress: () => navigate('Common.Plant.Customers')
    }
  ]

  const handleOpenCreateSheet = () => setCreateSheetOpen(!createSheetOpen)

  return { createSheetOpen, setCreateSheetOpen, createSheetMenuData, handleOpenCreateSheet }
}

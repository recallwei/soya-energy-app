import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { SheetMenuListItem } from '@/components'

export const useCreateMenuSheet = () => {
  const { t } = useTranslation('Installer.Management')
  const [createSheetOpen, setCreateSheetOpen] = useState(false)

  const createSheetMenuData: SheetMenuListItem[] = [
    {
      text: t('Create.Plant.For.Me'),
      onPress: () => {}
    },
    {
      text: t('Create.Plant.For.Owner'),
      onPress: () => {}
    }
  ]

  const handleOpenCreateSheet = () => setCreateSheetOpen(!createSheetOpen)

  return { createSheetOpen, setCreateSheetOpen, createSheetMenuData, handleOpenCreateSheet }
}

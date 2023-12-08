import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ManagementTab } from '../../../enums'

export const useSearchText = () => {
  const { t } = useTranslation('Installer.Management')
  const [searchText, setSearchText] = useState('')

  const getInputPlaceholder = (currentTab: ManagementTab) => {
    switch (currentTab) {
      case ManagementTab.Plant:
        return t('Plant.SearchText.Placeholder')
      case ManagementTab.Inverter:
        return t('Inverter.SearchText.Placeholder')
      case ManagementTab.Battery:
        return t('Battery.SearchText.Placeholder')
      default:
        return ''
    }
  }

  return { searchText, setSearchText, getInputPlaceholder }
}

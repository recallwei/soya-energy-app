import i18n from '@/i18n'

import { ManagementTab } from '../../../enums'

const tFunc = i18n.getFixedT(null, 'Installer.Management')

export const tabList = [
  { text: () => tFunc('Plant'), value: ManagementTab.Plant },
  { text: () => tFunc('Inverter'), value: ManagementTab.Inverter },
  { text: () => tFunc('Battery'), value: ManagementTab.Battery }
]

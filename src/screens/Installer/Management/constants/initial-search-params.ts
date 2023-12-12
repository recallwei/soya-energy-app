import { PlantOrderby } from '../enums'

const DEFAULT_TAB_STATUS = '0'
export const initialSearchParams = {
  keywords: '',
  status: DEFAULT_TAB_STATUS,
  order: PlantOrderby.Latest_Installation_Date,
  displayRange: '',
  loadingMonitoring: '',
  plantType: '',
  systemPowerMin: '',
  systemPowerMax: '',
  others: '',
  inverterType: '',
  ratePowerMax: '',
  ratePowerMin: '',
  batteryType: ''
}

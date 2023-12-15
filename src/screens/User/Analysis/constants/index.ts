import { globalStyles } from '@/constants'

export const PieChartColors = {
  energy: {
    selfConsumption: globalStyles.primaryColor,
    exportEnergy: '#3498DB'
  },
  energyConsumption: {
    selfSufficiency: '#ABEBC6',
    importEnergy: globalStyles.warningColor
  }
}

export const StackChartColors = {
  pvPower: globalStyles.primaryColor,
  loadPower: globalStyles.warningColor,
  enablePower: '#004469',
  enableBattery: '#0078d7'
}

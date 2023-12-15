import i18n from '@/i18n'

const t = i18n.getFixedT(null, 'User.Analysis')

export const pieChartData1 = [
  {
    name: t('Self.Consumption'),
    value: 244
  },
  {
    name: t('Export.Energy'),
    value: 123
  }
]

export const pieChartData2 = [
  {
    name: t('Self.Sufficiency'),
    value: 77
  },
  {
    name: t('Import.Energy'),
    value: 45
  }
]

export const stackChartData = [
  {
    name: t('Self.Consumption'),
    value: 244
  },
  {
    name: t('Export.Energy'),
    value: 123
  },
  {
    name: t('Self.Sufficiency'),
    value: 77
  },
  {
    name: t('Import.Energy'),
    value: 45
  }
]

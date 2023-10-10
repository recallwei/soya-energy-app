export const getMockStackChartData = () => {
  const dataCount = 40
  return Array.from({ length: dataCount }, () => ({
    stacks: [
      {
        value: Math.floor(Math.random() * 10),
        color: '#0078d7'
      },
      {
        value: Math.floor(Math.random() * 20),
        color: '#f59a23'
      }
    ]
  }))
}

export const getMockPieChartData = (color1: string, color2: string) => {
  const firstValue = Math.floor(Math.random() * 10000) / 100
  const secondValue = Math.floor(Math.random() * 10000) / 100
  const dataArray: {
    value: number
    color: string
    label: string
    percentage: number
  }[] = [
    {
      value: firstValue,
      percentage: firstValue,
      color: color1,
      label: Math.random().toString(36).substring(7)
    },
    {
      value: secondValue,
      percentage: secondValue,
      color: color2,
      label: Math.random().toString(36).substring(7)
    }
  ]
  const totalValue = dataArray.reduce((sum, obj) => sum + obj.value, 0)
  return dataArray.map((obj) => ({
    ...obj,
    text: `${((obj.value / totalValue) * 100).toFixed()}%`
  }))
}

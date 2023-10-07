const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`

export const getMockBarChartData = () => {
  const dataCount = Math.floor(Math.random() * 10) + 5
  return Array.from({ length: dataCount }, () => ({
    value: Math.floor(Math.random() * 100),
    label: Math.random().toString(36).substring(7),
    frontColor: generateRandomColor()
  }))
}

export const getMockLineChartData = () => {
  const dataCount = Math.floor(Math.random() * 10) + 5
  return Array.from({ length: dataCount }, () => ({
    value: Math.floor(Math.random() * 100),
    label: Math.random().toString(36).substring(7)
  }))
}

export const getMockPieChartData = () => {
  const dataCount = 5
  const dataArray: { value: number; color: string; label: string }[] =
    Array.from({ length: dataCount }, () => ({
      value: Math.floor(Math.random() * 100),
      color: generateRandomColor(),
      label: Math.random().toString(36).substring(7)
    }))
  const totalValue = dataArray.reduce((sum, obj) => sum + obj.value, 0)
  return dataArray.map((obj) => ({
    ...obj,
    text: `${((obj.value / totalValue) * 100).toFixed()}%`
  }))
}

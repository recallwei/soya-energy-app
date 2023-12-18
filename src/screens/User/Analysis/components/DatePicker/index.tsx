import type { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { memo, useState } from 'react'
import { Button, View } from 'tamagui'

const DatePicker = memo(() => {
  const [date, setDate] = useState<Date>(new Date())
  const [mode, setMode] = useState<'date' | 'time'>('date')
  const [show, setShow] = useState(false)

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate || date)
  }

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatePicker = () => {
    showMode('date')
  }

  const showTimePicker = () => {
    showMode('time')
  }

  return (
    <View>
      <Button
        onPress={() => {
          showDatePicker()
          showTimePicker()
        }}
      >
        显示
      </Button>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour
          onChange={onChange}
        />
      )}
    </View>
  )
})
export default DatePicker

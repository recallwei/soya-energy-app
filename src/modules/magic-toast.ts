import { NativeModules } from 'react-native'

const { MagicToastModule } = NativeModules
export default MagicToastModule as CalendarInterface

interface CalendarInterface {
  hello(name: string, callback: (result: string) => void): void
}

import AsyncStorage from '@react-native-async-storage/async-storage'

import { globalEnvConfig } from '@/env'

/* eslint-disable no-console */
export class LoggerUtils {
  static printEnv() {
    console.log('----------------------- Env -----------------------')
    console.log(globalEnvConfig)
    console.log('')
  }

  static async printStorage() {
    console.log('------------------- Async Store -------------------')
    const storage = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys())
    storage.forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
    })
    console.log('')
  }
}

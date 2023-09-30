import { config } from '@tamagui/config'
import { createTamagui } from 'tamagui'

const appConfig = createTamagui(config)

export type AppConfig = typeof appConfig

declare module 'tamagui' {
  type TamaguiCustomConfig = AppConfig
}

export default appConfig

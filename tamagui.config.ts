import { config } from '@tamagui/config/v2'
import { createFont, createTamagui } from 'tamagui'

const primaryFontFamily = 'Nunito'

const notoSansFont = createFont({
  family: primaryFontFamily,
  size: {
    '1': 11,
    '2': 12,
    '3': 13,
    '4': 14,
    '5': 16,
    '6': 18,
    '7': 20,
    '8': 23,
    '9': 30,
    '10': 46,
    '11': 55,
    '12': 62,
    '13': 72,
    '14': 92,
    '15': 114,
    '16': 134,
    true: 16
  },
  lineHeight: {
    '1': 16,
    '2': 21,
    '3': 22,
    '4': 23,
    '5': 26,
    '6': 28,
    '7': 30,
    '8': 33,
    '9': 41,
    '10': 59,
    '11': 69,
    '12': 76,
    '13': 87,
    '14': 109,
    '15': 133,
    '16': 155,
    true: 23
  },
  weight: {
    default: 400,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800
  },
  letterSpacing: {
    true: 0
  },
  face: {
    200: { normal: `${primaryFontFamily}-ExtraLight` },
    300: { normal: `${primaryFontFamily}-Light` },
    400: { normal: `${primaryFontFamily}-Regular` },
    500: { normal: `${primaryFontFamily}-Medium` },
    600: { normal: `${primaryFontFamily}-SemiBold` },
    700: { normal: `${primaryFontFamily}-Bold` },
    800: { normal: `${primaryFontFamily}-ExtraBold` },
    900: { normal: `${primaryFontFamily}-Black` }
  }
})

const appConfig = createTamagui({
  ...config,
  fonts: {
    ...config.fonts,
    body: notoSansFont
  },
  defaultFont: 'body'
})

export type AppConfig = typeof appConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig

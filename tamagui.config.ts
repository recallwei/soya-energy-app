import { config } from '@tamagui/config/v2'
import { createFont, createTamagui } from 'tamagui'

const primaryFontFamily = 'Nunito'

const notoSansFont = createFont({
  family: primaryFontFamily,
  size: {
    true: 16,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20
  },
  lineHeight: {
    true: 20,
    xs: 16,
    sm: 18,
    base: 20,
    lg: 22,
    xl: 24
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
    true: 0,
    xs: 0.4,
    sm: 0.6,
    base: 0.8,
    lg: 1,
    xl: 1.2
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
  }
})

export type AppConfig = typeof appConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig

import { config } from '@tamagui/config/v2'
import { createTamagui } from 'tamagui'

// const primaryFontFamily = 'Dosis'

// const notoSansFont = createFont({
//   family: primaryFontFamily,
//   size: {
//     xs: 12,
//     sm: 14,
//     base: 16,
//     lg: 18,
//     xl: 20,
//     1: 10,
//     2: 12,
//     3: 12,
//     4: 14,
//     5: 16,
//     6: 18,
//     7: 20,
//     8: 22,
//     9: 24,
//     10: 26
//   },
//   lineHeight: {
//     xs: 16,
//     sm: 18,
//     base: 20,
//     lg: 22,
//     xl: 24
//   },
//   weight: {
//     extraLight: 200,
//     light: 300,
//     regular: 400,
//     medium: 500,
//     semiBold: 600,
//     bold: 700,
//     extraBold: 800
//   },
//   letterSpacing: {
//     xs: 0.4,
//     sm: 0.6,
//     base: 0.8,
//     lg: 1,
//     xl: 1.2
//   },
//   face: {
//     200: { normal: `${primaryFontFamily}-ExtraLight` },
//     300: { normal: `${primaryFontFamily}-Light` },
//     400: { normal: `${primaryFontFamily}-Regular` },
//     500: { normal: `${primaryFontFamily}-Medium` },
//     600: { normal: `${primaryFontFamily}-SemiBold` },
//     700: { normal: `${primaryFontFamily}-Bold` },
//     800: { normal: `${primaryFontFamily}-ExtraBold` }
//   }
// })

const appConfig = createTamagui({
  ...config
  // fonts: {
  //   ...config.fonts,
  //   notoSans: notoSansFont
  // },
  // defaultFont: 'notoSans',
  // defaultProps: {
  //   Text: {
  //     fontFamily: '$notoSans'
  //   }
  // }
})

export type AppConfig = typeof appConfig

declare module 'tamagui' {
  type TamaguiCustomConfig = AppConfig
}

export default appConfig

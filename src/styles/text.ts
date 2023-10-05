import { StyleSheet } from 'react-native'

import { primaryFontFamily, secondaryFontFamily } from './variants'

export const TextStyles = StyleSheet.create({
  base: {
    fontSize: 16,
    fontFamily: `${primaryFontFamily}-Regular`
  },
  secondaryBase: {
    fontSize: 16,
    fontFamily: `${secondaryFontFamily}-Regular`
  },
  // Font Size
  sm: {
    fontSize: 14
  },
  md: {
    fontSize: 16
  },
  lg: {
    fontSize: 18
  },
  xl: {
    fontSize: 20
  },
  // Font Family
  notoSans: {
    fontFamily: 'NotoSans-Regular'
  },
  dosis: {
    fontFamily: 'Dosis-Regular'
  },
  // Font Weight
  extraLight: {
    fontFamily: `${primaryFontFamily}-ExtraLight`
  },
  light: {
    fontFamily: `${primaryFontFamily}-Light`
  },
  regular: {
    fontFamily: `${primaryFontFamily}-Regular`
  },
  medium: {
    fontFamily: `${primaryFontFamily}-Medium`
  },
  semiBold: {
    fontFamily: `${primaryFontFamily}-SemiBold`
  },
  bold: {
    fontFamily: `${primaryFontFamily}-Bold`
  },
  extraBold: {
    fontFamily: `${primaryFontFamily}-ExtraBold`
  }
})

/**
 * NOTE: Fonts
 * Any fontFamily should name as same as the font name which located at /assets/fonts.
 *
 * Accessible font list:
 * Noto Sans
 * Dosis
 */

import { StyleSheet } from 'react-native'

import { primaryFontFamily } from './variants'

export const GlobalStyles = StyleSheet.create({
  // Header
  headerTitle: {
    fontSize: 16,
    fontFamily: `${primaryFontFamily}-Regular`
  },
  headerBackTitle: {
    fontSize: 16,
    fontFamily: `${primaryFontFamily}-Regular`
  },
  // TabBar
  tabBarLabel: {
    fontSize: 13,
    fontFamily: `${primaryFontFamily}-Regular`
  }
})

import { setup } from '@baronha/ting'
import { CacheManager } from '@georstat/react-native-image-cache'
import { enableMapSet } from 'immer'
import { AppRegistry, Platform } from 'react-native'
import { Dirs } from 'react-native-file-access'
import { enableLatestRenderer } from 'react-native-maps'

import { name as appName } from './app.json'
import App from './src/App'

const soyaAppIcon = require('./assets/images/soya-app-icon.png')

// immer
enableMapSet()
// react-native-maps
enableLatestRenderer()

// Init toast and alert
setup({
  toast: {
    title: Platform.select({ ios: '', android: undefined }),
    duration: 1.5,
    position: 'top',
    shouldDismissByDrag: false,
    icon: {
      uri: soyaAppIcon
    }
  },
  alert: {
    duration: 1.5,
    shouldDismissByTap: false
    // icon: {
    //   uri: soyaAppIcon
    // }
  }
})

AppRegistry.registerComponent(appName, () => App)

/**
 * Image Cache
 * @see https://www.npmjs.com/package/@georstat/react-native-image-cache
 */
CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3,
  retryDelay: 3000,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000
}

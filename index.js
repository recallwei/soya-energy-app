import 'react-native-gesture-handler'

import { CacheManager } from '@georstat/react-native-image-cache'
import { AppRegistry } from 'react-native'
import { Dirs } from 'react-native-file-access'

import { name as appName } from './app.json'
import App from './src/App'

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

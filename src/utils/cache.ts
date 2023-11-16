import { CacheManager } from '@georstat/react-native-image-cache'

export class CacheUtils {
  static async clearAll() {
    await CacheManager.clearCache()
  }

  static async removeCacheByUrl(uri: string) {
    await CacheManager.removeCacheEntry(uri)
  }

  static async getCacheSize() {
    const size = await CacheManager.getCacheSize()
    return size
  }

  static async isImageCached(uri: string) {
    const isCached = await CacheManager.isImageCached(uri)
    return isCached
  }

  static async fetchBlob(url: string | string[]) {
    return CacheManager.prefetch(url)
  }
}

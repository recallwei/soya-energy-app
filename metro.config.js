const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: MetroSymlinksResolver() // NOTE: Resolve pnpm symlinks
  }
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)

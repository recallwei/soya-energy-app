class GlobalEnvConfig {
  readonly APP_VERSION: string

  readonly APP_ENVIRONMENT: string

  readonly BASE_API_URL: string

  constructor(config: { type: 'DEV' | 'PROD' }) {
    switch (config.type) {
      case 'PROD':
        this.APP_ENVIRONMENT = 'PROD'
        this.BASE_API_URL = 'http://192.168.2.146:1001'
        this.APP_VERSION = '0.0.0'
        break
      case 'DEV':
      default:
        this.APP_ENVIRONMENT = 'DEV'
        this.BASE_API_URL = 'http://192.168.2.146:1001'
        this.APP_VERSION = '0.0.1'
        break
    }
  }
}

export const globalEnvConfig = new GlobalEnvConfig({
  type: 'DEV'
})

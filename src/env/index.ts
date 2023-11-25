class GlobalEnvConfig {
  readonly APP_VERSION: string

  readonly VERSION_CODE: string

  readonly APP_ENVIRONMENT: 'DEV' | 'STAGING' | 'PROD'

  readonly BASE_API_URL: string

  readonly SENTRY_DSN: string =
    'https://07b30ab33244299a26950641569b63f9:c8db5b8af6c0cb9bd386c2ebc95ebb14@o4506115253993472.ingest.sentry.io/450611525556633'

  constructor(config: { type: 'DEV' | 'STAGING' | 'PROD' }) {
    switch (config.type) {
      case 'PROD':
        this.APP_ENVIRONMENT = 'PROD'
        this.BASE_API_URL = 'http://192.168.2.231:1001/raipiot-app'
        this.APP_VERSION = '1.0'
        this.VERSION_CODE = '1'
        break
      case 'STAGING':
        this.APP_ENVIRONMENT = 'STAGING'
        this.BASE_API_URL = 'http://192.168.2.231:1001/raipiot-app'
        this.APP_VERSION = '1.0'
        this.VERSION_CODE = '8'
        break
      case 'DEV':
      default:
        this.APP_ENVIRONMENT = 'DEV'
        this.BASE_API_URL = 'http://192.168.2.231:1001/raipiot-app'
        this.APP_VERSION = '1.0'
        this.VERSION_CODE = '1'
        break
    }
  }
}

export const globalEnvConfig = new GlobalEnvConfig({
  type: 'STAGING'
})

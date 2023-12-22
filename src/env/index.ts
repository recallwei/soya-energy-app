class GlobalEnvConfig {
  readonly APP_ENVIRONMENT: 'DEV' | 'STAGING' | 'PROD'

  readonly BASE_INSTALLER_API_URL: string

  readonly BASE_USER_API_URL: string

  readonly APP_VERSION: string

  readonly AMAZON_S3_BUCKET_URL: string

  /**
   * Sentry DSN
   */
  readonly SENTRY_DSN: string =
    'https://07b30ab33244299a26950641569b63f9:c8db5b8af6c0cb9bd386c2ebc95ebb14@o4506115253993472.ingest.sentry.io/450611525556633'

  constructor(config: { type: 'DEV' | 'STAGING' | 'PROD' }) {
    switch (config.type) {
      case 'PROD':
        this.APP_ENVIRONMENT = 'PROD'
        this.BASE_INSTALLER_API_URL = 'https://soyaenergy.com/api/raipiot-installer'
        this.BASE_USER_API_URL = 'https://soyaenergy.com/api/raipiot-owner'
        this.APP_VERSION = '3.0.0'
        this.AMAZON_S3_BUCKET_URL = 'https://soya-inner-uat.s3.eu-central-1.amazonaws.com/picture'
        break
      case 'STAGING':
        this.APP_ENVIRONMENT = 'STAGING'
        this.BASE_INSTALLER_API_URL = 'https://soya-uat.soyaenergy.com/api/raipiot-installer'
        this.BASE_USER_API_URL = 'https://soya-uat.soyaenergy.com/api/raipiot-owner'
        this.APP_VERSION = '3.0.0'
        this.AMAZON_S3_BUCKET_URL = 'https://soya-inner-uat.s3.eu-central-1.amazonaws.com/picture'
        break
      case 'DEV':
      default:
        this.APP_ENVIRONMENT = 'DEV'
        this.BASE_INSTALLER_API_URL = 'http://192.168.2.231:1001/raipiot-installer'
        this.BASE_USER_API_URL = 'http://192.168.2.231:1001/raipiot-owner'
        this.APP_VERSION = '3.0.0'
        this.AMAZON_S3_BUCKET_URL = 'https://soya-inner-uat.s3.eu-central-1.amazonaws.com/picture'
        break
    }
  }
}

export const globalEnvConfig = new GlobalEnvConfig({
  type: 'STAGING'
})

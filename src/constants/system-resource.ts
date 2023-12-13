import { globalEnvConfig } from '@/env'

export const SYSTEM_RESOURCE = Object.freeze({
  PLANT_DEFAULT_IMAGE_URL: `${globalEnvConfig.AMAZON_S3_BUCKET_URL}/plant.png`,
  INVERTER_DEFAULT_IMAGE_URL: `${globalEnvConfig.AMAZON_S3_BUCKET_URL}/invertor.png`,
  BATTERY_DEFAULT_IMAGE_URL: `${globalEnvConfig.AMAZON_S3_BUCKET_URL}/battery.png`,
  USER_DEFAULT_IMAGE_URL: `${globalEnvConfig.AMAZON_S3_BUCKET_URL}/user.png`
})

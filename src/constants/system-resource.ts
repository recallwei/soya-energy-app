import { globalEnvConfig } from '@/env'

export const SYSTEM_RESOURCE = Object.freeze({
  PLANT_DEFAULT_IMAGE_URL: `${globalEnvConfig.AMAZON_S3_BUCKET_URL}/plant.jpeg`,
  INVERTER_DEFAULT_IMAGE_URL: `${globalEnvConfig.AMAZON_S3_BUCKET_URL}/inverter.jpeg`,
  BATTERY_DEFAULT_IMAGE_URL: `${globalEnvConfig.AMAZON_S3_BUCKET_URL}/battery.jpg`,
  USER_DEFAULT_IMAGE_URL: `${globalEnvConfig.AMAZON_S3_BUCKET_URL}/avatar.png`
})

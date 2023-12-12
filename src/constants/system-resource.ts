const AMAZON_S3_BUCKET_URL = 'https://soya-inner-test.s3.eu-central-2.amazonaws.com/img'

export const SYSTEM_RESOURCE = Object.freeze({
  PLANT_DEFAULT_IMAGE_URL: `${AMAZON_S3_BUCKET_URL}/plant.png`,
  INVERTER_DEFAULT_IMAGE_URL: `${AMAZON_S3_BUCKET_URL}/invertor.png`,
  BATTERY_DEFAULT_IMAGE_URL: `${AMAZON_S3_BUCKET_URL}/battery.png`,
  USER_DEFAULT_IMAGE_URL: `${AMAZON_S3_BUCKET_URL}/user.png`
})

import { GlobalEnvConfig } from '@/constants'

export const axiosConfig = {
  baseURL: GlobalEnvConfig.BASE_API_PREFIX,
  timeout: 30000,
  withCredentials: true
}

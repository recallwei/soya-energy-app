import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

import { errorMessageMap, StatusCode } from '@/constants'
import { globalEnvConfig } from '@/env'
import i18n from '@/i18n'
import type { R, Token } from '@/types'
import { AuthUtils, LangUtils, ToastUtils } from '@/utils'

interface PendingTask {
  config?: AxiosRequestConfig
  resolve: (value: unknown) => void
}

const t = i18n.getFixedT(null, 'Global')

class Request {
  instance: AxiosInstance

  isRefreshing = false

  pendingQueue: PendingTask[] = []

  config: AxiosRequestConfig = {
    baseURL: '/',
    timeout: 30000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  REFRESH_API_URL = `${globalEnvConfig.BASE_API_URL}/auth/refresh-token`

  public constructor() {
    this.instance = axios.create(this.config)

    this.instance.interceptors.request.use(
      async (req: InternalAxiosRequestConfig) => {
        const { url } = req
        if (url?.startsWith(globalEnvConfig.BASE_API_URL)) {
          req.headers['Tenant-Id'] = '000000'
          /* cspell:disable-next-line */
          req.headers.Authorization = 'Basic cmFpcGlvdDpyYWlwaW90X3NlY3JldA=='
        }
        if (await AuthUtils.isLogin()) {
          req.headers['Raipiot-Auth'] = await AuthUtils.getAuthorization()
        }
        req.headers['Accept-Language'] = await LangUtils.getDefaultLang()
        // console.log(`请求路径：${req.url}`)
        // console.log(`请求参数：${JSON.stringify(req.params) ?? ''}`)
        // console.log(`请求数据：${JSON.stringify(req.data) ?? ''}`)
        return req
      },
      (err: AxiosError) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) =>
        // console.log(`响应状态：${res.status}`)
        // console.log(`响应数据：${JSON.stringify(res.data)}`)
        res.data,
      async (err: AxiosError<R>) => {
        const { response, config } = err
        const { data, status } = response ?? {}
        const { msg } = data ?? {}
        // 当前接口是否是刷新令牌接口
        const isRefreshTokenAPI = config?.url?.includes(this.REFRESH_API_URL)
        /**
         * 处理刷新令牌接口的认证失败
         * @description
         * - 刷新标识置为 false
         * - 清除 token
         * - 清空请求队列
         */
        if (isRefreshTokenAPI) {
          this.isRefreshing = false
          this.pendingQueue = []
          return Promise.reject(data)
        }
        // 如果正在刷新令牌，将当前失败的请求加入待请求队列
        if (this.isRefreshing) {
          return new Promise((resolve) => {
            this.pendingQueue.push({ config, resolve })
          })
        }
        const errorMessage = msg ?? errorMessageMap.get(status as number) ?? t('Unknown.Error')
        const currentRefreshToken = await AuthUtils.getRefreshToken()
        switch (status) {
          case StatusCode.UNAUTHORIZED:
            // 存在刷新令牌，认证令牌过期时，需要通过刷新令牌获取新的认证令牌
            if (currentRefreshToken) {
              this.isRefreshing = true
              try {
                const { refresh_token: refreshToken, access_token: accessToken } =
                  (await this.refresh(currentRefreshToken)).data ?? {}
                AuthUtils.setAccessToken(accessToken)
                AuthUtils.setRefreshToken(refreshToken)
                this.isRefreshing = false
                if (config) {
                  // 重新发起上次失败的请求
                  const res = await this.request<R>({
                    ...config,
                    headers: {
                      ...config.headers,
                      Authorization: await AuthUtils.getAuthorization()
                    }
                  })
                  // 刷新了认证令牌后，将待请求队列的请求重新发起
                  if (this.pendingQueue.length > 0) {
                    this.pendingQueue.forEach((task) => task.resolve(this.request(task.config!)))
                    this.pendingQueue = []
                  }
                  return res
                }
              } catch {
                // 处理刷新令牌认证失败的情况
              }
            }
            // 处理认证失败
            await AuthUtils.removeAccessToken()
            await AuthUtils.removeRefreshToken()
            ToastUtils.error({ message: t('Unauthorized') })
            break
          case StatusCode.FORBIDDEN:
            ToastUtils.error({ message: t('Forbidden') })
            break
          case StatusCode.BAD_REQUEST:
          case StatusCode.NOT_FOUND:
          case StatusCode.CONFLICT:
          case StatusCode.INTERNAL_SERVER_ERROR:
          case StatusCode.BAD_GATEWAY:
          case StatusCode.GATEWAY_TIMEOUT:
            ToastUtils.error({ message: errorMessage })
            break
          default:
            break
        }
        return Promise.reject(data)
      }
    )
  }

  /**
   * 刷新令牌
   */
  refresh(refreshToken: string) {
    return this.post<R<Token>>(this.REFRESH_API_URL, {}, { params: { refreshToken } })
  }

  /**
   * 通用请求
   * @param config 请求配置
   */
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config)
  }

  /**
   * GET 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  get<T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, { params, ...config })
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config)
  }

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  delete<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.delete(url, { params, ...config })
  }

  /**
   * PATCH 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  patch<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config)
  }
}

export default new Request()

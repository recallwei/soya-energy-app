import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

import { errorMessageMap, ResponseStatusCode } from '@/constants'
import { globalEnvConfig } from '@/env'
import { AuthUtils } from '@/utils'

class Request {
  instance: AxiosInstance

  config: AxiosRequestConfig = {
    baseURL: '/',
    timeout: 30000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  public constructor() {
    this.instance = axios.create(this.config)

    this.instance.interceptors.request.use(
      async (req: InternalAxiosRequestConfig) => {
        const { url } = req

        if (url?.startsWith(globalEnvConfig.BASE_API_URL)) {
          req.headers['Accept-Language'] = 'zh-CN'
          req.headers['Tenant-Id'] = '000000'
          /* cspell:disable-next-line */
          req.headers.Authorization = 'Basic cmFpcGlvdDpyYWlwaW90X3NlY3JldA=='
        }

        if (await AuthUtils.isLogin()) {
          req.headers['Raipiot-Auth'] = await AuthUtils.getAuthorization()
        }

        return req
      },
      (err: AxiosError) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data as AxiosResponse,
      (err: AxiosError) => {
        console.log(err.response?.data)
        const { response } = err
        const { data, status } = response ?? {}
        if (response) {
          Request.handleCode(status!)
        }
        // // 网络错误，跳转到 404 页面
        // if (!window.navigator.onLine) {
        //   // TODO: 重定向到 404 页面
        // }
        return Promise.reject(data)
      }
    )
  }

  /**
   * 处理响应状态码
   * @param code 响应状态码
   * @description 根据响应状态码进行相应的处理
   * - 401 未授权，清除 token 并跳转到登录页
   * - 403 禁止访问，TODO: 提示用户无权限访问
   * - 404 未找到，TODO: 跳转到 404 页面
   * - 500 服务器错误，TODO: 跳转到 500 页面
   * - 其他状态码，提示错误信息
   */
  static handleCode(code: number): void {
    const errorMessage = errorMessageMap.get(code) ?? 'Unknown Error!'
    switch (code) {
      case ResponseStatusCode.UNAUTHORIZED:
        // AuthUtils.clearToken()
        // TODO: 提示错误信息
        console.error(errorMessage)

        // TODO: 如果非登录页面，需要重定向到登录页，且需要带上 redirect 参数
        // if (router.currentRoute.value.path !== '/login') {
        //   if (router.currentRoute.value.path !== '/') {
        //     router.replace({
        //       path: '/login',
        //       query: {
        //         redirect: router.currentRoute.value.fullPath
        //       }
        //     })
        //   } else {
        //     router.replace('/login')
        //   }
        // }
        break
      case ResponseStatusCode.FORBIDDEN:
        // TODO: 提示错误信息
        console.error(errorMessage)
        break
      case ResponseStatusCode.INTERNAL_SERVER_ERROR:
      case ResponseStatusCode.BAD_GATEWAY:
      case ResponseStatusCode.GATEWAY_TIMEOUT:
        // TODO: 提示错误信息
        console.error(errorMessage)
        // TODO: 如果非登录页面，需要重定向到登录页
        break
      case ResponseStatusCode.BAD_REQUEST:
      case ResponseStatusCode.NOT_FOUND:
      case ResponseStatusCode.METHOD_NOT_ALLOWED:
      case ResponseStatusCode.CONFLICT:
      case ResponseStatusCode.TOO_MANY_REQUESTS:
      default:
    }
  }

  /**
   * 通用请求
   * @param config 请求配置
   */
  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  /**
   * GET 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  get<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.get(url, { params, ...config })
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
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
  patch<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.patch(url, data, config)
  }
}

export default new Request()

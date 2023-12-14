import { globalEnvConfig } from '@/env'
import type {
  ChangePasswordInputModel,
  ForgotPasswordInputModel,
  LoginInputModel,
  R,
  SignupInputModel,
  Token
} from '@/types'

import httpRequest from './axios'

export class AuthAPI {
  private static AUTH_API_PREFIX = `${globalEnvConfig.BASE_INSTALLER_API_URL}/auth`

  /**
   * 登录
   */
  static login(data: LoginInputModel): Promise<R<Token>> {
    return httpRequest.post<R<Token>>(`${this.AUTH_API_PREFIX}/login`, data)
  }

  /**
   * 注册
   */
  static signup(data: SignupInputModel): Promise<R<Token>> {
    return httpRequest.post<R<Token>>(`${this.AUTH_API_PREFIX}/register`, data)
  }

  /**
   * 修改密码
   */
  static changePassword(data: ChangePasswordInputModel): Promise<R> {
    return httpRequest.post(`${this.AUTH_API_PREFIX}/change-password`, data)
  }

  /**
   * 忘记密码
   */
  static forgotPassword(data: ForgotPasswordInputModel): Promise<R> {
    return httpRequest.post(`${this.AUTH_API_PREFIX}/forget-password`, data)
  }

  /**
   * 退出
   */
  static logout() {
    return httpRequest.post(`${this.AUTH_API_PREFIX}/logout`)
  }
}

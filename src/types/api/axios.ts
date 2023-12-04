export interface R<T = any> {
  code?: number
  msg?: string
  data: T
}

export interface Page<T = any> {
  records: T[]
  current?: number
  pages?: number
  size?: number
  total?: number
}

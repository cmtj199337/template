/*
 * @Description: 分页主model
 */

export interface RootPageObject<T> {
  total: number
  rows: T[]
  code: number
  msg?: any
}

import moment, { IDateType } from './moment'

/**
 * @description 时间转时间戳
 * @param {string} date
 * @param {number} format
 * @returns
 */
export function formatToDate(date: IDateType, format?: string) {
  return moment(date).format(format)
}

export function formatToDateTime(date: IDateType) {
  return moment(date).date.getTime()
}

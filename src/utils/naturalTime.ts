/**
 * 获取当月有几周
 * @param {Number} year
 * @param {Number} month
 * @returns
 */
export const getWeekCountInMonth = (year: number, month: number) => {
  const list = []
  const target = new Date()
  let offset = 1
  target.setFullYear(year)
  target.setMonth(month - 1)
  target.setDate(1)

  let targetDay = target.getDay()
  targetDay = targetDay === 0 ? 7 : targetDay

  if (targetDay !== 1) {
    list.push(offset)
    offset = offset + 1
    target.setDate(target.getDate() + (7 - targetDay) + 1) //对齐到周一
  }

  while (target.getMonth() + 1 === month) {
    list.push(offset)
    offset = offset + 1
    target.setDate(target.getDate() + 7) //设置到次周一0时分秒
  }
  return list
}

/**
 * 获取某月的所有自然周
 * @param {Number} year
 * @param {Number} month
 * @returns {Array}
 */
export const getWeekByMonth = (year: number, month: number) => {
  // 获取当月有几周
  const weekCount = getWeekCountInMonth(year, month)
  const result = { begin: 0, end: 0, list: weekCount }
  const target = new Date()
  const weekList = []

  // 初始化时间
  target.setFullYear(year)
  target.setMonth(month - 1)
  target.setDate(1)

  for (let number = 1; number <= weekCount.length; number++) {
    const dayNum = new Date(year, month, 0).getDate()

    let targetDay = target.getDay()
    targetDay = targetDay === 0 ? 7 : targetDay

    result.begin = target.getTime()
    // 判断最后一周是否超出当月最大值
    if (target.getDate() + (7 - targetDay) + 1 > dayNum) {
      target.setDate(dayNum)
      result.end = target.getTime()
    } else {
      target.setDate(target.getDate() + (7 - targetDay)) //设置到周日
      result.end = target.getTime()
      target.setDate(target.getDate() + 1) //设置到周一
    }

    weekList.push(result)
  }

  return weekList
}

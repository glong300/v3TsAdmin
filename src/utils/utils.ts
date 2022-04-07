import { message } from '@/hooks/useMessage'
/**
 * @description: 补零
 * @param {string} value 需要补零的值
 * @param {number} n 字符串整体长度
 * @return {number | string }
 */
export const zeroPadd = (value: string | number, n: number): number | string => {
  let len = value.toString().length

  while (len < n) {
    value = '0' + value
    len++
  }
  return value
}

/**
 * 复制文本方法
 * @param text 需要复制的文本
 * @returns
 */
export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message('成功复制到剪贴板')
      })
      .catch(() => {
        console.log('复制失败 :>> ', '复制失败')
        message('该浏览器不支持点击复制到剪贴板')
      })
    return
  }

  const textarea = document.createElement('textarea')
  textarea.style.width = '1px'
  textarea.style.height = '1px'
  textarea.style.border = 'none'

  // 设置值
  textarea.value = text
  document.body.appendChild(textarea)

  // 选中文本
  textarea.select()

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板'
    message(msg)
  } catch (err) {
    message('该浏览器不支持点击复制到剪贴板')
  }

  document.body.removeChild(textarea)

  console.log('emsId :>> ', 'emsId')
}

/**
 * @description: 获取URL参数
 * @param {string} name 需要获取的参数
 * @return {string | null} 参数值
 */
export const getUrlKey = (name: string) => {
  const reg = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
  return decodeURI((reg.exec(location.href) || ['s', ''])[1].replace(/\+/g, '%20')) || null
}

/**
 * 获取 URL 所有参数
 * @returns {any} 参数对象
 */
export const getAllUrlKey = () => {
  const url = location.search //获取url中"?"符后的字串
  const obj: any = {}

  if (url.indexOf('blhOrderNo') === -1) {
    return false
  }

  if (url.indexOf('?') !== -1) {
    const str = url.substring(1)
    const strs: string[] = str.split('&')

    for (let i = 0; i < strs.length; i++) {
      obj[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
    }
  }

  return obj
}

/**
 * 验证手机号是否正确
 * @param {Date} mobile 手机号
 * @returns {boolean}  true为真
 */
export const checkPhone = (mobile: string) => {
  const phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
  if (phoneReg.test(mobile)) {
    return true
  }
  return false
}

/**
 * 判断一个日期是不是工作日
 * @param {Date} date 日期
 * @returns {boolean} true为真
 */
export const isWeekDay = (date: Date) => date.getDay() % 6 !== 0

/**
 * 获取总和、最小值和最大值
 * @param {Number} arr 数组
 * @param {String} type 类型 all 数组总和  min 数组最小值  max 数组最大值
 */
export const getNum = (arr: number[], type = 'all') => {
  arr.reduce((sum, current) => {
    if (type === 'all') {
      return sum + current
    }

    if (type === 'min') {
      return sum < current ? sum : current
    }

    if (type === 'max') {
      return sum > current ? sum : current
    }

    return 0
  }, 0)
}

/**
 * 从数组中过滤出虚假值
 * @param { Array } arr 数组
 * @returns {Array} 过滤后的数组
 */
export const falsyArray = (arr: any[]) => arr.filter(Boolean)

/**
 * 删除重复数据
 * @param array 数组
 * @returns {any[]} 返回剔除重复的数组
 */
export const dedupe = (array: any[]) => {
  return array.filter((item, idx, arr) => arr.indexOf(item) === idx)
}

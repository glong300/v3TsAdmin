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
 * @returns {Object} 参数对象
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

type IFormType = 'input' | 'password'

// 选择框类型
type IOptions = {
  label: string
  value: string | number
  disabled?: boolean
}
// 设置配置搜索框类型
interface BaseType {
  field: string // 输入框数据字段
  label: string // 输入框名
  rules?: any // 校验规则
  placeholder?: string // 输入框提示
  otherOptions?: any // 其他设置选项
  isHidden?: boolean // 是否隐藏改输入框
  options?: IOptions[]
}
interface IOtherType extends BaseType {
  type: IFormType
}
interface ISelectType extends BaseType {
  type: 'select'
  // 针对select
  options: IOptions[]
  // 针对时间选择器
}
interface IDateType extends BaseType {
  type: 'datepicker'
  // 针对时间选择器
  dateOptions: any
}

export type IFromItem = IOtherType | ISelectType | IDateType

export interface IForm {
  title?: string
  formItems: IFromItem[]
  labelWidth?: string
  colLayout?: {
    span: number
  }
  itemStyle?: any
}

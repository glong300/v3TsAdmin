export interface ITableItem {
  prop?: string
  label: string
  minWidth?: string
  slotName?: string
}

interface ITableActionBtn {
  create: string
  [name: string]: string
}

export interface ITable {
  title?: string // 表格名称
  tableActionBtn?: ITableActionBtn // 表格操作按钮
  propList: ITableItem[]
  showIndexColumn?: boolean // 是否显示序号
  showSelectColumn?: boolean // 是否显示选择框
  childrenProps?: {
    rowKey: string
    treeProp: {
      children: string
    }
  }
  showFooter?: boolean
}

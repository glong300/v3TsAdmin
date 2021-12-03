import { IForm } from '@/base-ui/Form'

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'oldPrice',
      type: 'input',
      label: '原价格',
      placeholder: '请输入原价格'
    },
    {
      field: 'newPrice',
      type: 'input',
      label: '现价格',
      placeholder: '请输入现价格'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请输入用户状态',
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      dateOptions: {
        type: 'daterange',
        startPlaceholder: '请选择开始时间',
        endPlaceholder: '请选择结束时间'
      }
    }
  ]
}

// 表单效验规则
export const rules = {
  name: [
    {
      required: true,
      message: '请填写用户名~',
      trigget: 'blur'
    },
    {
      pattern: /^[a-zA-z0-9]{5,10}$/,
      message: '用户名必须为5~10字母或数字~',
      trigget: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请填写密码~',
      trigget: 'blur'
    },
    {
      pattern: /^[a-zA-z0-9]{6,10}$/,
      message: '用户名必须为6~10字母或数字~',
      trigget: 'blur'
    }
  ]
}

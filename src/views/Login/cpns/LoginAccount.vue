<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'

import { rules } from './../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  name: 'LoginAccount',
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean, loading: Ref<boolean>) => {
      formRef.value?.validate(valid => {
        // 判断表单验证是否通过
        if (valid) {
          // 是否记住密码
          if (isKeepPassword) {
            // 本地储存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          store.dispatch('login/acountLoginAction', {
            ...account,
            loading
          })
        }
      })
    }

    return {
      account,
      formRef,
      rules,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped></style>

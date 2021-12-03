<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <i class="el-icon-user-solid"></i>
            账号登录
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <i class="el-icon-mobile-phone"></i>
            手机登录
          </span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" :loading="loading" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

export default defineComponent({
  name: 'LoginPanel',
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    console.log('object1 :>> ', typeof LoginAccount)

    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account') // 选项卡切换
    const loading = ref(false) // 按钮加载动画)

    const handleLoginClick = () => {
      loading.value = true

      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value, loading)
      } else {
        console.log('这里是手机登录')
      }
    }

    return {
      isKeepPassword,
      currentTab,
      accountRef,
      phoneRef,
      loading,
      handleLoginClick
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>

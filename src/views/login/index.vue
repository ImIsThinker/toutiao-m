<template>
    <div class="login-container">
        <!-- 顶部导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录" />
        <!-- 登录表单 -->
        <van-form @submit="onSubmit">
            <van-field
                v-model="user.mobile"
                name="用户名"
                placeholder="请输入手机号"
            >
                <!-- 具名 插槽 -->
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="密码"
                placeholder="请输入验证码"
            >
                <!-- 具名 插槽 -->
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <!-- 插入按钮 -->
                <template #button>
                    <van-button class="send-sms-btn" round size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 用户登录数据
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      }
    }
  },
  methods: {
    //   点击登录的时候触发
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      // 提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
      } catch (error) {
        if (error.response.status === 400) {
          console.log('手机号或者验证码错误')
        } else {
          console.log('登录失败，请稍后重试', error)
        }
      }
      // 根据表单响应结果处理后续结果
      console.log('submit')
    }
  }
}
</script>
<style lang="less" scoped>
    .login-container {
        .toutiao {
            font-size: 20px;
            vertical-align: middle;
        }
        .send-sms-btn {
            width: 90px;
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            background-color: #ededed;
            color: #666;

        }
        .van-button--primary {
                background-color: #ccc;
                border: none;
        }
        .login-btn-wrap {
            padding: 53px 33px;
            .login-btn {
                border: none;
                background-color: #6db4fb;
            }
        }
    }
</style>

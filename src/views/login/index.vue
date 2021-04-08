<template>
    <div class="login-container">
        <!-- 顶部导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录" >
          <!--  <template #left>
            <van-icon name="cross" size="20" />
          </template> -->
          <template slot="left">
            <van-icon name="cross" size="20" @click="$router.back()" />
          </template>
        </van-nav-bar>
        <!-- 登录表单 -->
        <van-form @submit="onSubmit" ref="loginFormRef">
            <!-- :rules="userFormRules.mobile" 表单验证规则、
            他会 1.自动触发验证规则、验证不通过时，2. 不会触发submit事件 -->
            <!-- type="number" 类型必须是数字
            maxlength="11" 最大长度为11 -->
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="userFormRules.mobile"
                type="number"
                maxlength="11"
            >
                <!-- 具名 插槽 -->
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules="userFormRules.code"
                type="number"
                maxlength="6"
            >
                <!-- 具名 插槽 -->
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <!-- 插入按钮 -->
                <template #button>
                    <!-- van-count-down 使用倒计时组件 time是时间 单位为毫秒 -->
                    <!-- format="DD 天 HH 时 mm 分 ss 秒" 指定时间格式 -->
                    <!-- finish 倒计时结束时触发该事件 -->
                    <van-count-down @finish="showCountDown = false" v-if="showCountDown" :time="10 * 1000" format="ss s" />
                    <!-- native-type="button" 发送验证码不会触发表单提交 -->
                    <van-button v-else native-type="button" @click="onSendSms" class="send-sms-btn" round size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 用户登录数据
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      // 表单规则验证对象
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|4|5|6|7]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ]
      },
      showCountDown: false // 控制倒计时的显示和隐藏

    }
  },
  methods: {
    // 点击登录的时候触发
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      //   Toast 组件在组件内部使用必须要用 this.$toast.loading 调用
      this.$toast.loading({
        message: '登录中...', // 提示信息
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间 如果为0 则一直被打开不会关闭
      })
      // 提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        // toast 组件 如果登录成功调用 success 方法 同时会关闭上面调用 toast提示
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          console.log('手机号或者验证码错误')
          this.$toast.fail('手机号或者验证码错误')
        } else {
          console.log('登录失败，请稍后重试', error)
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 根据表单响应结果处理后续结果
      console.log('submit')
    },
    // 点击发送验证码
    async onSendSms () {
      console.log('onSendSms')
      try {
        // 校验手机号
        // 验证表单，支持传入 name 来验证单个或部分表单项
        await this.$refs.loginFormRef.validate('mobile')
      } catch (error) {
        console.log('验证失败', error)
        return false
      }
      console.log('验证通过')
      // 验证通过，显示倒计时
      this.showCountDown = true
      // 请求发送发验证码
      try {
        const res = await sendSms(this.user.mobile)
        this.$toast('发送成功')
        console.log(res)
      } catch (error) {
        // 发送失败、关闭倒计时组件
        this.showCountDown = false
        if (error.response.status === 429) {
          this.$toast('请求过于频繁，稍后重试')
          console.log('请求过于频繁，稍后重试', error)
          return false
        } else {
          this.$toast('发送失败，请稍后重试')
          console.log('发送失败,请稍后重试', error)
          return false
        }
      }
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

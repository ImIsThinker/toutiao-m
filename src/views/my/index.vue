<template>
    <div class="my-container">
      <!-- 登录状态 -->
      <div v-if="user" class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image
            round
            :src="userInfo.photo"
            class="avatar"
            fit="cover"
          />
          <span class="name">{{ userInfo.intro }}</span>
          </div>
          <div class="right">
            <!-- round 圆角 -->
            <van-button size="mini" round>编辑资料</van-button>
          </div>
        </div>
        <div class="data-status">
          <div class="data-item">
            <span class="count">{{ userInfo.art_count }}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <!-- 登录状态 -->
      <!-- 未登录状态 -->
      <div v-else class="header no-login">
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="">
          <span class="text">登录/注册</span>
        </div>
      </div>
      <!-- 未登录状态 -->
      <!-- 宫格导航 -->
      <!-- clickable 是否开启格子点击反馈 -->
        <van-grid clickable :column-num="2" class="grid-nav mg-65">
          <van-grid-item class="grid-item">
            <i slot="icon" class="toutiao toutiao-shoucang"></i>
            <span slot="text" class="text">收藏</span>
          </van-grid-item>
          <van-grid-item class="grid-item">
            <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span slot="text" class="text">历史</span>
          </van-grid-item>
        </van-grid>
        <!-- 宫格导航 -->
        <!-- Cell单元格 -->
        <van-cell is-link title="消息通知" />
        <van-cell is-link title="小智同学"  />
        <van-cell
          v-if="user"
          class="logout-cell"
          clickable
          title="退出登录"
          @click="onLogout"
        />
        <!-- Cell单元格 -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.getUserInfo()
    }
  },
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  methods: {
    onLogout () {
      // 消息提示
      // 在组件中要使用 this.$dialog调用dialog组件
      this.$dialog.confirm({
        title: '退出',
        message: '确认退出吗'
      })
        .then(() => {
          // 清除vuex中数据
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('确认取消')
        })
    },
    // 获取用户信息
    async getUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        // console.log(data)
      } catch (error) {
        this.$toast('获取用户资料失败、稍后再试')
        console.log(error)
      }
    }
  }
}
</script>
<style  scoped lang="less">
  .my-container {
        .header {
            height: 250px;
            background: url('~@/assets/banner.png'); // @/ 指向src 但是在css必须使用~
            background-size: cover; // 缩放完整的填充到盒子中去
        }
        .no-login {
          display: flex;
          justify-content: center; // 水平居中
          align-items: center; // 垂直居中
          .login-btn {
            display: flex;
            flex-direction: column; // flex分布的方向
            justify-content: center; // 水平居中
            align-items: center; // 垂直居中
            .mobile-img {
              width: 132px;
              height: 132px;
            }
            .text {
              font-size: 28px;
              color: #fff;
            }
          }
        }
        .user-info {
          .base-info {
            height: 150px;
            // background-color: pink;
            padding: 76px 23px 32px;
            box-sizing: border-box; // 添加padding值后使他们全部加起来等于盒子高度 不需要手动减去盒子高度
            display: flex;
            justify-content: space-between; // 向两边撑开
            align-items: center;
            .left {
              display: flex;
              align-items: center;
              .avatar {
                width: 115px;
                height: 115px;
                margin-right: 20px;
                border: 1px solid #fff;
              }
              .name {
                font-size: 20px;
                color: #fff;
              }
            }
          }
          .data-status {
            // height: 130px;
            display: flex;
            .data-item {
              flex: 1; // 所有的孩子平分父盒子
              // height: 100%;
              height: 100px;
              display: flex;
              justify-content: center;
              align-items: center; // 垂直居中
              flex-direction: column; // 内容垂直分布
              color: #fff;
            }
            .count {
              font-size: 28px;
            }
            .text {
              font-size: 18px;
            }
          }
        }
        .grid-nav {
          .grid-item {
            height: 141px;
            i.toutiao {
              font-size: 28px;
            }
            .toutiao-shoucang {
              color: #eb5253;
            }
            .toutiao-lishi {
              color: #ff9d1d;
            }
            span.text {
              font-size: 20px;
            }
          }
        }
        .logout-cell {
          height: 50px;
          margin-top: 30px;
          text-align: center;
          color: #d86262;
        }
        .mg-65 {
          margin-bottom: -50px;
        }
  }
</style>

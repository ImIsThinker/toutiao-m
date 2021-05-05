<template>
    <div class="home-container">
        <!-- 顶部导航栏 -->
        <!-- fixed 固定头部导航栏 -->
        <van-nav-bar class="page-nav-bar" :fixed="true" >
          <van-button
          class="search-btn"
          icon="search"
          slot="title"
          type="info" size="mini"
          round
          @click="$router.push('/search')"
          >
            搜索
          </van-button>
        </van-nav-bar>
        <!-- 顶部导航栏 -->
        <!-- 频道tab标签页 -->
        <!-- animated 配置动画 -->
        <!-- swipeable 开启手势滑动 -->
        <van-tabs class="channel-tabs" animated swipeable v-model="active">
          <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
            <!-- 文章列表组件 -->
            <!-- :channel="channel" 需要把频道传给子组件 子组件使用props属性接收一下 -->
            <article-list :channel="channel"></article-list>
            <!-- 文章列表组件 -->
          </van-tab>
          <!-- 占位标签 -->
          <div slot="nav-right" class="placeholder"></div>
          <div @click="isChannelEditShow = true" slot="nav-right" class="hambuger-btn" >
            <van-icon name="todo-list" class="toutiao-gengduo" />
          </div>
        </van-tabs>
        <!-- 频道tab标签页 -->
        <!-- 频道编辑弹出层 -->
        <!-- close-icon-position="top-left" 关闭按钮的位置 -->
        <van-popup
          v-model="isChannelEditShow"
          closeable
          close-icon-position="top-left"
          position="bottom"
          :style="{ height: '100%' }">
          <!-- 频道编辑组件 -->
          <!-- 做频道列表的时候直接将父组件获取的频道列表数据以父组件向子组件传值的方式传到子组件里面去 -->
          <channel-edit @update-active="updateActive" :active="active" :my-channels="channels"></channel-edit>
        </van-popup>
        <!-- 频道编辑弹出层 -->
    </div>
</template>
<script>
// 导入userapi模块
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // 控制被激活tab标签页
      channels: [], // 频道列表
      isChannelEditShow: false // 控制编辑频道弹出层显示和隐藏
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.getUserChannels()
  },
  methods: {
    async getUserChannels () {
      try {
        if (this.user) {
          // 用户已经登录
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            this.channels = localChannels
          } else {
            // 如果没有、请求默认用户频道列表
            const { data } = await getUserChannels()
            this.channels = data.data.channels
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 更新active状态
    updateActive (index, isChannelEditShow = true) {
      console.log(isChannelEditShow)
      this.active = index
      // 关闭编辑弹出层
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style scoped lang="less">
/*
当 style 标签里有scoped属性时，在scoped作用域组件样式中，
默认只能在作用在组件的根节点，如果需要影响其后代元素，需要使用深度选择器
深度选择器 : /deep/ ::v-deep  >>> 最后一个只作用于css
 */
  .home-container {
    padding-bottom: 100px;
    padding-top: 100px;
    /deep/ .van-nav-bar__title {
      max-width: unset; // 去除哪一个属性就需要设置这个值
    }
    .search-btn {
      width: 300px;
      height: 35px;
      background-color: #5babfb;
      border: none;
      font-size: 20px;
      .van-icon {
        font-size: 28px;
      }
    }
    /deep/ .channel-tabs {
      .van-tabs__wrap {
        height: 65px;
        position: fixed;
        top: 45px;
        z-index: 1;
        bottom: 100px;
        right: 0;
        left: 0;
      }
      .van-tab {
        min-width: 100px;
        border-right: 1px solid #edeff3;
        font-size: 20px;
        color: #777;
      }
      .van-tab--active {
        color: #333;
      }
      .van-tabs__nav--line {
        padding-bottom: 0;
      }
      .van-tabs__line {
        bottom: 8px;
        width: 31px!important;
        height: 6px!important;
        background-color: #3296fa!important;
      }
      .placeholder {
        flex-shrink: 0; // 0表示不参与剩余空间计算
        width: 50px;
        height: 65px;
      }
      .hambuger-btn {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ccc;
        right: 0;
        width: 50px;
        height: 65px;
        background-color: rgba(255, 255, 255, 0.164);
        opacity: 0.902; // 透明效果
        .toutiao-gengduo {
          font-size: 60px;
        }
        &:before {
          // &代表父盒子  before插入一个伪元素
          content: "";
          position: absolute;
          left: 0;
          width: 2px;
          height: 100%;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain; // 填充模式
        }
      }

    }
  }
</style>

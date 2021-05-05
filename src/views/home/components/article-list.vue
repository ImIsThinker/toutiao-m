<template>
    <div class="article-list">
      <!-- 下拉刷新 -->
      <van-pull-refresh :success-duration="1500" :success-text="refreshSuccessText" v-model="isRefresh" @refresh="onRefresh">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        error-text="请求失败，点击重新加载"
        :error.sync="error"
        >
        <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
        <!-- 引入列表项组件 -->
        <article-item :article="article" v-for="(article,index) in list" :key="index"></article-item>
        </van-list>
      </van-pull-refresh>
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading效果
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 频道列表返回的翻页标识
      isRefresh: false, // 控制下拉刷新loading状态开启和关闭
      refreshSuccessText: '刷新成功', // 刷新成功的文本
      error: false // 控制错误提示的显示和隐藏
    }
  },
  methods: {
    async onLoad () {
      try {
        // 手动制造错误
        /* if (Math.random() > 0.5) {
          JSON.parse('dhshdsdls')
        } */
        // Date.now() 可以获取一个时间戳
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID 父组件传到子组件的值可以在子组件中使用this获取
          timestamp: this.timestamp || Date.now(), // 时间戳单位、最新时间戳表示请求第一页数据
          with_top: 0 // 是否置顶
        })
        console.log(data)
        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
        // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.error = true
        this.loading = false // 加载失败后关闭加载状态
      }

      /* // 第一次进来的时候默认触发onLoad事件、并将loading置为true 用来加载第一屏数据
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束 关闭加载状态
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000) */
    },
    // 下拉刷新的时候触发
    async onRefresh () {
      try {
        console.log('onRefresh')
        /* if (Math.random() > 0.2) {
          JSON.parse('dhshdsdls')
        } */
        // 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID 父组件传到子组件的值可以在子组件中使用this获取
          timestamp: Date.now(), // 下拉刷新获取最新数据就是最新时间戳
          with_top: 0 // 是否置顶
        })
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 关闭下拉刷新的状态
        this.isRefresh = false
        // 提示刷新成功
        this.refreshSuccessText = `刷新成功、更新了${results.length}条数据`
      } catch (error) {
        console.log(error)
        // 刷新失败提示
        this.refreshSuccessText = '刷新失败'
        this.isRefresh = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .article-list {
    height: 100%; // 百分比单位相对于父元素而言的、设置100%不行、因为它的父元素没有高度
    // 这里使用视口单位去处理
    // 在移动端、视口单位相对于布局视口
    // 1vw = 可视窗口的百分之一、比如窗口宽度750 则1vw = 7.5px
    // 1vh = 可视窗口的百分之一、比如窗口高度667 则1vh = 6.67px
    height: 94vh;
    overflow-y: auto;
  }
</style>

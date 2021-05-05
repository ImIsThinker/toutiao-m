<template>
    <div class="search-result">
      <!-- sync 同步更新error的状态 -->
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，请重新加载"
        >
        <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
        </van-list>
    </div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码值
      per_page: 20, // 每页数量
      error: false // 控制错误提示显示和隐藏
    }
  },
  methods: {
    async onLoad () {
      try {
        /*  if (Math.random() > 0.5) {
          JSON.parse('duhso')
        } */
        // 1. 获取后台接口数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(data.data)
        // 2. 将后台数据添加到数组中
        this.list.push(...data.data.results)
        // 3. 将loading状态设置为false
        this.loading = false
        // 4. 判断是否还有数据未加载完毕
        if (this.list.length) {
          this.page++
        } else {
          // 5. 如果没有数据了将 finished 设置为true
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>

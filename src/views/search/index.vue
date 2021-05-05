<template>
    <div class="search-container">
        <!-- 顶部搜索栏 -->
         <!--
         在 van-search 外层增加 form 标签，且 action 不为空，
         即可在 iOS 输入法中显示搜索按钮。
         searchText 绑定输入的文本
         showAction 显示右边取消按钮
         点击取消按钮会触发cancel事件
         search事件在输入内容点击搜索按钮就会触发这个函数 接收一个参数就是文本框输入的内容
         focus事件输入框获得焦点时触发
         -->
        <form class="search-form" action="/">
          <van-search
              v-model="searchText"
              show-action
              placeholder="请输入搜索关键词"
              @search="onSearch"
              @cancel="onCancel"
              background="#3296fa"
              @focus="isResultShow = false"
          />
        </form>
        <!-- 渲染逻辑：有一个为true就渲染哪一个、后面就不会继续向后执行 -->
        <!-- 搜索结果 -->
        <search-result :search-text="searchText" v-if="isResultShow"></search-result>
        <!-- 联想建议 -->
        <!-- 自定义函数search触发的时候、执行一下 onSearch 函数、并将点击的文本传递过来 -->
        <search-suggestion @search="onSearch" :search-text="searchText" v-else-if="searchText"></search-suggestion>
        <!-- 搜索历史记录 -->
        <search-history @clear-search-history="searchHistories = []" @search="onSearch" :search-histories="searchHistories" v-else></search-history>

    </div>
</template>
<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '', // 搜索文本
      isResultShow: false, // 控制搜索结果的显示和隐藏
      searchHistories: getItem('TOUTIAO_SEARCH_HISTROIES') || [] // 搜索历史
    }
  },
  computed: {},
  watch: {
    /**
     * 使用侦听器去监听 searchHistories 的数据变化
     * 一旦变化后就进行重新将 searchHistories 的数据存储到本地存储
     */
    // 完整写法
    /* searchHistories: {
      handler () {

      }
    } */
    // 简写方法
    searchHistories: function (val) {
      setItem('TOUTIAO_SEARCH_HISTROIES', val)
    }
  },
  created () {},
  methods: {
    onSearch (val) {
      // console.log(val)
      // 在点击联想建议的搜索的内容时、让搜索框中的搜索文本同样改变
      this.searchText = val
      // 保存搜索历史数据
      // 保存的时候需要判断不能有重复数据 同时将最新的搜索历史放到最前面
      const index = this.searchHistories.indexOf(val) // indexOf 方法是比对数组中有和传入参数一致的元素吗、如果有返回这个索引、如果没有则返回-1
      if (index !== -1) {
        // 如果数组中已经搜索的历史 则清除这个数据
        this.searchHistories.splice(index, 1) // splice 方法就是从传入的index索引开始清除 第二个参数为1则清除1个元素
      }
      this.searchHistories.unshift(val)
      // 渲染搜索结果页面
      this.isResultShow = true
    },
    onCancel () {
    //   console.log('取消')
      this.$router.back() // 从哪里来回哪里去
    }
  }
}
</script>
<style lang="less" scoped>
    .search-container {
      padding-top: 54px;
        .van-search__action {
            color: #fff;
        }
        .search-form {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }
    }
</style>

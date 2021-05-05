<template>
    <div class="search-suggestion">
        <!-- 点击这个搜索文本的时候、触发一个父组件的自定义事件、并传递搜索文本 -->
        <van-cell @click="$emit('search', text)" v-for="(text, index) in suggestionsList" :key="index" icon="search">
          <span slot="title" v-html="highLight(text)"></span>
        </van-cell>
    </div>
</template>
<script>
import { getSuggestions } from '@/api/search'
// 导入lodash依赖包 同时按需导入
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestionsList: [] // 联想建议的承接数组
    }
  },
  methods: {
    // 定义查询联想建议数据的方法
    async searchSuggestions (q) {
      try {
        const { data } = await getSuggestions(q)
        console.log(data.data)
        this.suggestionsList = data.data.options
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败、请稍后重试')
      }
    },
    // 定义一个处理高亮的方法
    highLight (text) {
      /**
       这里使用replace函数对字符串进行替换 替换后的字符串带有高亮的样式
       replace方法使用正则表达式进行动态的匹配传入的被替换后的第一个参数、第二个参数就是替换后的字符串
       注意：replace方法默认只能替换第一个满足的字符 而且会区分大小写
       在正则表达式中 // 中间的都会当做字符串进行处理、可是我们需要一个动态变量数据进行动态传入搜索文本
       因此需要new RegExp 这个是正则表达式的构造函数
       参数1：匹配模式字符串
       参数2：匹配模式 g表示全局匹配 i表示不区分大小写
       */
      const highLightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highLightStr)
    }
  },
  watch: {
    // 使用侦听器去监听这个searchText的变化
    searchText: {
      // 当 searchText发生变化时，就会触发handler函数、
      // handler函数名称是固定的
      // 这里不能写箭头函数、否则他的this的指向发生了变化
      /* handler: (val) => {
        this.searchSuggestions()
      } */
      // debounce 函数
      // 参数1是一个函数
      // 参数2：延迟时间、单位是毫秒 实际意思就是：键盘输入停下来后1000毫秒后触发参数1的函数
      // 返回值： 防抖之后的函数
      handler: debounce(function (val) {
        this.searchSuggestions(val)
      }, 200),
      /* handler (val) {
        this.searchSuggestions(val)
      }, */
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  }
}
</script>
<style lang="less" scoped>
  .search-suggestion {
    /deep/ span.active {
      color: #3296fa;
    }
  }
</style>

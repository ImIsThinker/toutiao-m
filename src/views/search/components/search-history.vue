<template>
    <div class="search-history">
        <van-cell title="搜索历史">
            <div v-if="showDelete">
                <span @click="$emit('clear-search-history')">全部删除</span>
                <span @click="showDelete = false" style="padding-left: 10px">完成</span>
            </div>
            <van-icon v-else @click="showDelete = true"  name="delete"></van-icon>
        </van-cell>
        <van-cell @click="clickHistory(item, index)" v-for="(item, index) in SearchHistories" :key="index" :title="item">
            <van-icon v-show="showDelete" name="close"></van-icon>
        </van-cell>
    </div>
</template>
<script>
export default {
  name: 'SearchHistory',
  props: {
    SearchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showDelete: false // 控制删除按钮的显示和隐藏
    }
  },
  methods: {
    //   点击历史记录的时候执行搜索或者删除操作
    clickHistory (item, index) {
      if (this.showDelete) {
        // 执行删除操作
        /**
         * props数据是由父组件传递过来的
         * props数据如果是数字、字符串 布尔值类型数据 不能直接对其进行赋值操作、因为没有意义、父组件的数据还是没有更改
         * 但是如果props数据是对象、数组的这样的引用类型数据、则可以对对象、数组内部的数值进行修改操作、修改后父组件的数据同步更新
         */
        this.SearchHistories.splice(index, 1) // 从数组索引index 开始 删除1个元素
      } else {
        // 执行查询操作
        // 触发父组件进行查询操作 并将查询的词条传递到父组件
        this.$emit('search', item)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>

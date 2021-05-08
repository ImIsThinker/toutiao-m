<template>
    <div class="test-container">
        <div>父组件</div>
        <div>
            <list-item :list="list">
                <!-- 这里使用作用域插槽由父组件直接决定子组件那个item高亮显示 -->
                <template slot-scope="slotProps">
                    <strong class="active" v-if="slotProps.info.id === 2">{{ slotProps.info.name }}</strong>
                    <span v-else>{{ slotProps.info.name }}</span>
                </template>
            </list-item>
        </div>
    </div>
</template>
<script>
import ListItem from './components/list-item.vue'

export default {
  name: 'TestIndex',
  components: {
    ListItem
  },
  props: {},
  data () {
    return {
      list: [
        { id: 1, name: '橘子' },
        { id: 2, name: '香蕉' },
        { id: 3, name: '苹果' }
      ]
    }
  },
  computed: {},
  watch: {

  },
  created () {},
  methods: {

  }
}
</script>
<style lang="less" scoped>
  .test-container {
    strong.active {
      color: red;
    }
  }
</style>

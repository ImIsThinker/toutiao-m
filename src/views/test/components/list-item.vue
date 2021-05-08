<template>
    <div>
        <div>这是一个测试页面</div>
        <div>
            <li v-for="item in list" :key="item.id">
                <slot :info="item">{{ item.name }}</slot>
            </li>
        </div>
    </div>
</template>
<script>

export default {
  name: 'ListItem',
  components: {

  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

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

</style>

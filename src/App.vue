<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view/>
    <h1>头条</h1>
    <div>
      <i class="toutiao toutiao-pinglun"></i>
    </div>
    <div>
      <van-button type="primary">主要按钮</van-button>
    </div>
  </div>
</template>
<script>
export default {
  // 为组件设置一个名字
  name: 'App'
}
</script>

<style lang="less">

</style>

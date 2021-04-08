<template>
    <div class="layout-container">
        <!-- 子路由出口 -->
        <router-view></router-view>
        <!-- 子路由出口 -->
        <!-- 标签导航栏 -->
        <!-- route 表示开启路由模式 开启路由模式就是指明跳转到路由表中那个路径 -->
        <!-- to="/" 表示需要跳转的路径 -->
        <!-- v-model="active" 在开启路由模式后、active属性不在控制被激活的标签、而是由路由路径控制 -->
        <van-tabbar class="layout-tabbar"  route>
            <van-tabbar-item to="/" >
                <span class="text">首页</span>
                <i slot="icon" class="toutiao toutiao-shouye"></i>
            </van-tabbar-item>
             <van-tabbar-item to="/qa" >
                <span class="text">问答</span>
                <i slot="icon" class="toutiao toutiao-wenda"></i>
            </van-tabbar-item>
             <van-tabbar-item to="/video" >
                <span class="text">视频</span>
                <i slot="icon" class="toutiao toutiao-shipin"></i>
            </van-tabbar-item>
             <van-tabbar-item to="/my" >
                <span class="text">我的</span>
                <i slot="icon" class="toutiao toutiao-wode"></i>
            </van-tabbar-item>
        </van-tabbar>
        <!-- 标签导航栏 -->
    </div>
</template>
<script>
export default {
  name: 'LayoutIndex', // 组件名称
  data () {
    return {
      // 在开启路由模式后、active属性不在控制被激活的标签、而是由路由路径控制
      // active: 0 // 被激活的标签栏
    }
  }
}
</script>
<style lang="less" scoped>
    .layout-container {
        .layout-tabbar {
            i.toutiao {
                font-size: 20px;
            }
            span.text {
                font-size: 15px;
            }
        }
    }
</style>
